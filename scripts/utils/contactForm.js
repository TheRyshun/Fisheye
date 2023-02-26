// Création d'une liste pour stocker les valeurs de "tabindex"
var tabindexList = [];

// Récupération de tous les éléments de la page
var elements = document.getElementsByTagName("*");

// Récupération de l'ID dans l'url du profil du photographe
const getPhotographerId = () => {
  return parseInt(new URLSearchParams(window.location.search).get("id"), 10);
};

const ContactName = async (photographers) => {
  const photographerId = getPhotographerId();

  let response = await fetch("/data/photographers.json");

  let json = await response.json();
  json = json.photographers;
  photographers = json;

  /*
    -   Permet de récupérer l’ID dans l’url et vérifie si l'id du json et url ID est identique
*/

  photographers.forEach((photographer) => {
    if (photographer.id === photographerId) {
      const profilName = document.getElementById("contact-name");
      profilName.textContent = photographer.name;
    }
  });
};

ContactName();

const modal = document.getElementById("contact_modal");
const form = document.querySelector("form");

// Fonction pour permet d'afficher la modal du form
const displayModal = () => {
  // Boucle pour parcourir tous les éléments
for (var i = 0; i < elements.length; i++) {
  // Stockage de la valeur de "tabindex" dans la liste
  var tabindexValue = elements[i].getAttribute("tabindex");
  if (tabindexValue) {
      tabindexList.push({element: elements[i]});
  }
  // Suppression de l'attribut "tabindex"
  elements[i].removeAttribute("tabindex");
}

  modal.style.display = "flex";
};

// Récupère le bouton dans le dom et on lui attribut au clic d'afficher la modal
let btnContact = document.getElementById("contact");
btnContact.addEventListener("click", displayModal);

// Fonction pour permet de fermer la modal du form
const closeModal = () => {
  // Boucle pour parcourir la liste des valeurs "tabindex"
for (var i = 0; i < tabindexList.length; i++) {
  // Ajout de l'attribut "tabindex"
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
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const errorEmail = document.getElementById("error-email");

  // Si l'input ne contient pas les strings de la variable "re" correctement alors
  // un champ de texte apparaît pour signaler l’utilisateur.

  if (!email.value.match(re)) {
    errorEmail.textContent = "Veuillez rentrer une adresse mail valide";
    return false;
  } else {
    LogEmail = email.value;
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

// Ajout d'un écouteur d'événement pour l'événement keydown
modal.addEventListener("keydown", function (event) {
  // Vérification si la touche tab est appuyée
  if (event.key === "Tab") {
    // Prévention du comportement par défaut (tabulation vers le prochain élément)
    event.preventDefault();
    // Récupération des éléments focusable dans la modale
    var focusableElements = modal.querySelectorAll(
      "textarea, input[type='text'], button"
    );
    // Récupération de l'index de l'élément actuellement focus
    var focusedIndex = Array.prototype.indexOf.call(
      focusableElements,
      document.activeElement
    );
    // Si la touche tab est pressée et que l'on se trouve sur le dernier élément focusable, on remet le focus sur le premier élément
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
