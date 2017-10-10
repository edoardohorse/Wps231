<?php

    // echo "debug_mode<br>";
    // var_dump(scandir("."));

    session_start();
    if (session_status() == PHP_SESSION_NONE) {
        $_SESSION["allNews"] = array();
        
    }
    
    
    switch($_GET["action"]){
        case "fetch":{
            if( $_GET["name"] == "all" || !isset($_GET["name"]) ){
                
                getAllNews();
                fetchAllNews();

                // echo "debug_mode<br>";
                // var_dump($_GET);
                // var_dump($_SESSION["allNews"]);
                // die();

                echo json_encode($_SESSION["allNews"]);

                
            }
            else{
                echo "No";
            }
            break;
        }
        case "rename":{
            $fileName  = $_GET["fileName"];
            $newName   = $_GET["newName"];
            
            //  echo "debug_mode<br>";
            // var_dump($_GET);
            // var_dump($_SESSION["allNews"]);
            // die();
            
            
            $_SESSION["allNews"][$fileName]->renameFile($newName);
            
            $_SESSION["allNews"][$newName] = $_SESSION["allNews"][$fileName];
            unset($_SESSION["allNews"][$fileName]);
            
            echo (new Result(
                $newName,
                "Rinominato con successo ".$newName))->toJson();
            
            // var_dump($_SESSION["allNews"]);
            // var_dump($newName);
            break;
        }
        // case "":{
        //     break;
        // }
    }

    class Result{
        public $message = null;
        public $result  = null;

        function __construct($result, $message = null){
            $this->result = $result;
            $this->message = $message;
        }

        public function toJson(){
            if( $this->message || $this->result )
                return json_encode($this);
            else
                die("Result vuoto");
        }
    }


    class News{

        public $name = null;
        public $previewFile = null;
        public $articleFile = null;
        public $contentPreview = null;
        public $fileName = null;
        public $contentArticle = null;

        function __construct( $name ){
            $this->name = $name;
        }

        public function getContentPreview(){
            return $this->contentPreview;
        }

        public function getContentArticle(){
            return $this->contentPreview;
        }

        public function fetchContentPreview(){
            if( $this->previewFile == null ){
                die("Non esiste il file ");
            }
            $this->contentPreview = utf8_encode(file_get_contents($this->previewFile));
        }

        public function fetchContentArticle(){
            $this->contentArticle = utf8_encode(file_get_contents($this->articleFile));
        }

        public function fetchAllContent(){
            $this->fetchContentArticle();
            $this->fetchContentPreview();
        }

        public function renameFile( $newName){

            
            $newPreviewFile = $this->previewFile;
            $newArticleFile = $this->articleFile;
            
            $newPreviewFile = str_replace($this->fileName, $newName, $newPreviewFile);
            $newArticleFile = str_replace($this->fileName, $newName, $newArticleFile);
            $this->fileName = $newName;
            
            rename($this->previewFile, $newPreviewFile);
            rename($this->articleFile, $newArticleFile);
            
            $this->previewFile = $newPreviewFile;
            $this->articleFile = $newArticleFile;
            
        }

        public function toJson(){
            return json_encode($this);
        }
    }



    //  echo $_SESSION["allNews"]['Radon']->toJson();
    //$_SESSION["allNews"]['Radon']->renameFile("Prova");
    // echo($_SESSION["allNews"]['Radon']->getContentArticle());
    //var_dump($_SESSION["allNews"]);
    





    function fetchAllNews(){

        foreach($_SESSION["allNews"] as $news){
            $news->fetchAllContent();
        }
    }

    function getAllNews(){

        $_SESSION["allNews"] = array();

        $i = 0;
        foreach( scandir(".") as $dir  ){
            $strPreview = substr($dir, 0, strpos($dir, "_preview"));
            $strArticle = substr($dir, 0, strpos($dir, "_article"));

            // var_dump($strPreview);
            // var_dump($strArticle);

            if(  $strPreview != FALSE ){        // Preview
            
                if( isset($_SESSION["allNews"][$strPreview]) ){
                    $_SESSION["allNews"][$strPreview]->previewFile = $dir;
                }
                else{
                    $news = new News( $strPreview );
                    $news->previewFile      = $dir;
                    $news->fileName        = $strPreview;       
                    $_SESSION["allNews"][ $strPreview ] = $news;

                    
                }

                continue;
            }

            if($strArticle != FALSE){           // Article

                if( isset($_SESSION["allNews"][$strArticle]) ){
                    $_SESSION["allNews"][$strArticle]->articleFile = $dir;
                }
                else{
                    $news = new News( $strArticle );
                    $news->articleFile = $dir;
                    $news->fileName = $strArticle;
                    $_SESSION["allNews"][ $strArticle ] = $news;
                }
                continue;
            }

        }

    }

?>