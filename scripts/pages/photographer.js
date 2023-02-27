// IMPORT
import { getAPI } from "../api.js";
import { galleryFactory } from "../factories/galleryFactory.js";
import { profilFactory } from "../factories/profilFactory.js";
import { counterLike, likeTotal } from "../utils/likes.js";
import { PopMedias } from "../utils/popmedias.js";
import { sortGallery } from "../utils/sort.js";

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
	
	* @param  : photographers  
	* @import : 
	* @return : 

	- Elle parcourt le tableau 'photographers' avec une boucle forEach et, pour chaque objet 'photographer', vérifie si son 'id' correspond à 'photographerId'.
	  Si c'est le cas, la fonction utilise une méthode 'getPhotographerProfilDOM' de l'objet 'profilFactory' pour afficher les données du photographe dans le DOM.

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
	
	* @param  : media  
	* @import : 
	* @return : 

	- Affiche les médias d'un photographe sur la page web. Elle prend en paramètre un tableau de médias "medias". 
	Pour chaque élément du tableau, la fonction crée un objet "mediaFactory" à partir de la classe "galleryFactory" et utilise la méthode "getMedia()"
	pour générer le code HTML correspondant au média. Ensuite, la fonction ajoute ce code HTML à la page en l'insérant dans l'élément HTML
	ayant l'ID "photographer_gallery". Seuls les médias ayant l'ID du photographe correspondant à la variable "photographerId" seront affichés.

	*/

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
    Function : displayPopMedias
	
	* @param  : media  
	* @import : 
	* @return : 

	- Elle parcourt ensuite chaque élément du tableau pour ne garder que ceux qui ont le même identifiant que le photographe en cours d'affichage. 
	  Ensuite, elle instancie un objet "PopMedias" en lui passant la liste des médias.
	  Cette classe est utilisée pour afficher une galerie de médias en popup lorsque l'utilisateur clique sur une vignette de la galerie.

	- La fonction ajoute également des écouteurs d'événements "click" et "keydown" sur chaque élément de la galerie. 
	  Lorsque l'utilisateur clique ou appuie sur la touche "Entrée" sur un élément de la galerie,
	  la méthode "show" de l'objet "PopMedias" est appelée avec l'identifiant du média correspondant en argument. 
	  Cette méthode permet d'afficher la galerie en popup avec les médias du photographe sélectionné.

	*/
async function displayPopMedias(medias) {
	const listMedias = [];
	for (const media in medias) {
		if (medias[media].photographerId === photographerId) {
			listMedias.push(medias[media]);
		}
	}
	
	const PopPhotographer_Medias = new PopMedias(listMedias);
	document.querySelectorAll(".gallery-media").forEach((mediaDom) => {
		mediaDom.addEventListener("click", (e) => {
			PopPhotographer_Medias.show(e.target.id);
		});
	});

	document.querySelectorAll(".gallery-media").forEach((mediaDom) => {
		mediaDom.addEventListener("keydown", (e) => {
			if (e.key === "Enter") {
				PopPhotographer_Medias.show(e.target.id);
			}
		});
	});
}

/*
    Function : initPhotographer
    - La fonction initPhotographer ne prend pas de paramètres et est asynchrone. 
	  Elle est appelée pour initialiser l'affichage du profil et de la galerie d'un photographe
*/

const initPhotographer = async () => {
	const { media, photographers } = await getAPI();
	displayProfil(photographers);
	displayMedia(media);
	displayPopMedias(media);
	counterLike(media);
	likeTotal(media);
	sortGallery(media);

};
initPhotographer();

export { getPhotographerId, displayPopMedias, displayMedia };
