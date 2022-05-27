const urlParams = new URLSearchParams(window.location.search);
const photographerId = +urlParams.get('id')

console.log(photographerId);

async function getPhotographer() {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    const photographers = data.photographers
    let result = null
    photographers.forEach((photographer) =>{
        if(photographer.id == photographerId){
            console.log('test1', photographer)
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
            console.log(media.title);
            photographerMedias.push(media);
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

    medias.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediasSection.appendChild(mediaCardDOM);
    });
};

async function init() {
    const photographer = await getPhotographer();
    displayData( photographer );

    const medias = await getMedias();
    displayMedias( medias );
};

init();