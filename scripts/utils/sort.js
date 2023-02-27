import {displayMedia, displayPopMedias} from "../pages/photographer.js";
import {counterLike} from "./likes.js";

// ------------------------------------------------------------

/*
    Function : sortGallery
    - La fonction "sortGallery" prend en paramètre un tableau "arrayGallery" qui est censé contenir des images ou des vidéos.
    Elle ajoute un écouteur d'événement "change" sur un élément HTML "select" qui a l'id "select".
    Lorsque l'événement change se produit, la fonction vérifie la valeur de la cible de l'événement (c'est-à-dire l'élément "select")
    et exécute une fonction de tri correspondante en fonction de cette valeur.

    - Si la valeur est "date", la fonction "sortDate" est exécutée en utilisant le tableau "arrayGallery" en paramètre.
    Si la valeur est "like", la fonction "sortLikes" est exécutée en utilisant le tableau "arrayGallery" en paramètre.
    Si la valeur est "titre", la fonction "sortAlphabet" est exécutée en utilisant le tableau "arrayGallery" en paramètre.
    Si aucune des valeurs précédentes ne correspond, rien ne se produit.
*/

const sortGallery = (arrayGallery) => {
	const sortSelect = document.getElementById("select");
	sortSelect.addEventListener("change", (e) => {
		switch (e.target.value) {
		case "like":
			sortLikes(arrayGallery);
			break;
		case "date":
			sortDate(arrayGallery);
			break;
		case "titre":
			sortAlphabet(arrayGallery);
			break;
		default:
			break;
		}
	});
};

/*
    Function : sortLikes
    - La fonction "sortLikes" prend en paramètre un tableau "arrayGallery" qui est censé contenir des images
    ou des vidéos avec un champ "likes" qui contient le nombre de likes de chaque élément.
    Elle utilise la méthode "sort" pour trier les éléments dans "arrayGallery" en fonction de leur nombre de likes en utilisant une fonction de comparaison.
    La fonction de comparaison vérifie si le nombre de likes de l'élément "a" est inférieur à celui de "b", dans ce cas elle renvoie 1, si c'est supérieur,
    elle renvoie -1.

    - Après le tri, la propriété "innerHTML" de l'élément "gallery" est réinitialisée à une chaîne vide.
    Ensuite, la fonction "displayMedia" est appelée en utilisant "arrayGallery" en paramètre pour afficher les éléments triés,
    la fonction "displayPopMedias" est également appelée en utilisant "arrayGallery" en paramètre pour afficher les éléments triés dans un "popmedias",
    et enfin la fonction "counterLike" est appelée en utilisant "arrayGallery" en paramètre pour mettre à jour le compteur de "likes" pour chaque élément.
*/

const sortLikes = (arrayGallery) => {
	arrayGallery.sort( (a, b) => {
		if (a.likes < b.likes) {
			return 1;
		}
		if (a.likes > b.likes) {
			return -1;
		}
	});
	const gallery = document.getElementById("photographer_gallery");
	gallery.innerHTML = "";

	displayMedia(arrayGallery);
	displayPopMedias(arrayGallery);
	counterLike(arrayGallery);
};


/*
    Function : sortAlphabet
    - La fonction "sortAlphabet" prend en paramètre un tableau "arrayGallery" qui est censé contenir des images ou des vidéos avec un champ "title"
    qui contient le titre de chaque élément. Elle utilise la méthode "sort" pour trier les éléments dans "arrayGallery"
    en fonction de leur titre en utilisant une fonction de comparaison.
    La fonction de comparaison vérifie si le titre de l'élément "a" est inférieur à celui de "b" en utilisant la méthode "toLowerCase()"
    pour ignorer la casse, dans ce cas elle renvoie -1, si c'est supérieur, elle renvoie 1.

    - Après le tri, la propriété "innerHTML" de l'élément "gallery" est réinitialisée à une chaîne vide.
    Ensuite, la fonction "displayMedia" est appelée en utilisant "arrayGallery" en paramètre pour afficher les éléments triés, la fonction "displayPopMedias"
    est également appelée en utilisant "arrayGallery" en paramètre pour afficher les éléments triés dans un "popmedias", et enfin la fonction "counterLike"
    est appelée en utilisant "arrayGallery" en paramètre pour mettre à jour le compteur de "likes" pour chaque élément.
*/
const sortAlphabet = (arrayGallery) => {
	arrayGallery.sort((a, b) => {
		if (a.title.toLowerCase() < b.title.toLowerCase()) {
			return -1;
		}
		if (a.title.toLowerCase() > b.title.toLowerCase()) {
			return 1;
		}
	});
	const gallery = document.getElementById("photographer_gallery");
	gallery.innerHTML = "";
	displayMedia(arrayGallery);
	displayPopMedias(arrayGallery);
	counterLike(arrayGallery);
};

/*
    Function : sortAlphabet
    - La fonction "sortDate" prend en paramètre un tableau "arrayGallery" qui est censé contenir des images ou des vidéos avec un champ "date"
    qui contient la date de chaque élément. Elle utilise la méthode "sort" pour trier les éléments dans "arrayGallery"
    en fonction de leur date en utilisant une fonction de comparaison. La fonction de comparaison vérifie
    si la date de l'élément "a" est inférieur à celle de "b", dans ce cas elle renvoie -1, si c'est supérieur, elle renvoie 1.

    - Après le tri, la propriété "innerHTML" de l'élément "gallery" est réinitialisée à une chaîne vide.
    Ensuite, la fonction "displayMedia" est appelée en utilisant "arrayGallery" en paramètre pour afficher les éléments triés,
    la fonction "displayPopMedias" est également appelée en utilisant "arrayGallery" en paramètre pour afficher les éléments triés dans un "popmedias",
    et enfin la fonction "counterLike" est appelée en utilisant "arrayGallery" en paramètre pour mettre à jour le compteur de "likes" pour chaque élément.
*/
const sortDate = (arrayGallery) => {
	arrayGallery.sort((a, b) => {
		if (a.date < b.date) {
			return -1;
		}
		if (a.date > b.date) {
			return 1;
		}
	});
	const gallery = document.getElementById("photographer_gallery");
	gallery.innerHTML = "";

	displayMedia(arrayGallery);
	displayPopMedias(arrayGallery);
	counterLike(arrayGallery);
};

// ------------------------------------------------------------
// EXPORT
export {sortGallery};
