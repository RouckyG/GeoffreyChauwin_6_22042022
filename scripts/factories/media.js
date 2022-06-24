function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes, date, price } = data;
    const picture = `assets/photographers/${video == undefined ? image : video}`;

    function getMediaCardDOM() {
        const article = document.createElement( "article" );

        if (video == undefined) {
            const img = document.createElement( "img" );
            img.setAttribute( "src" , picture);
            img.setAttribute( "alt" , title);
            article.appendChild(img);
        }
        else{
            const video = document.createElement("video");
            video.setAttribute("type", "video/mp4")
            video.setAttribute("src", picture);
            // video.setAttribute("autoplay", true);
            // video.setAttribute("loop", true);
            video.setAttribute("mute", true);
            video.setAttribute("playsinline", true);
            article.appendChild(video);   
        }
        
        const details = document.createElement("div");
        details.classList.add("mediaDetails")

        const titleName = document.createElement("p");
        titleName.textContent = title;
        details.appendChild(titleName);

        const nbOfLikes = document.createElement("span");
        nbOfLikes.innerHTML = likes + " &hearts;";
        details.appendChild(nbOfLikes);

        article.appendChild(details);
        return (article);
    }

    function getLightboxCardDOM(mediaKey){

        const lightbox = document.createElement("div");
        lightbox.classList.add("lightbox");

        const closeLightbox = document.createElement("button");
        closeLightbox.classList.add("close_lightbox");
        lightbox.appendChild(closeLightbox);

        const closeLightboxIcon = document.createElement("span");
        closeLightboxIcon.innerHTML = "X";
        closeLightbox.appendChild(closeLightboxIcon);

        const lightboxContainer = document.createElement("div");
        lightboxContainer.classList.add("lightbox_container");
        lightbox.appendChild(lightboxContainer);
       
        const lightboxMedia = document.createElement("div");
        lightboxMedia.classList.add("lightbox_media");
        lightboxContainer.appendChild(lightboxMedia);

        const arrowLeft = document.createElement("button");
        arrowLeft.addEventListener("click",()=>{displayMedia((mediaKey+Medias.length-1) % Medias.length)});
        lightboxMedia.appendChild(arrowLeft);

        const arrowLeftIcon = document.createElement("span");
        arrowLeftIcon.innerHTML = "<";
        arrowLeft.appendChild(arrowLeftIcon);

        if (video == undefined) {
            const img = document.createElement( "img" );
            img.setAttribute( "src" , picture);
            img.setAttribute( "alt" , title);
            lightboxMedia.appendChild(img);
        }
        else{
            const video = document.createElement("video");
            video.setAttribute("type", "video/mp4");
            video.setAttribute("src", picture);
            video.setAttribute("autoplay", true);
            video.setAttribute("loop", true);
            video.setAttribute("mute", true);
            video.setAttribute("playsinline", true);
            lightboxMedia.appendChild(video);   
        }

        const arrowRight = document.createElement("button");
        arrowRight.addEventListener("click",()=>{displayMedia((mediaKey+1) % Medias.length)});
        lightboxMedia.appendChild(arrowRight);

        const arrowRightIcon = document.createElement("span");
        arrowRightIcon.innerHTML = ">";
        arrowRight.appendChild(arrowRightIcon);

        const mediaTitle = document.createElement("p");
        mediaTitle.innerHTML = title;

        return lightbox
    }

    return { id, photographerId, title, image, likes, date, price, getMediaCardDOM, getLightboxCardDOM }
}