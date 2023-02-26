import { getPhotographers } from "../api.js";

const getPhotographerId = () => {
	return parseInt(new URLSearchParams(window.location.search).get("id"), 10);
};

/*
    Function : GetPhotographerName()

	- Elle utilise la fonction getPhotographers pour récupérer les données de tous les photographes depuis l'API.
	  Elle parcourt ensuite la liste des photographes et récupère le nom du photographe actuel en comparant
	  son ID avec l'ID récupéré par la fonction getPhotographerId.

    - La fonction découpe le nom en mots et récupère le premier mot en le stockant dans la variable firstName. 
	  Si le prénom contient un tiret, la fonction le remplace par un espace. La variable Name est mise à jour avec le prénom formaté.

*/

let Name;

const GetPhotographerName = async () => {
	const photographerId = getPhotographerId();
	const response = await getPhotographers();

	
	response.photographers.forEach((photographer) => {

		if (photographer.id === photographerId) {
			const value = photographer.name;
			const words = value.split(" ");
			let firstName = words[0];

			if (firstName.includes("-")) {
				firstName = firstName.replace(" ", "-");
			}
			Name = firstName;
		}
	});
};

GetPhotographerName();

const galleryFactory = (data) => {
	const { id, photographerId, image, video, likes, title } = data;

	const getMedia = () => {
		const article = document.createElement("article");
		article.setAttribute("id", id);
		article.className = "gallery-picture";

		if (image) {

			//Ajout d'une image
			let imageLink = `/assets/Sample Photos/${Name}/${image}`;
			const picture = document.createElement("img");

			picture.className = "gallery-media";

			picture.setAttribute("src", imageLink);
			picture.setAttribute("alt", title);
			picture.setAttribute("id", id);
			picture.setAttribute("type", "image");
			picture.setAttribute("tabindex", "0");
			picture.setAttribute("aria-label", `${title}`);
			article.appendChild(picture);
      
		} else if (video) {
			const videoLink = `/assets/Sample Photos/${Name}/${video}`;
			const videos = document.createElement("video");

			videos.className = "gallery-media";

			videos.setAttribute("src", videoLink);
			videos.setAttribute("alt", title);
			videos.setAttribute("id", id);
			videos.setAttribute("type", "video");
			videos.setAttribute("tabindex", "0");
			videos.setAttribute("aria-label", `${title}`);
			article.appendChild(videos);
		}

		//Ajout du contenu de l'image ou video

		const div = document.createElement("div");
		div.className = "media-content";

		// Titre
		const mediaTitle = document.createElement("h3");
		mediaTitle.className = "title";
		mediaTitle.textContent = title;

		const mediaLike = document.createElement("p");
		mediaLike.className = "like";
		mediaLike.setAttribute("id", id);
		mediaLike.setAttribute("checked", "false");
		mediaLike.setAttribute("tabindex", "0");


		const numberLike = document.createElement("span");
		numberLike.className = "number-like";
		numberLike.setAttribute("id", id);
		numberLike.textContent = likes;


		const heart = document.createElement("i");
		heart.className = "fa-solid fa-heart fa";
		heart.setAttribute("aria-label", "likes");
		heart.setAttribute("role", "button");

		article.appendChild(div);
		div.appendChild(mediaTitle);
		div.appendChild(mediaLike);
		mediaLike.appendChild(numberLike);
		mediaLike.appendChild(heart);

		return article;
	};

	return { photographerId, getMedia };
};

export { galleryFactory };
