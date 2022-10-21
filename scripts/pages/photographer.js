const urlParams = new URLSearchParams(window.location.search);
const photographerId = +urlParams.get('id')
const Medias = [];
let totalLikes = 0;

// récupère le photographe de l'url
// get the photographer from the url
async function getPhotographer() {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    const { photographers } = data;
    let result = null;

    photographers.forEach((photographer) =>{
        if(photographer.id == photographerId){
            result = photographer;
        }
    });

    return result;
}

// récupères les images et les vidéos du photographe de l'url
// get the medias of the photographer of the url
async function getMedias() {
    const response = await fetch("./data/photographers.json");
    const data = await response.json();
    const medias = data.media;
    let photographerMedias = [];

    medias.forEach((media) =>{
        if(media.photographerId == photographerId){
            photographerMedias.push(media);
            Medias.push(media);
            totalLikes += media.likes;
        }
    });

    return photographerMedias;
}

// affiche les informations du photographe dans la page du photographe
// display the details of the photographer on the photographer page
async function displayData(photographer) {
    const photographersSection = document.querySelector(".photograph_header");

    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserHeaderCardDOM();
    photographersSection.insertBefore(userCardDOM,photographersSection.firstChild);

    const totalLikeContainer = document.querySelector(".photograph_price").querySelector("span")
    totalLikeContainer.innerHTML = photographer.price
}

// affiche les images et vidéos du photographe
// display the pictures and videos of the photographer
async function displayMedias(medias) {
    const mediasSection = document.querySelector(".photograph_media");
    mediasSection.innerHTML="";

    medias.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        const mediaIndex = Medias.indexOf(media)

        mediaCardDOM.lastChild.lastChild.addEventListener("click", (e)=>addLikes(e.target));
        mediaCardDOM.lastChild.lastChild.addEventListener("keypress", (e)=>e.key === "Enter" ? addLikes(e.target): "");
        mediaCardDOM.firstChild.addEventListener("click", ()=>displayMedia(mediaIndex));
        mediaCardDOM.firstChild.addEventListener("keypress", (e)=>e.key === "Enter" ? displayMedia(mediaIndex): ""); 
        mediasSection.appendChild(mediaCardDOM);
    });
}

// affiche une image ou une video dans la lightbox
// display a picture or video in the lightbox
async function displayMedia(mediaKey) {


    const mediaModel = mediaFactory(Medias[mediaKey]);

    displayLightbox();

    const lightboxContainer = document.querySelector("#lightbox");
    const LightboxCardDOM = mediaModel.getLightboxCardDOM(mediaKey);

    lightboxContainer.innerHTML = "";
    lightboxContainer.appendChild(LightboxCardDOM);

    const closeLightboxButton = document.querySelector(".close_lightbox");
    closeLightboxButton.addEventListener("click",()=>{closeLightbox()});
    document.addEventListener("keydown",(event)=>{event.key === "Escape" ? closeLightbox() : ""})
}

async function displayTotalLikes(){
    const totalLikeContainer = document.querySelector(".photograph_totalLike").querySelector("span")

    totalLikeContainer.innerHTML = totalLikes;
}

async function addLikes(span){

    let spanSplit = span.innerHTML.split(" ");

    if(span.className === "liked"){
        spanSplit[0] = parseInt(spanSplit[0])-1;
        span.setAttribute("class","")
        totalLikes -= 1;
    }
    else{
        spanSplit[0] = parseInt(spanSplit[0])+1;
        span.setAttribute("class","liked")
        totalLikes += 1;
    }

    span.innerHTML = spanSplit.join(" ");

    displayTotalLikes()
}

// permet de trier les médias par rapport au plus populaire, au plus récent ou en ordre alphabétique  
// allow to filter the medias by likes, date or alphabetical
async function sortMedia(sort){
    const medias = Medias
    switch(sort){
        case "like":
            medias.sort((a,b) => b.likes - a.likes)
            break;
        case "date":
            medias.sort((a,b) => new Date(a.date) - new Date(b.date))
            break;
        case "title":
            medias.sort((a,b) => a.title.localeCompare(b.title))
            break;
    }

    displayMedias(medias)
}

// lance les fonctions permettant l'affichage des élément de la page
// launch all functions allowing the display of the elements on the screen
async function init() {
    const photographer = await getPhotographer();
    const medias = await getMedias();

    displayData( photographer );
    displayMedias( medias );
    displayTotalLikes();
    
    document.getElementById("sort_options").addEventListener("change", (e)=>sortMedia(e.target.value))
}

init();
