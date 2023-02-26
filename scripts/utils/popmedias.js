import { getPhotographers } from "../api.js";

const getPhotographerId = () => {
	return parseInt(new URLSearchParams(window.location.search).get("id"), 10);
};

/*
    Function : GetPhotographerName
	
	* @param void 
	* @import : getPhotographerId / getPhotographers 
	* @return Name

    - Cette fonction permet de récupérer le nom d'un photographe en fonction de son identifiant (ID).
	Elle utilise deux fonctions auxiliaires - getPhotographerId() pour récupérer l'ID et getPhotographers()
	pour obtenir une liste de tous les photographes. La fonction parcourt ensuite la liste des photographes,
	correspond l'ID avec l'ID du photographe, et extrait le prénom du photographe à partir de son nom complet. 
	Si le prénom contient un espace ou un tiret, il le remplace par un tiret.

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


class PopMedias {
	constructor(listElement) {
		this.currentElement = null;
		this.listElement = listElement;
		this.event();
	}

	/*
    Function : show
	
	* @param  : id 
	* @import : getElementById / display 
	* @return : Name

    - Affiche un élément spécifié en fonction de son ID. Elle met à jour la propriété "currentElement" de l'objet, 
	puis récupère le modal HTML correspondant et le stocke dans une variable "modal". 
	La fonction ajoute ensuite un gestionnaire d'événements pour la touche "Tab" afin d'empêcher la navigation en dehors de la fenêtre modale. 
	Enfin, elle appelle la fonction "display" pour afficher l'élément.

	*/

	show(id) {
		this.currentElement = this.getElementById(id);
		const modal = document.querySelector(".popmedias");
		const modalElements = modal.querySelectorAll("button");

		modal.addEventListener("keydown", function(e) {
			if (e.key === "Tab") {
				const lastElement = modalElements[modalElements.length - 1];
				if (document.activeElement === lastElement) {
					e.preventDefault();
					modalElements[0].focus();
				}
			}
		});
		this.display();
	}

	close() {
		document.querySelector(".popmedias").classList.remove("show");
		document.querySelector(".gallery-picture").focus();
	}

	/*
    Function : next
	
	* @param  :  
	* @import : listElement / currentElement / findIndex / display 
	* @return : 

    - Affiche l'élément suivant dans la liste des éléments stockés dans l'objet. Elle récupère l'index de l'élément actuel dans la liste grâce à la méthode findIndex(), 
	puis vérifie si cet élément est le dernier élément de la liste. Si c'est le cas, elle sélectionne le premier élément de la liste. 
	Sinon, elle sélectionne l'élément suivant dans la liste. La fonction appelle ensuite la méthode "display" pour afficher l'élément courant.

	*/

	next() {
		const index = this.listElement.findIndex(
			(element) => element.id === this.currentElement?.id
		);
		
		if (index === this.listElement.length - 1) {
			this.currentElement = this.listElement[0];
		} else {
			this.currentElement = this.listElement[index + 1];
		}
		this.display();
	}

	/*
    Function : next
	
	* @param  :  
	* @import : listElement / currentElement / findIndex / display 
	* @return : 

    - Affiche l'élément précédent dans la liste des éléments stockés dans l'objet. Elle récupère l'index de l'élément actuel dans la liste grâce à la méthode findIndex(), 
	puis vérifie si cet élément est le premier élément de la liste. Si c'est le cas, elle sélectionne le dernier élément de la liste. 
	Sinon, elle sélectionne l'élément précédent dans la liste. La fonction appelle ensuite la méthode "display" pour afficher l'élément courant.

	*/

	prev() {
		const index = this.listElement.findIndex(
			(element) => element.id === this.currentElement.id
		);

		if (index === 0) {
			this.currentElement = this.listElement[this.listElement.length - 1];
		} else {
			this.currentElement = this.listElement[index - 1];
		}
		this.display();
	}

	event() {
		document.querySelector(".popmedias-next").addEventListener("click", () => {
			this.next();
		});

		document.querySelector(".popmedias-prev").addEventListener("click", () => {
			this.prev();
		});

		document.querySelector(".popmedias-close").addEventListener("click", () => {
			this.close();
		});

		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape" || e.key === "Esc") {
				this.close();
			}

			if (e.key === "ArrowRight") {
				this.next();
			}

			if (e.key === "ArrowLeft") {
				this.prev();
			}
		});
	}

	getElementById(id) {
		return this.listElement.find((element) => element.id === parseInt(id, 10));
	}

	/*
    Function : display
	
	* @param  :  
	* @import : currentElement 
	* @return : 

    - Affiche l'élément courant dans une fenêtre modale. Elle commence par récupérer les éléments HTML correspondant à la fenêtre modale, à l'image, à la vidéo et au titre. 
	Elle vérifie ensuite si l'élément courant est une image ou une vidéo. Si c'est une image, elle masque la vidéo et affiche l'image. 
	Elle met également l'attribut "alt" de l'image avec le titre de l'élément courant. Si c'est une vidéo, elle masque l'image et affiche la vidéo. 
	La fonction met à jour le texte du titre avec le titre de l'élément courant, puis ajoute la classe "show" à la fenêtre modale pour l'afficher.

	*/

	display() {
		const PopImage = document.querySelector(".popmedias-image");
		const PopVideo = document.querySelector(".popmedias-video");
		const PopTitleMedia = document.querySelector(".popmedias-title");
		if (this.currentElement.image) {
			PopVideo.style.display = "none";
			PopImage.style.display = "block";
			PopImage.focus({ preventScroll: true });
			PopImage.setAttribute("tabindex", "0");
			PopImage.src = `assets/Sample Photos/${Name}/${this.currentElement.image}`;
			PopImage.setAttribute("alt", this.currentElement.title);
		} else {
			PopVideo.style.display = "block";
			PopImage.style.display = "none";
			PopVideo.focus({ preventScroll: true });
			PopVideo.src = `assets/Sample Photos/${Name}/${this.currentElement.video}`;
		}
		PopTitleMedia.textContent = this.currentElement.title;
		document.querySelector(".popmedias").classList.add("show");
	}
}
export { PopMedias };
