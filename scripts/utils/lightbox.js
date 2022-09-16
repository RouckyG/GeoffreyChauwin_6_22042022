const lightbox = document.querySelector("#lightbox");


function displayLightbox() {
	lightbox.style.display = "flex";
    
    setTimeout(()=>{lightbox.querySelector(".lightbox_media").firstChild.focus()},100);
}

function closeLightbox() {
    setTimeout(()=>{document.querySelector(".photograph_media").firstChild.querySelector(".mediaPicture").focus()},100);
    lightbox.style.display = "none";
}