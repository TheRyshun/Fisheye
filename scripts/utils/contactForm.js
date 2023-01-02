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

  photographers.forEach((photographer) => {
    if (photographer.id === photographerId) {
      const profilName = document.getElementById("contact-name");
      profilName.textContent = photographer.name;
    }
  });
};

ContactName();

const modal = document.getElementById("contact_modal");

// Fonction pour permet d'afficher la modal du form
const displayModal = () => {
  modal.style.display = "flex";
};

// Récupère le bouton dans le dom et on lui attribut au clic d'afficher la modal
let btnContact = document.getElementById("contact");
btnContact.addEventListener("click", displayModal);

// Fonction pour permet de fermer la modal du form
const closeModal = () => {
  modal.style.display = "none";
};

//Permet que le bouton soit focus pour l'accessibilité + evènement pour le fermer
let btnCloseModal = document.getElementById("close_modal");
btnCloseModal.addEventListener("click", closeModal);

let LogName;
let LogLastName;
let LogEmail;
let LogMessage;

const ValidateName = () => {
  const inputFirstName = document.getElementById("firstName").value;
  const Nametrim = inputFirstName.trim();
  const errorName = document.getElementById("error-name");
  if (Nametrim === "") {
    errorName.textContent = "Veuillez renseigner le champ";
    return false;
  } else {
    errorName.textContent = "";
    LogName = Nametrim;
    return true;
  }
};

const ValidateLastName = () => {
  const inputLastName = document.getElementById("lastName").value;
  const LastNametrim = inputLastName.trim();
  const errorLastName = document.getElementById("error-lastName");

  if (LastNametrim === "") {
    errorLastName.textContent = "Veuillez renseigner le champ";
    return false;
  } else {
    errorLastName.textContent = "";
    LogLastName = LastNametrim;
    return true;
  }
};

const ValidateEmail = () => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const errorEmail = document.getElementById("error-email");

  if (!email.value.match(re)) {
    errorEmail.textContent = "Veuillez rentrer une adresse mail valide";
    return false;
  } else {
    LogEmail = email.value;
    errorEmail.textContent = "";
    return true;
  }
};

const ValidateMessage = () => {
  let inputMessage = document.getElementById("textArea").value;
  const Messagetrim = inputMessage.trim();
  const errorMessage = document.getElementById("error-message");

  if (Messagetrim === "") {
    errorMessage.textContent = "Veuillez renseigner le champ";
    return false;
  } else {
    errorMessage.textContent = "";
    LogMessage = Messagetrim;
    return true;
  }

}

const form = document.querySelector("form");

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
