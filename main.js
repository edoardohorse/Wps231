var onMobile = false;
var allNewsPreviews = [].slice.call(document.querySelectorAll(".news-list article"));
var allNewsFullPage = [].slice.call(document.querySelectorAll("#wrapperModal article"));
var newsEl = document.querySelector(".news");
var newsListEl  = document.querySelector(".news-list");
var previousArrowEl = document.getElementById("previousNews");
var nextArrowEl = document.getElementById("nextNews");
var hamburgerEl = document.getElementById("hamburger");
var newsShowed = 1;
var offsetNews = 0;
function checkMobile(){
    if( window.innerWidth > 768 ){
        onMobile = false;
    }
    else{
        onMobile = true;
    }
}

function sizeNews(e){
    checkMobile();
    if( onMobile ){
        
        for( i in allNewsPreviews){
            allNewsPreviews[i].style.width = newsEl.clientWidth - 32+"px";
        }
        if( e.type != "DOMContentLoaded" ){
            newsListEl.style.transition = "none";
            offsetNews = (allNewsPreviews[0].clientWidth + 16) * (newsShowed-1)
            newsListEl.style.transform = "translate(-"+ offsetNews +"px,0px)" 
            
            setTimeout(function(){
                newsListEl.style.transition = "transform 300ms";
            },100)
            
        }

    }   
    else{
        for( i in allNewsPreviews){
            allNewsPreviews[i].style.width = "";
        }
    }
}
function goPreviousNews(){
    if( newsShowed > 1 && onMobile ){
        offsetNews -= allNewsPreviews[0].clientWidth + 16
        newsListEl.style.transform = "translate(-"+ offsetNews +"px,0px)"
        nextArrowEl.style.display = "inline-block";
        newsShowed--
    }
    
    if(newsShowed == 1){
        nextArrowEl.style.display = "inline-block";
        previousArrowEl.style.display = "none";
    }
}
function goNextNews(){
    if( newsShowed < allNewsPreviews.length && onMobile){
        offsetNews += allNewsPreviews[0].clientWidth + 16
        newsListEl.style.transform = "translate(-"+ offsetNews +"px,0px)"
        newsShowed++
        previousArrowEl.style.display = "inline-block";
    }
    if(newsShowed == allNewsPreviews.length){
        nextArrowEl.style.display = "none";
    }
}
window.onresize = sizeNews;
window.addEventListener("DOMContentLoaded", sizeNews);

previousArrowEl.addEventListener("click", goPreviousNews)
nextArrowEl.addEventListener("click", goNextNews)
previousArrowEl.style.display = "none"

var allNews = [];


allNewsPreviews.forEach(
    function( news ){

        allNews.push( new News( news ) );

    }
)




function News( news ){

    this.isOpened = false;
    this.newsPreview = news
    this.newsFullPage = allNewsFullPage[ allNewsPreviews.indexOf(news) ]
    this.wrapperModalFullPage = this.newsFullPage.parentElement    

    this.init = function(){

        var div = document.createElement("div");
        var i = document.createElement("i");
        var readMore = document.createElement("a");

        div.style.marginBottom = "3em";
        
        i.classList.add("closeNews");
        
        readMore.setAttribute("data-link","true");
        readMore.innerText="Leggi altro...";

        this.newsFullPage.classList.add("hidden");


        div.appendChild(i);
        this.newsFullPage.insertBefore(div, this.newsFullPage.children[0] );
        this.newsPreview.appendChild( readMore );
        


        this.newsFullPage.querySelector(".closeNews").addEventListener("click", this.close.bind(this))
        readMore.addEventListener("click", this.open.bind(this))
    }

    this.open = function(){
        
        this.newsFullPage.classList.remove("hidden");
        
        document.body.style.overflow = "hidden";

        setTimeout(function(){
            this.wrapperModalFullPage.classList.add("overlay");
            this.newsFullPage.classList.add("open");
        }.bind(this),300)
        
        
        this.isOpened = true;
        window.addEventListener("keydown", this.close.bind(this))
    }

    this.close = function(e){
        if( e instanceof KeyboardEvent && e.keyCode != 27 )
            return;
        else{

            this.wrapperModalFullPage.classList.remove("overlay");
            this.newsFullPage.classList.remove("open");

            document.body.style.overflow = "auto";
            
            setTimeout(function(){
                this.newsFullPage.classList.add("hidden");
            }.bind(this),350)

            this.isOpened = false;

            window.removeEventListener("keypress",this.close);
        }
    }

    this.toggle = function(){
        if( isOpened )
            this.close();
        else
            this.open();
    }

    this.init();


}

