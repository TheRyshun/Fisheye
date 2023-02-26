let index = -1;
let PopImage = document.querySelector(".popmedias-image");
let PopVideo = document.querySelector(".popmedias-video");
let imageArray = [];
let imageLists = document.getElementsByClassName("gallery-media");
let initial = false;
let nowImage = false;
let numberV;
let limit = 0;
class PopMedias {
  constructor() {
    this.event();
  }

  // Récupère l'élement avec la fonction getElementbyId pour connaitre son id et on lance la fonction display pour faire l'affichage soit d'une img ou d'une vidéo
  show() {
    let PopMedia = document.querySelectorAll(".gallery-media");

    PopMedia.forEach(function (Media) {
      Media.addEventListener("click", function () {
        index = Media.getAttribute("data-index");
      });
    });
    this.display();
  }


/*
    Function : next()
    -  Est utilisée pour afficher des images et des vidéos dans un ordre spécifique.
    La fonction démarre par l'initialisation d'une boucle qui parcoure un tableau appelé "imageLists" 
    et ajoute la propriété "src" de chaque élément dans un nouveau tableau appelé "imageArray" 
    et incrémente la variable "limit".

    - Ensuite, il vérifie si une variable appelée "initial" est fausse,
    si c'est le cas, il initialise une deuxième boucle qui parcourt "imageArray" et vérifie si l'élément se termine par ".mp4",
    si c'est le cas, il affecte l'index de cet élément à une variable appelée "numberV" et met "initial" à vrai.

    - Après cela, il incrémente une variable appelée "index" et vérifie si elle est inférieure à "limit", si c'est le cas,
    il vérifie si une variable appelée "nowImage" est vraie, si c'est le cas,
    il définit les propriétées "display" et il met alors "nowImage" à faux.  

    - Si "index" est égal à "numberV", il définit les propriétées "display" et src "imageArray" de l'index et met "nowImage" à vrai
      Si "index" n'est pas égal à "numberV", il définit les propriétées "display" et src "imageArray".


*/
  next() {

    for (var i = 0; i < imageLists.length; i++) {
      imageArray.push(imageLists[i].src);
      limit += 1;
    }
    if (!initial) {
      for (var i = 0; i < imageArray.length; i++) {
        if (imageArray[i].endsWith(".mp4")) {
          numberV = i;
        }
      }
      initial = true;
    }
    ++index;

    if (index < limit) {
      if (nowImage == true) {
        PopImage.style.display = "block";
        PopVideo.style.display = "none";
        PopImage.src = imageArray[index];
        nowImage = false;
      }
      if (index == numberV) {
        PopImage.style.display = "none";
        PopVideo.style.display = "block";
        PopVideo.src = imageArray[numberV];
        nowImage = true;
      } else {
        PopImage.style.display = "block";
        PopVideo.style.display = "none";
        PopImage.src = imageArray[index];
      }
    }
  }

  // Permet d'afficher le media d'avant, si on est au début revient à la fin.
  prev() {

    for (var i = 0; i < imageLists.length; i++) {
      imageArray.push(imageLists[i].src);
      limit += 1;
    }
    if (!initial) {
      for (var i = 0; i < imageArray.length; i++) {
        if (imageArray[i].endsWith(".mp4")) {
          numberV = i;
        }
      }
      initial = true;
    }
    --index;

    if (index >= 0) {
      if (nowImage == true) {
        PopImage.style.display = "block";
        PopVideo.style.display = "none";
        PopImage.src = imageArray[index];
        nowImage = false;
      }
      if (index == numberV) {
        PopImage.style.display = "none";
        PopVideo.style.display = "block";
        PopVideo.src = imageArray[numberV];
        nowImage = true;
      } else {
        PopImage.style.display = "block";
        PopVideo.style.display = "none";
        PopImage.src = imageArray[index];
      }
    }
  }

  // Ferme la popmedias et on redonne le focus sur la gallerie
  close() {
    document.querySelector(".popmedias").classList.remove("show");
    document.querySelector(".gallery-picture").focus();
  }

  // Evenement au clic pour slide de droite à gauche et fermer + accessibilité
  event() {
    document.querySelector(".popmedias-close").addEventListener("click", () => {
      this.close();
    });

    document.querySelector(".popmedias-next").addEventListener("click", () => {
      this.next();
    });

    document.querySelector(".popmedias-prev").addEventListener("click", () => {
      this.prev();
    });
  }

/*
    Function : next()
    -  Est utilisée pour afficher des images et des vidéos en plein écran lorsque l'utilisateur clique dessus.
    La fonction démarre par la déclaration d'une constante appelée "PopMedia" qui sélectionne tous les éléments de la classe "gallery-media" dans le document HTML.




*/
  display() {
    const PopMedia = document.querySelectorAll(".gallery-media");

    PopMedia.forEach(function (Media) {
      Media.addEventListener("click", function () {
        if (Media.getAttribute("type") === "video") {
          PopImage.style.display = "none";
          PopVideo.style.display = "block";
          PopVideo.src = this.src;
        } else {
          PopImage.style.display = "block";
          PopVideo.style.display = "none";
          PopImage.src = this.src;
        }
        document.querySelector(".popmedias").classList.add("show");
      });
    });
  }
}

export { PopMedias };
