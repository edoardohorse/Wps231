<?php

    // var_dump(scandir("."));


    class News{

        public $name = null;
        public $previewFile = null;
        public $articleFile = null;
        public $contentPreview = null;
        public $titleNews = null;
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
                        
            $newPreviewFile = str_replace($this->titleNews, $newName, $newPreviewFile);
            $newArticleFile = str_replace($this->titleNews, $newName, $newArticleFile);
            $this->titleNews = $newName;

            rename($this->previewFile, $newPreviewFile);
            rename($this->articleFile, $newArticleFile);

            $this->previewFile = $newPreviewFile;
            $this->articleFile = $newArticleFile;


        }

        public function toJson(){
            return json_encode($this);
        }
    }

    $allNews = array();


    getAllNews($allNews);
    fetchAllNews($allNews);
    //  echo $allNews['Radon']->toJson();
    //$allNews['Radon']->renameFile("Prova");
    // echo($allNews['Radon']->getContentArticle());
    //var_dump($allNews);
    echo json_encode($allNews);





    function fetchAllNews($allNews){

        foreach($allNews as $news){
            $news->fetchAllContent();
        }
    }

    function getAllNews(&$allNews){
        $i = 0;
        foreach( scandir(".") as $dir  ){
            $strPreview = substr($dir, 0, strpos($dir, "_preview"));
            $strArticle = substr($dir, 0, strpos($dir, "_article"));

            // var_dump($strPreview);
            // var_dump($strArticle);

            if(  $strPreview != FALSE ){        // Preview
            
                if( isset($allNews[$strPreview]) ){
                    $allNews[$strPreview]->previewFile = $dir;
                }
                else{
                    $news = new News( $strPreview );
                    $news->previewFile      = $dir;
                    $news->titleNews        = $strPreview;       
                    $allNews[ $strPreview ] = $news;

                    
                }

                continue;
            }

            if($strArticle != FALSE){           // Article

                if( isset($allNews[$strArticle]) ){
                    $allNews[$strArticle]->articleFile = $dir;
                }
                else{
                    $news = new News( $strArticle );
                    $news->articleFile = $dir;
                    $news->titleNews        = $strArticle;
                    $allNews[ $strArticle ] = $news;
                }
                continue;
            }

        }

    }

?>