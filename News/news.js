var wrapperPreviewEl    = document.querySelector("#wrapperPreview");
var linkEditorPreview   = document.querySelector("#editorPreview");
var wrapperArticleEl    = document.querySelector("#wrapperArticle");
var linkEditorArticle   = document.querySelector("#editorArticle");
var fileName            = document.querySelector("#fileName");
var wrapperNews         = document.querySelector("#wrapperNews");
var buttonFileNameSave  = document.querySelector("#fileNameSalva");
var buttonSortSave      = document.querySelector("#sortSalva");
var listNews            = [].slice.call(document.querySelectorAll(".news"));

var allNews = []
var selectedNews;
var xmlHttp = new XMLHttpRequest();



function fetchNews(){
    var query = "?action=fetch&name=all";
    xmlHttp.open("GET", "news.php"+query);
    xmlHttp.onreadystatechange = function(e){
        if(this.readyState == 4 && this.status == 200){
            if(this.response.search("debug_mode") == 0){
                document.body.innerHTML = this.response;
                return;
            }
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
        var i       = document.createElement('i');
        var span    = document.createElement('span');

        article.classList.add("news");
        i.classList.add("grip");
        span.innerHTML = news.fileName;
        

        news.articleEl = article;
        article.appendChild(i);
        article.appendChild(span);
        wrapperNews.appendChild(article);

        article.addEventListener("click", news.selectNews.bind(news));
    })

    fileName.addEventListener("change", function(){
        buttonFileNameSave.disabled = false;
        
        
        buttonFileNameSave.addEventListener("click", function(){
            selectedNews.modifyTitle(fileName.value);
            this.disabled = true;
            
        })
    })    

    
}




function news(obj){

    this.fileName;
    this.contentPreview;
    this.contentArticle;
    this.previewFile;
    this.articleFile;
    
    this.articleEl;

    this.anyChanges = false;

    this.init = function( obj ){
        // debugger
        this.fileName       = obj.fileName;
        this.contentArticle = obj.contentArticle;
        this.contentPreview = obj.contentPreview;
        this.previewFile    = obj.previewFile;
        this.articleFile    = obj.articleFile;

        // fileName.addEventListener("focus", this.modifyTitle.bind(this))
    }

    this.modifyTitle = function(newTitle){
        var alreadyUsed = false;
        allNews.filter(function(news){
            if(news.fileName == newTitle)
                alreadyUsed = true;
        })
        
        if( alreadyUsed ){
            alert("Questo titolo e' gia' usato");
            fileName.value = this.fileName;
            return;
        }

        var self = this;
        var query = `?action=rename&fileName=${this.fileName}&newName=${newTitle}`;
        xmlHttp.open("GET", "news.php"+query);
        xmlHttp.onreadystatechange = function(e){
            if(this.readyState == 4 && this.status == 200){
                if(this.response.search("debug_mode") == 0){
                    document.body.innerHTML = this.response;
                    return;
                }
                resultObj = JSON.parse(this.response);

                // debugger
                // this.anyChanges = true;
                self.fileName = resultObj.result;

        
                self.articleEl.querySelector("span").innerHTML = self.fileName;
                console.log(resultObj.message);
            }
        };
        xmlHttp.send();
        
        


        
    }

    this.selectNews = function(){
        fileName.value                  = this.fileName
        wrapperPreviewEl.innerHTML      = this.contentPreview;
        wrapperArticleEl.innerHTML      = this.contentArticle;

        selectedNews = this;
        fileName.disabled = false;
    }


    this.init(obj);
}




fetchNews();
//allNews[0].selectNews();
var sortable = Sortable.create(wrapperNews, {animation:200, ghostClass:"ghost",handle: ".news"});
