let index = 0;
let PopImage = document.querySelector(".popmedias-image");
let PopVideo = document.querySelector(".popmedias-video");
let PopTitleMedia = document.querySelector(".popmedias-title");
let imageArray = [];
let imageArrayTitle = [];
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
    if (!initial) {
      for (var i = 0; i < imageLists.length; i++) {
        imageArray.push(imageLists[i].src);
        imageArrayTitle.push(imageLists[i].alt)
        limit += 1;
      }
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
        PopTitleMedia.textContent = imageArrayTitle[index]; 
        nowImage = false;
      }
      if (index == numberV) {
        PopImage.style.display = "none";
        PopVideo.style.display = "block";
        PopVideo.src = imageArray[index];
        PopTitleMedia.textContent = imageArrayTitle[index]; 
        nowImage = true;
      } else {
        PopImage.style.display = "block";
        PopVideo.style.display = "none";
        PopImage.src = imageArray[index];
        PopTitleMedia.textContent = imageArrayTitle[index]; 
      }
    }
  }
  /*
    Function : next()
    -  La fonction "prev()" parcourt la liste des images "imageLists" et ajoute chaque source de ces images dans un tableau "imageArray".
    Elle définit également une limite en incrémentant la variable "limit" à chaque itération.
    Si c'est la première fois que la fonction est appelée (initial est défini à false),
    elle cherche également l'index d'une vidéo dans le tableau d'images en vérifiant si l'extension de chaque élément se termine par ".mp4"
    et en stockant cet index dans la variable "numberV".

    - La variable "index" est ensuite décrémentée de 1. Si "index" est supérieur ou égal à 0, la fonction vérifie si l'image actuelle est une image ou une vidéo en utilisant la variable booléenne "nowImage".
     Si c'est une image, elle affiche l'image en question en utilisant la source de l'image dans "imageArray" à l'index "index"
     et masque la vidéo en utilisant les propriétés de style "display". Si "index" est égal à "numberV", 
     cela signifie que l'image actuelle est une vidéo et la vidéo est affichée à la place. Sinon, l'image suivante est affichée.
*/
  prev() {
    if (!initial) {
      for (var i = 0; i < imageLists.length; i++) {
        imageArray.push(imageLists[i].src);
        imageArrayTitle.push(imageLists[i].alt)
        limit += 1;
      }
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
        PopTitleMedia.textContent = imageArrayTitle[index]; 
        nowImage = false;
      }
      if (index == numberV) {
        PopImage.style.display = "none";
        PopVideo.style.display = "block";
        PopVideo.src = imageArray[numberV];
        PopTitleMedia.textContent = imageArrayTitle[index]; 
        nowImage = true;
      } else {
        PopImage.style.display = "block";
        PopVideo.style.display = "none";
        PopImage.src = imageArray[index];
        PopTitleMedia.textContent = imageArrayTitle[index]; 
      }
    }
  }

  close() {
    document.querySelector(".popmedias").classList.remove("show");
    document.querySelector(".gallery-picture").focus();
  }

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

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
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

  /*
    Function : display()
    -  Est utilisée pour afficher des images et des vidéos en plein écran lorsque l'utilisateur clique dessus.
    La fonction démarre par la déclaration d'une constante appelée "PopMedia" qui sélectionne tous les éléments de la classe "gallery-media" dans le document HTML.

    -  Ensuite, la fonction utilise la méthode "forEach" pour itérer sur chaque élément de "PopMedia" et ajoute un écouteur d'événement "click" pour chaque élément.
    Lorsque l'utilisateur clique sur un élément, la fonction vérifie si l'attribut "type" de l'élément est égal à "video", si c'est le cas, il définit les propriétées "display"
    et définit la propriété "src" de "PopVideo" à l'attribut "src" de l'élément cliqué.
    Sinon, il définit la propriété "display" de "PopImage" à "block" et "PopVideo" à "none" et attribut "src" de l'élément cliqué.

    -  Enfin, la fonction ajoute la classe "show" à l'élément de la classe "popmedias" pour afficher l'image ou la vidéo en plein écran.
*/
  display() {
    const PopMedia = document.querySelectorAll(".gallery-media");
    const PopTitle = document.querySelector(".popmedias-title");

    PopMedia.forEach(function (Media) {
      Media.addEventListener("click", function () {
        let dataIndex = Media.getAttribute("data-index");
        if (Media.getAttribute("type") === "video") {
          PopImage.style.display = "none";
          PopVideo.style.display = "block";
          PopVideo.src = this.src;
          PopTitle.textContent = Media.getAttribute("alt"); 
        } else {
          PopImage.style.display = "block";
          PopVideo.style.display = "none";
          PopImage.src = this.src;
          PopTitleMedia.textContent = this.alt; 
        }
        index = dataIndex;  
        document.querySelector(".popmedias").classList.add("show");
      });
    });

    PopMedia.forEach(function (Media) {
      Media.addEventListener("keydown", function (e) {
        let dataIndex = Media.getAttribute("data-index");
        if (e.key === "Enter") {
          if (Media.getAttribute("type") === "video") {
            PopImage.style.display = "none";
            PopVideo.style.display = "block";
            PopVideo.src = this.src;
            PopTitleMedia.textContent = this.alt; 
          } else {
            PopImage.style.display = "block";
            PopVideo.style.display = "none";
            PopImage.src = this.src;
            PopTitleMedia.textContent = this.alt; 
          }
          index = dataIndex;  
          document.querySelector(".popmedias").classList.add("show");
        }
      });
    });

  }
}

export { PopMedias };
