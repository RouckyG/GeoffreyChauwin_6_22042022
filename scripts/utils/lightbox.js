const lightbox = document.querySelector("#lightbox");


function displayLightbox() {
    setTimeout(()=>{lightbox.focus()},100);
	lightbox.style.display = "flex";
}

function closeLightbox() {
    setTimeout(()=>{document.querySelector(".photograph_media").firstChild.querySelector(".mediaPicture").focus()},100);
    lightbox.style.display = "none";
}