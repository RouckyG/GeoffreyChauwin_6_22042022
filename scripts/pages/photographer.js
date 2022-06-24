const urlParams = new URLSearchParams(window.location.search);
const photographerId = +urlParams.get('id')
const Medias = [];

async function getPhotographer() {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    const photographers = data.photographers
    let result = null
    photographers.forEach((photographer) =>{
        if(photographer.id == photographerId){
            result = photographer;
        }
    });

    return result;
}

async function getMedias() {
    const response = await fetch("./data/photographers.json");
    const data = await response.json();
    const medias = data.media;
    let photographerMedias = [];

    medias.forEach((media) =>{
        if(media.photographerId == photographerId){
            photographerMedias.push(media);
            Medias.push(media);
        }
    });

    return photographerMedias;
}

async function displayData(photographer) {
    const photographersSection = document.querySelector(".photograph_header");

    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserHeaderCardDOM();
    photographersSection.insertBefore(userCardDOM,photographersSection.firstChild);

};

async function displayMedias(medias) {
    const mediasSection = document.querySelector(".photograph_media");
    mediasSection.innerHTML="";

    medias.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();

        mediaCardDOM.lastChild.lastChild.addEventListener("click", (e)=>addLikes(e.target));
        mediaCardDOM.firstChild.addEventListener("click", ()=>displayMedia(Medias.indexOf(media)));
        mediasSection.appendChild(mediaCardDOM);
    });
};

async function displayMedia(mediaKey) {

    const mediaModel = mediaFactory(Medias[mediaKey]);

    displayLightbox();

    const lightboxContainer = document.querySelector("#lightbox");
    const LightboxCardDOM = mediaModel.getLightboxCardDOM(mediaKey);

    lightboxContainer.innerHTML = "";
    lightboxContainer.appendChild(LightboxCardDOM);

    const closeLightboxButton = document.querySelector(".close_lightbox");
    closeLightboxButton.addEventListener("click",()=>{closeLightbox()});
};

async function addLikes(span){
    let spanSplit = span.innerHTML.split(" ");
    spanSplit[0] = parseInt(spanSplit[0])+1;
    span.innerHTML = spanSplit.join(" ");
}

async function sortMedia(sort){
    const medias = Medias
    switch(sort){
        case "like":
            medias.sort((a,b) => a.likes - b.likes)
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

async function init() {
    const photographer = await getPhotographer();
    displayData( photographer );

    const medias = await getMedias();
    displayMedias( medias );

    document.getElementById("sort_options").addEventListener("change", (e)=>sortMedia(e.target.value))
};

init();
