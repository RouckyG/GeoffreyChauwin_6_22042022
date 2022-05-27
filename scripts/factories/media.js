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
            video.setAttribute("source", picture);
            video.setAttribute("autoplay", true);
            video.setAttribute("loop", true);
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
    return { id, photographerId, title, image, likes, date, price, getMediaCardDOM }
}