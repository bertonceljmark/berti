window.addEventListener('scroll', () => {

    const about_img = document.getElementById("picture-about");
    const toTop = document.querySelector(".up");
    const cont1 = document.getElementById('container-1');
    const cont2 = document.getElementById('container-2');
    const scroll_music = document.getElementsByClassName('scroll_music');
    const scroll_youtube = document.getElementById("container-youtube");
    const youtube_text = document.getElementById("youtube-text");
    const youtube_ikona = document.getElementById("ikona-youtube");
    
    const current = window.scrollY;
    const transformSize = 1 - current/1000;
    const contTransformPosX = current/5;
    const musicTransformPosY = (current - window.innerHeight * 1.75) / 2;
    const aboutTransformPosX = (current-window.innerHeight) / 2;
    const youtubeTransformPosY = -(current- window.innerHeight * 5.2) / 2;
    const youtubeTransformPosX = -(current- window.innerHeight * 5.2) / 2;
    
    if(current >= window.innerHeight){
        cont1.style.transform = "none";
        cont2.style.transform = "none";
        toTop.classList.add("active");
    }
    else{
        cont1.style.transform = "translateY(" + current  + "px) scale(" + transformSize + ", " + transformSize + ")";
        cont2.style.transform = "translateY(" + current  + "px) scale(" + transformSize + ", " + transformSize + ")";
        toTop.classList.remove("active");
    }

    if(current > window.innerHeight && current < window.innerHeight * 2.5){
        scroll_music[0].style.transform = "translateY(" + musicTransformPosY  + "px)";
        scroll_music[1].style.transform = "translateY(" + musicTransformPosY  + "px)";
    }
    else{
        scroll_music[0].style.transform = "none";
        scroll_music[1].style.transform = "none";
    }
    
    if(current < window.innerHeight){
        about_img.style.transform = "translateX("+ -aboutTransformPosX + "px)";
    }

    scroll_youtube.style.backgroundPositionY= youtubeTransformPosY + "px";

    youtube_text.style.transform= "translateX("+ -youtubeTransformPosX + "px)";
    youtube_ikona.style.transform= "translateX("+ youtubeTransformPosX + "px)";
    
})