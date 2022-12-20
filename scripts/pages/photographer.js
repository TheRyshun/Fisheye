import { getAPI } from "../api.js";
import { profilFactory } from "../factories/profilFactory.js";

function getPhotographerId() {
    return parseInt(new URLSearchParams(window.location.search).get("id"), 10);
}

const photographerId = getPhotographerId();

async function displayProfil(photographers) {
    photographers.forEach((photographer) => {
        if (photographer.id === photographerId) {
            const photographersData = profilFactory(photographer);
            photographersData.getPhotographerProfilDOM();
        }
    });
}

async function initPhotographer() {
    const { photographers } = await getAPI();
    displayProfil(photographers);
}
initPhotographer();

export { getPhotographerId };
