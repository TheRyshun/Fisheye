const galleryFactory = (data) => {
    const { photographerId, image, video, likes, title, id } = data;

    const getMedia = () => {
        const article = document.createElement("article");
        article.setAttribute("data-id", id);
        article.className = "gallery-picture";

        if (image) {
            //Ajout d'une image
            let imageLink = `/assets/Sample Photos/Mimi/${image}`;
            console.log(imageLink);
            const picture = document.createElement("img");

            picture.className = "gallery-media";

            picture.setAttribute("src", imageLink);
            picture.setAttribute("alt", title);
            picture.setAttribute("data-id", id);

            article.appendChild(picture);
        } else if (video) {
            
        }

        //Ajout du contenu de l'image ou video

        const div = document.createElement("div");
        div.className = "media-content";

        // Titre
        const mediaTitle = document.createElement("h3");
        mediaTitle.className = "title";
        mediaTitle.textContent = title;

        article.appendChild(div);
        div.appendChild(mediaTitle);
        return article;
    }

    return { photographerId, getMedia };
}


export { galleryFactory };