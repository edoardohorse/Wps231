var onMobile = false;
var articles = [].slice.call(document.querySelectorAll(".news-list article"));
var newsEl  = document.querySelector(".news");
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
        
        for( i in articles){
            articles[i].style.width = newsEl.clientWidth - 32+"px";
        }
        if( e.type != "DOMContentLoaded" ){
            newsListEl.style.transition = "none";
            offsetNews = (articles[0].clientWidth + 16) * (newsShowed-1)
            newsListEl.style.transform = "translate(-"+ offsetNews +"px,0px)" 
            
            setTimeout(function(){
                newsListEl.style.transition = "transform 300ms";
            },100)
            
        }
    }   
    else{
        for( i in articles){
            articles[i].style.width = "";
        }
    }
}
function goPreviousNews(){
    if( newsShowed > 1 && onMobile ){
        offsetNews -= articles[0].clientWidth + 16
        newsListEl.style.transform = "translate(-"+ offsetNews +"px,0px)"
        newsShowed--
    }
}
function goNextNews(){
    if( newsShowed < articles.length && onMobile){
        offsetNews += articles[0].clientWidth + 16
        newsListEl.style.transform = "translate(-"+ offsetNews +"px,0px)"
        newsShowed++
    }
}
window.onresize = sizeNews;
window.addEventListener("DOMContentLoaded", sizeNews);
document.getElementById("previousNews").addEventListener("click", goPreviousNews)
document.getElementById("nextNews").addEventListener("click", goNextNews)

var allNews = [];

var allNewsEl = [].slice.call(document.querySelectorAll("#wrapperNews article"));
allNewsEl.forEach(
    function(article){

        allNews.push( new news(article) );

    }
)

var i = 0;
articles.forEach(function(news){
    news.querySelector("a").addEventListener("click", allNews[i++].open)
})


function news( article ){

    isOpened = false;
    el = article;
    parent = el.parentElement;
    

    this.open = function(){
        parent.classList.add("overlay");
        el.classList.add("open");

        isOpened = true;
    }

    this.close = function(){
        parent.classList.remove("overlay");
        el.classList.remove("open");

        isOpened = false;
    }

    this.toggle = function(){
        if( isOpened )
            this.close();
        else
            this.open();
    }

    el.querySelector(".closeNews").addEventListener("click", this.close.bind(this))

}