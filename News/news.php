<?php

    // var_dump(scandir("."));

    class News{

        public $name = null;
        public $preview = null;
        public $article = null;
        public $contentPreview = null;
        public $titleNews = null
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
            if( $this->preview == null ){
                die("Non esiste il file ");
            }
            $this->contentPreview = utf8_encode(file_get_contents($this->preview));
        }

        public function fetchContentArticle(){
            $this->contentArticle = utf8_encode(file_get_contents($this->article));
        }

        public function fetchAllContent(){
            $this->fetchContentArticle();
            $this->fetchContentPreview();
        }

        public function toJson(){
            return json_encode($this);
        }
    }

    $allNews = array();


    getAllNews($allNews);
    fetchAllNews($allNews);
    // echo($allNews['Radon']->getContentArticle());
    // var_dump($allNews);
    // echo $allNews['Radon']->toJson();







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
                    $allNews[$strPreview]->preview = $dir;
                }
                else{
                    $news = new News( $strPreview );
                    $news->preview = $dir;
                    $allNews[ $strPreview ] = $news;

                    
                }

                continue;
            }

            if($strArticle != FALSE){           // Article

                if( isset($allNews[$strArticle]) ){
                    $allNews[$strArticle]->article = $dir;
                }
                else{
                    $news = new News( $strArticle );
                    $news->article = $dir;
                    $allNews[ $strArticle ] = $news;
                }
                continue;
            }

        }

    }

?>