import { getPhotographerId } from "../pages/photographer.js";

function counterLike(medias) {
	const likes = document.querySelectorAll(".like");

	const heart = document.createElement("i");
	heart.className = "fa-solid fa-heart fa";

	/*

    - Cette fonction ajoute un événement "click" à chaque élément "like" sur la page.
	- Lorsqu'un élément "like" est cliqué, elle met à jour le nombre de likes sur l'élément et le nombre total de likes sur la page,
	  en fonction de si l'utilisateur a déjà aimé l'élément ou non.
	- Elle met également à jour la propriété "like" de l'élément de la collection de médias correspondant à l'élément "like" cliqué.

	*/

	likes.forEach((element) => {
		element.addEventListener("click", (e) => {
			const nbrLikes = element.querySelector(".number-like");
			const totalLikes = document.querySelector(".profil-like");
			const mediaId = e.target.closest("article").querySelector(".gallery-media").getAttribute("id");
			const mediaLikes = medias.find((el) => el.id === parseInt(mediaId));
			if (mediaLikes.like === "checked") {
				nbrLikes.textContent = parseInt(nbrLikes.textContent) - 1;
				totalLikes.textContent = parseInt(totalLikes.textContent) - 1;
				mediaLikes.likes -= 1;
				mediaLikes.like = "";
			} else {
				nbrLikes.textContent = parseInt(nbrLikes.textContent) + 1;
				totalLikes.textContent = parseInt(totalLikes.textContent) + 1;
				mediaLikes.likes += 1;
				mediaLikes.like = "checked";
			}
			totalLikes.appendChild(heart);
		});
	});

	likes.forEach((element) => {
		element.addEventListener("keydown", (e) => {
			if (e.key === "Enter") {
				const nbrLikes = element.querySelector(".number-like");
				const totalLikes = document.querySelector(".profil-like");
				const mediaId = e.target.closest("article").querySelector(".gallery-media").getAttribute("id");
				const mediaLikes = medias.find((el) => el.id === parseInt(mediaId));
	
				if (mediaLikes.like === "checked") {
					nbrLikes.textContent = parseInt(nbrLikes.textContent) - 1;
					totalLikes.textContent = parseInt(totalLikes.textContent) - 1;
					mediaLikes.likes -= 1;
					mediaLikes.like = "";
				} else {
					nbrLikes.textContent = parseInt(nbrLikes.textContent) + 1;
					totalLikes.textContent = parseInt(totalLikes.textContent) + 1;
					mediaLikes.likes += 1;
					mediaLikes.like = "checked";
				}
				totalLikes.appendChild(heart);	
			}
		});
	});
}


/*
    Function : likeTotal
	
	* @param  : medias 
	* @import : getPhotographerId 
	* @return : 

    - Récupère l'ID du photographe courant en appelant la fonction getPhotographerId().
	- Parcourt le tableau medias pour trouver les médias qui ont le même photographerId que le photographe courant, et les ajoute à un nouveau tableau likes.
	- Calcule le nombre total de likes pour les médias du photographe courant en additionnant les propriétés likes de tous les éléments de likes.
	- Affiche le nombre total de likes pour les médias du photographe courant dans la page web en utilisant la méthode textContent de l'élément HTML avec la classe .profil-like.
	- Crée un nouvel élément <i> de classe "fa-solid fa-heart", lui ajoute une marge de 5px à gauche et à droite, 
	  puis l'ajoute à l'élément HTML avec l'ID "total-like" à l'aide de la méthode appendChild().

	*/

function likeTotal(medias) {
	const likes = [];
	const photographerId = getPhotographerId();

	for (const element in medias) {
		if (medias[element].photographerId === photographerId) {
			likes.push(medias[element]);
		}
	}

	let totalLike = 0;
	likes.forEach((element) => {
		totalLike += parseInt(element.likes, 10);
	});

	document.querySelector(".profil-like").textContent = totalLike;
	const heart = document.createElement("i");
	heart.className = "fa-solid fa-heart";
	heart.style.margin = "0px 5px";
	const Tlike = document.getElementById("total-like");
	Tlike.textContent = totalLike;
	Tlike.appendChild(heart);
}

export { counterLike, likeTotal };
