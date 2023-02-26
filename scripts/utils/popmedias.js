let index = 0;
let PopImage = document.querySelector(".popmedias-image");
let PopVideo = document.querySelector(".popmedias-video");
let PopTitleMedia = document.querySelector(".popmedias-title");
let imageArray = [];
let imageArrayTitle = [];
let nowImage = false;
let numberV;
let limit = 0;

class PopMedias {
  constructor() {
    this.event();
  }

    /*
    Function : show()

    - Cette méthode permet de récupérer toutes les images et vidéos dans la galerie et de les stocker dans deux tableaux,
    un pour les images et l'autre pour les titres d'image. Elle ajoute également un attribut "data-index" à chaque élément de la galerie,
    qui est utilisé pour récupérer l'index de l'élément cliqué par l'utilisateur.
    Cette méthode appelle également la méthode "display()" pour afficher la galerie.
    */
  show() {
    const PopMedia = document.querySelectorAll(".gallery-media");
    let NewData = -1;

    imageArray.splice(0);
    imageArrayTitle.splice(0);
    limit = 0;
    
    PopMedia.forEach((Media) => {
      Media.setAttribute("data-index", ++NewData);
      imageArray.push(Media.getAttribute("src"));
      imageArrayTitle.push(Media.getAttribute("alt"));
      limit += 1;
    });

    for (var i = 0; i < imageArray.length; i++) {
      if (imageArray[i].endsWith(".mp4")) {
        numberV = i;
      }
    }

    PopMedia.forEach((Media) => {
      Media.addEventListener("click", function () {
        index = Media.getAttribute("data-index");
      });
    });
    this.display();
  }

  /*
    Function : next()

    -  Cette fonction permet de passer à l'image ou à la vidéo suivante dans la fenêtre pop-up en fonction de l'indice
    de l'image ou de la vidéo actuelle. Si la limite d'images ou de vidéos est atteinte, la fonction ne fait rien.
  */
  next() {
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
    Function : prev()

    -  Cette fonction permet de passer à l'image ou à la vidéo précédente dans la fenêtre pop-up en fonction de l'indice
    de l'image ou de la vidéo actuelle. Si la limite d'images ou de vidéos est atteinte, la fonction ne fait rien.
  */
  prev() {
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

    - Cette fonction affiche une fenêtre pop-up avec une image ou une vidéo en fonction de ce que l'utilisateur clique.
    Elle écoute également les événements de la touche "Entrée" sur les médias sélectionnés, et si l'utilisateur appuie sur la touche 'Entrée',
    le même comportement qu'un clic est déclenché.
  */
  display() {
    const PopMedia = document.querySelectorAll(".gallery-media");
    const PopTitle = document.querySelector(".popmedias-title");

    PopMedia.forEach((Media) => {
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

    PopMedia.forEach((Media) => {
      Media.addEventListener("keydown", function (e) {
        let dataIndex = Media.getAttribute("data-index");
        if (e.key === "Enter") {
          if (Media.getAttribute("type") === "video") {
            PopImage.style.display = "none";
            PopVideo.style.display = "block";
            PopImage.focus({ preventScroll: true });
            PopImage.setAttribute("tabindex", "0");
            PopVideo.src = this.src;
            PopTitleMedia.textContent = this.alt;
          } else {
            PopImage.style.display = "block";
            PopVideo.style.display = "none";
            PopVideo.focus({ preventScroll: true });
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
