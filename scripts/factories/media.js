function mediaFactory(data) {
    const { id, photographerId, title, image, video, likes, date, price } = data;
    const picture = `assets/photographers/${video == undefined ? image : video}`;

    // crée l'affiche d'un media avec image/vidéo et le détail du média
    // create the media card with the media with its title and its likes count
    function getMediaCardDOM() {
        const article = document.createElement( "article" );

        if (video == undefined) {
            const img = document.createElement( "img" );
            img.classList.add("mediaPicture")
            img.setAttribute( "src" , picture);
            img.setAttribute( "alt" , title);
            img.setAttribute("tabindex","0");
            article.appendChild(img);
        }
        else{
            const video = document.createElement("video");
            video.classList.add("mediaPicture")
            video.setAttribute("type", "video/mp4")
            video.setAttribute("src", picture);
            // video.setAttribute("autoplay", true);
            // video.setAttribute("loop", true);
            video.setAttribute("mute", true);
            video.setAttribute("playsinline", true);
            video.setAttribute( "alt" , title);
            video.setAttribute( "aria-label" , title);
            video.setAttribute("tabindex","0");
            article.appendChild(video);   
        }
        
        const details = document.createElement("div");
        details.classList.add("mediaDetails")

        const titleName = document.createElement("p");
        titleName.textContent = title;
        details.appendChild(titleName);

        const nbOfLikes = document.createElement("span");
        nbOfLikes.innerHTML = likes + " &hearts;";
        nbOfLikes.setAttribute("tabindex","0")
        details.appendChild(nbOfLikes);

        article.appendChild(details);
        return (article);
    }

    // crée la lightbox d'un média
    // create the media's lightbox
    function getLightboxCardDOM(mediaKey){

        const lightbox = document.createElement("div");
        lightbox.classList.add("lightbox");

        const closeLightbox = document.createElement("button");
        closeLightbox.classList.add("close_lightbox");
        closeLightbox.setAttribute("aria-label", "fermer la lightbox");
        lightbox.appendChild(closeLightbox);

        const closeLightboxIcon = document.createElement("span");
        closeLightboxIcon.innerHTML = "X";
        closeLightbox.appendChild(closeLightboxIcon);

        const lightboxContainer = document.createElement("div");
        lightboxContainer.classList.add("lightbox_container");
        lightbox.appendChild(lightboxContainer);

        const arrowLeft = document.createElement("button");
        arrowLeft.addEventListener("click",()=>{displayMedia((mediaKey+Medias.length-1) % Medias.length)});
        arrowLeft.setAttribute("aria-label", "image précédente");
        document.addEventListener("keydown",(event)=>{event.key === "ArrowLeft" ? displayMedia((mediaKey+Medias.length-1) % Medias.length) : ""})
        lightboxContainer.appendChild(arrowLeft);

        const arrowLeftIcon = document.createElement("span");
        arrowLeftIcon.innerHTML = "<";
        arrowLeft.appendChild(arrowLeftIcon);
       
        const lightboxMedia = document.createElement("div");
        lightboxMedia.classList.add("lightbox_media");
        lightboxContainer.appendChild(lightboxMedia);

        if (video == undefined) {
            const img = document.createElement( "img" );
            img.setAttribute( "src" , picture);
            img.setAttribute( "alt" , title);
            img.setAttribute("tabindex","0");
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
            video.setAttribute( "alt" , title);
            video.setAttribute( "aria-label" , title);
            video.setAttribute("tabindex","0");
            lightboxMedia.appendChild(video);   
        }

        const arrowRight = document.createElement("button");
        arrowRight.addEventListener("click",()=>{displayMedia((mediaKey+1) % Medias.length)});
        arrowRight.setAttribute("aria-label", "image suivante");
        document.addEventListener("keydown",(event)=>{event.key === "ArrowRight" ? displayMedia((mediaKey+1) % Medias.length) : ""})
        lightboxContainer.appendChild(arrowRight);

        const arrowRightIcon = document.createElement("span");
        arrowRightIcon.innerHTML = ">";
        arrowRight.appendChild(arrowRightIcon);

        const mediaTitle = document.createElement("h2");
        mediaTitle.innerHTML = title;
        lightbox.appendChild(mediaTitle);

        return lightbox
    }

    return { id, photographerId, title, image, likes, date, price, getMediaCardDOM, getLightboxCardDOM }
}