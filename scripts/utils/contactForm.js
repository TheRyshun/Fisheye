/* eslint-disable linebreak-style */

import { getPhotographers } from "../api.js";

var tabindexList = [];

// Récupération de tous les éléments de la page
var elements = document.getElementsByTagName("*");

// Récupération de l'ID dans l'url du profil du photographe
const getPhotographerId = () => {
	return parseInt(new URLSearchParams(window.location.search).get("id"), 10);
};

/*
    Function : GetPhotographerName()

	- Elle effectue une requête à l'API des photographes en utilisant la fonction getPhotographers. 
	  Elle parcourt ensuite le tableau des photographes renvoyé par l'API à l'aide d'une boucle forEach pour trouver celui dont l'ID correspond à celui du photographe recherché. 
	  Une fois qu'elle a trouvé le photographe, elle sélectionne l'élément HTML ayant l'ID "contact-name" et y affiche le nom du photographe à l'aide de la propriété textContent. 
	  Cette fonction ne renvoie pas de valeur et doit être appelée explicitement pour mettre à jour le nom du photographe dans la page HTML.

*/

const GetPhotographerName = async () => {
	const photographerId = getPhotographerId();
	const response = await getPhotographers();

	response.photographers.forEach((photographer) => {
		if (photographer.id === photographerId) {
			const profilName = document.getElementById("contact-name");
			profilName.textContent = photographer.name;
		}
	});
};

GetPhotographerName();
const modal = document.getElementById("contact_modal");
const form = document.querySelector("form");

/*
    Function : displayModal()

La fonction boucle sur tous les éléments de la variable elements en stockant la valeur de l'attribut "tabindex" de chaque élément
dans un tableau tabindexList. Si l'attribut "tabindex" existe pour un élément, cela signifie qu'il peut être focusable.
Le code supprime ensuite l'attribut "tabindex" de chaque élément et modifie le style de l'élément modal pour afficher le contenu.
*/

const displayModal = () => {

	for (let i = 0; i < elements.length; i++) {
		let tabindexValue = elements[i].getAttribute("tabindex");

		if (tabindexValue) {
			tabindexList.push({element: elements[i]});
		}
		elements[i].removeAttribute("tabindex");
	}
	modal.style.display = "flex";
};

let btnContact = document.getElementById("contact");
btnContact.addEventListener("click", displayModal);

/*
    Function : closeModal()

La fonction boucle sur tous les éléments stockés dans le tableau tabindexList et rétablit leur attribut "tabindex"
en leur donnant la valeur "0". Cela permet aux éléments d'être focusable à nouveau lorsque la fenêtre modale est fermée.
Ensuite, la fonction modifie le style de l'élément modal pour cacher son contenu.
*/

const closeModal = () => {
	for (let i = 0; i < tabindexList.length; i++) {
		tabindexList[i].element.setAttribute("tabindex", "0");
	}
	modal.style.display = "none";
};

//Permet que le bouton soit focus pour l'accessibilité + evènement pour le fermer
let btnCloseModal = document.getElementById("close_modal");
btnCloseModal.addEventListener("click", closeModal);

let LogName;
let LogLastName;
let LogEmail;
let LogMessage;

///////////////////////////////

// Prénom //

const ValidateName = () => {

	//Variable sur l'input Prénom

	const inputFirstName = document.getElementById("firstName").value;
	const Nametrim = inputFirstName.trim();
	const errorName = document.getElementById("error-name");

	// Quand il n'y a aucun caractère alors
	// un champ de texte apparaît pour signaler l’utilisateur.

	if (Nametrim === "") {
		errorName.textContent = "Veuillez renseigner votre prénom";
		return false;
	} else {
		errorName.textContent = "";
		LogName = Nametrim;
		return true;
	}
};

form.addEventListener("input", ValidateName);

///////////////////////////////

// Nom //

const ValidateLastName = () => {
	//Variable sur l'input Nom
	const inputLastName = document.getElementById("lastName").value;
	const LastNametrim = inputLastName.trim();
	const errorLastName = document.getElementById("error-lastName");

	// Quand il n'y a aucun caractère alors
	// un champ de texte apparaît pour signaler l’utilisateur.
	if (LastNametrim === "") {
		errorLastName.textContent = "Veuillez renseigner votre nom";
		return false;
	} else {
		errorLastName.textContent = "";
		LogLastName = LastNametrim;
		return true;
	}
};

form.addEventListener("input", ValidateLastName);

///////////////////////////////

// E-mail //


const ValidateEmail = () => {
	const re =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const inputEmail = document.getElementById("email").value;
	const errorEmail = document.getElementById("error-email");

	// Si l'input ne contient pas les strings de la variable "re" correctement alors
	// un champ de texte apparaît pour signaler l’utilisateur.

	if (!inputEmail.value.match(re)) {
		errorEmail.textContent = "Veuillez rentrer une adresse mail valide";
		return false;
	} else {
		LogEmail = inputEmail;
		errorEmail.textContent = "";
		return true;
	}
};
form.addEventListener("input", ValidateEmail);

///////////////////////////////

// Message //

const ValidateMessage = () => {

	//Variable sur l'input Message

	let inputMessage = document.getElementById("textArea").value;
	const Messagetrim = inputMessage.trim();
	const errorMessage = document.getElementById("error-message");

	// Quand il n'y a aucun caractère alors
	// un champ de texte apparaît pour signaler l’utilisateur.

	if (Messagetrim === "") {
		errorMessage.textContent = "Veuillez renseigner un message";
		return false;
	} else {
		errorMessage.textContent = "";
		LogMessage = Messagetrim;
		return true;
	}
};
form.addEventListener("input", ValidateMessage);

///////////////////////////////

// Soumettre //

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const CheckName = ValidateName();
	const CheckLastName = ValidateLastName();
	const CheckEmail = ValidateEmail();
	const CheckMessage = ValidateMessage();

	if (CheckName && CheckLastName && CheckEmail && CheckMessage) {
		console.log(
			"Name : " +
        LogName +
        "\nLastName : " +
        LogLastName +
        "\nEmail : " +
        LogEmail +
        "\nMessage : " +
        LogMessage
		);
		form.reset();
		closeModal();
	}
});


/*
Ce code ajoute un événement "keydown" à un élément modal, qui est déclenché lorsque l'utilisateur appuie sur une touche du clavier.
Si la touche enfoncée est "Tab", l'événement empêche son comportement par défaut, récupère tous les éléments focusables dans la fenêtre modale
(i.e., les éléments qui peuvent recevoir le focus de l'utilisateur),et calcule l'index de l'élément actuellement focusé.
Ensuite, il détermine quel est le prochain élément focusable à cibler. Si la touche Shift est enfoncée,
il cible l'élément précédent, sinon, il cible le suivant. 
*/

modal.addEventListener("keydown", (event) => {
	if (event.key === "Tab") {
		event.preventDefault();
		let focusableElements = modal.querySelectorAll(
			"textarea, input[type='text'], button"
		);
		let focusedIndex = Array.prototype.indexOf.call(
			focusableElements,
			document.activeElement
		);
		if (event.shiftKey) {
			if (focusedIndex === 0) {
				focusableElements[focusableElements.length - 1].focus();
			} else {
				focusableElements[focusedIndex - 1].focus();
			}
		} else {
			if (focusedIndex === focusableElements.length - 1) {
				focusableElements[0].focus();
			} else {
				focusableElements[focusedIndex + 1].focus();
			}
		}
	}
});

