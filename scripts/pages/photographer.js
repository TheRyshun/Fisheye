// IMPORT
import { getAPI } from "../api.js";
import { galleryFactory } from "../factories/galleryFactory.js";
import { profilFactory } from "../factories/profilFactory.js";

/*
    Function : getPhotographerId
    -   Permet de récupérer l’ID dans l’url de l’utilisateur lorsqu’il est dans le profil
*/
const getPhotographerId = () => {
  return parseInt(new URLSearchParams(window.location.search).get("id"), 10);
};

const photographerId = getPhotographerId();

/*
    Function : displayProfil
    -   Parcours tous les photographes par le forEach puis ensuite une condition if est utilisé 
    pour voir si l’id du photographe et le même que celui de L’ID Url.

    -   Si la condition est respecté alors une variable utilise le profilFactory du photographe
     pour récupérer les infos grâce au getPhotographerProfilDOM
*/
const displayProfil = (photographers) => {
  photographers.forEach((photographer) => {
    if (photographer.id === photographerId) {
      const photographersData = profilFactory(photographer);
      photographersData.getPhotographerProfilDOM();
    }
  });
};

/*
    Function : displayMedia
    -   Cette fonction suit le même procédé que la displayProfil mais avec les médias.
*/
// Fonction qui permet l'affichage des médias de galerie à partir du templating de la galerie
const displayMedia = (medias) => {
  const mediasContent = document.querySelector("#photographer_gallery");

  medias.forEach((media) => {
    if (media.photographerId === photographerId) {
      const mediaFactory = galleryFactory(media);
      const mediaDOM = mediaFactory.getMedia();
      mediasContent.appendChild(mediaDOM);
    }
  });
};

/*
    Function : initPhotographer
    -   Récupère les données grâce à getAPI() avec les données spécifiques : media, photographers.
    -   Initialisation des functions displayProfil, displayMedia pour faire apparaître les éléments dans la page.
*/
const initPhotographer = async () => {
  const { media, photographers } = await getAPI();
  displayProfil(photographers);
  displayMedia(media);
};
initPhotographer();

export { getPhotographerId };
