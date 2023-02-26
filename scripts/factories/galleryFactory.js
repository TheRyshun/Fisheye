const getPhotographerId = () => {
  return parseInt(new URLSearchParams(window.location.search).get("id"), 10);
};

let Name;

const PhotoName = async (photographers) => {
  const photographerId = getPhotographerId();

  let response = await fetch("/data/photographers.json");

  let json = await response.json();
  json = json.photographers;
  photographers = json;

  photographers.forEach((photographer) => {
    if (photographer.id === photographerId) {
      const value = photographer.name;
      const words = value.split(" ");
      let firstName = words[0];

      if (firstName.includes("-")) {
        firstName = firstName.replace(" ", "-");
      }
      console.log(firstName);
      Name = firstName;
    }
  });
};

PhotoName();

const galleryFactory = (data) => {
  const { id, photographerId, image, video, likes, title } = data;

  const getMedia = () => {
    const article = document.createElement("article");
    article.setAttribute("data-id", id);
    article.className = "gallery-picture";

    if (image) {
      //Ajout d'une image
      let imageLink = `/assets/Sample Photos/${Name}/${image}`;
      const picture = document.createElement("img");

      picture.className = "gallery-media";

      picture.setAttribute("src", imageLink);
      picture.setAttribute("alt", title);
      picture.setAttribute("data-id", id);

      article.appendChild(picture);
    } else if (video) {
      const videoLink = `/assets/Sample Photos/${Name}/${video}`;
      const videos = document.createElement("video");

      videos.className = "gallery-media";

      videos.setAttribute("src", videoLink);
      videos.setAttribute("alt", title);
      videos.setAttribute("data-id", id);

      article.appendChild(videos);
    }

    //Ajout du contenu de l'image ou video

    const div = document.createElement("div");
    div.className = "media-content";

    // Titre
    const mediaTitle = document.createElement("h3");
    mediaTitle.className = "title";
    mediaTitle.textContent = title;

    const mediaLikes = document.createElement("span");
    mediaLikes.className = "likes";
    mediaLikes.textContent = likes;

    const heart = document.createElement("i");
    heart.className = "fa-solid fa-heart fa-2x";

    article.appendChild(div);
    div.appendChild(mediaTitle);
    div.appendChild(mediaLikes);
    div.appendChild(heart);

    return article;
  };

  return { photographerId, getMedia };
};

export { galleryFactory };
