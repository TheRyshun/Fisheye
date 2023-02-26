import { getPhotographerId } from "../pages/photographer.js";

/*
    Function : counterLike
    - Lorsque l’utilisateur clique sur un cœur ou le texte du compteur de like.

    - Quand l’user clique, une vérification est faite
      pour check les médias en global et cherche l'égalité entre l’id du html et celle du json.

    - Pour finir une condition if est utilisé pour vérifier si “ like.getAttribute("checked") === "true" ”
      pour ensuite à l’intérieur initialiser le checked en false en enlevant 1 à l’imag et au compteur global
*/
const counterLike = (mediasArray) => {
    const likes = document.querySelectorAll(".like");
    const totalLikes = document.querySelector('.profil-like');

    const heart = document.createElement("i");
    heart.className = "fa-solid fa-heart fa";

    likes.forEach(like => {
        like.addEventListener("click", () => {
            const nombreDeLikes = like.querySelector('.number-like');
            const picId = parseInt(like.id);

            
            mediasArray.forEach(medias => {
                if (picId === medias.id) {
                    if (like.getAttribute("checked") === "true") {
                        like.setAttribute("checked", false);
                        nombreDeLikes.textContent = parseInt(nombreDeLikes.textContent) - 1;
                        totalLikes.textContent = parseInt(totalLikes.textContent) - 1
                    } else {
                        like.setAttribute("checked", true);
                        nombreDeLikes.textContent = parseInt(nombreDeLikes.textContent) + 1;
                        totalLikes.textContent = parseInt(totalLikes.textContent) + 1;
                    }
                    totalLikes.appendChild(heart);
                    console.log("L'image : [ " + medias.id + " ] à un total de like de " +
                     nombreDeLikes.textContent + " avec un total en global de " + totalLikes.textContent);
                }
            })
        });
    });
}

/*
    Function : likeTotal
    - Une boucle for qui permet de prendre les éléments des médias du photographerId en les pushs.
    - Un boucle for qui accumulent les éléments médias pour les additionner.
    - Affiche dans les ID = total-like en rajoutant un cœur.
*/

const likeTotal = (medias) => {
    const likes = [];
    const photographerId = getPhotographerId();

    for (const element in medias) {
        if (medias[element].photographerId === photographerId) {
            likes.push(medias[element]);
        }
    }

    let totalLike = 0;
    likes.forEach((element) => {
        totalLike += parseInt(element.likes);
    });

    const heart = document.createElement("i");
    heart.className = "fa-solid fa-heart";
    heart.style.margin = "0px 5px";
    const Tlike = document.getElementById("total-like");
    Tlike.textContent = totalLike;
    Tlike.appendChild(heart);
}
export { counterLike, likeTotal };
