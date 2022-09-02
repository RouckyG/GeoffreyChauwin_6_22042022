// récupère les informations des photographes
// get the data of all photographers
async function getPhotographers() {
    const response = await fetch('data/photographers.json');
    const data = await response.json();
    
    return data;
}

// affiche les informations de chaque photographe
// display de data of each photographer
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

// lance les fonctions permettant l'affichage des élément de la page
// start all functions allowing the display of the page's element
async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();
