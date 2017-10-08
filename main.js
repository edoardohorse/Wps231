var onMobile = false;
var allNewsPreviews = [].slice.call(document.querySelectorAll(".news-list article"));
var allNewsFullPage = [].slice.call(document.querySelectorAll("#wrapperNews article"));
var newsEl = document.querySelector(".news");
var newsListEl  = document.querySelector(".news-list");

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
        newsShowed--
    }
}
function goNextNews(){
    if( newsShowed < allNewsPreviews.length && onMobile){
        offsetNews += allNewsPreviews[0].clientWidth + 16
        newsListEl.style.transform = "translate(-"+ offsetNews +"px,0px)"
        newsShowed++
    }
}
window.onresize = sizeNews;
window.addEventListener("DOMContentLoaded", sizeNews);
document.getElementById("previousNews").addEventListener("click", goPreviousNews)
document.getElementById("nextNews").addEventListener("click", goNextNews)

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
    this.wrapperNewsFullPage = this.newsFullPage.parentElement    

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
            this.wrapperNewsFullPage.classList.add("overlay");
            this.newsFullPage.classList.add("open");
        }.bind(this),50)
        
        
        this.isOpened = true;
    }

    this.close = function(){
        this.wrapperNewsFullPage.classList.remove("overlay");
        this.newsFullPage.classList.remove("open");

        document.body.style.overflow = "auto";
        
        setTimeout(function(){
            this.newsFullPage.classList.add("hidden");
        }.bind(this),350)

        this.isOpened = false;
    }

    this.toggle = function(){
        if( isOpened )
            this.close();
        else
            this.open();
    }

    this.init();


}