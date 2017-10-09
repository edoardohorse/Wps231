var wrapperPreviewEl    = document.querySelector("#wrapperPreview");
var linkEditorPreview   = document.querySelector("#editorPreview");
var wrapperArticleEl    = document.querySelector("#wrapperArticle");
var linkEditorArticle   = document.querySelector("#editorArticolo");
var titleNews           = document.querySelector("#titoloNews");
var wrapperNews         = document.querySelector("#wrapperNews");
var buttonSave          = document.querySelector("#Salva");
var listNews            = [].slice.call(document.querySelectorAll(".news"));

var allNews = []
var selectedNews;




function fetchNews(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "news.php");
    xmlHttp.onreadystatechange = function(e){
        if(this.readyState == 4 && this.status == 200){
            // debugger
            var newsList = JSON.parse(this.response);
            for( singleNews in newsList){

                allNews.push(new news(newsList[singleNews]));
            }
            // allNews[0].selectNews();            

            init()
        }
    }
    xmlHttp.send();
}

function init(){
    
        
    allNews.forEach(function(news){  
        //newsEl == this
        //news == allNews[i]
        
            
        
        var article = document.createElement('article');
        article.classList.add("news");
        article.innerHTML = news.titleNews;
        news.articleEl = article;
        wrapperNews.appendChild(article);

        article.addEventListener("click", news.selectNews.bind(news));
    })

    titoloNews.addEventListener("change", function(){
        buttonSave.disabled = false;
        buttonSave.addEventListener("click", function(){
            selectedNews.modifyTitle(titoloNews.value);
            this.disabled = true;
        })
    })    

    
}




function news(obj){

    this.titleNews;
    this.contentPreview;
    this.contentArticle;
    this.previewFile;
    this.articleFile;
    
    this.articleEl;

    this.anyChanges = false;

    this.init = function( obj ){
        // debugger
        this.titleNews      = obj.titleNews;
        this.contentArticle = obj.contentArticle;
        this.contentPreview = obj.contentPreview;
        this.previewFile    = obj.previewFile;
        this.articleFile    = obj.articleFile;

        // titleNews.addEventListener("focus", this.modifyTitle.bind(this))
    }

    this.modifyTitle = function(newTitle){
        this.anyChanges = true;
        this.titleNews = newTitle;

        this.articleEl.innerHTML = this.titleNews;
    }

    this.selectNews = function(){
        titleNews.value                 = this.titleNews
        wrapperPreviewEl.innerHTML      = this.contentPreview;
        wrapperArticleEl.innerHTML      = this.contentArticle;

        selectedNews = this;
    }


    this.init(obj);
}




fetchNews();
//allNews[0].selectNews();