<?php

    var_dump(scandir("."));

    class News{

        public $name = null;
        public $preview = null;
        public $article = null;
        private $contentPreview = null;
        private $contentArticle = null;

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
            $this->contentPreview = file_get_contents($this->preview);
        }

        public function fetchContentArticle(){
            $this->contentArticle = file_get_contents($this->article);
        }

        public function fetchAllContent(){
            $this->fetchContentArticle();
            $this->fetchContentPreview();
        }
    }

    $allNews = array();


    getAllNews($allNews);
    fetchAllNews($allNews);
    var_dump($allNews);









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