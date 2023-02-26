
// Récupération de l'ID dans l'url du profil du photographe
function getPhotographerId() {
  return parseInt(new URLSearchParams(window.location.search).get("id"), 10);
}

async function ContactName(photographers) {
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
  }
  
ContactName();

// Récupère le bouton dans le dom et on lui attribut au clic d'afficher la modal
let btnContact = document.getElementById("contact");
btnContact.addEventListener("click", displayModal);

// Fonction pour permet d'afficher la modal du form
function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "flex";
}

//Permet que le bouton soit focus pour l'accessibilité + evènement pour le fermer
let btnCloseModal = document.getElementById("close_modal");
btnCloseModal.addEventListener("click", closeModal);

// Fonction pour permet de fermer la modal du form
function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

// Fonction pour envoyer le formulaire
async function sendForm() {
  let contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputFirstName = document.getElementById("firstName").value;
    let inputLastName = document.getElementById("lastName").value;
    let inputEmail = document.getElementById("email").value;
    let inputMessage = document.getElementById("textArea").value;
    console.log(
      "Prénom : " + inputFirstName,
      ", Nom : " + inputLastName,
      ", Email : " + inputEmail,
      ", Votre message : " + inputMessage
    );
    contactForm.reset();
    closeModal();
  });
}

document.getElementById("submitForm").addEventListener("click", sendForm);
