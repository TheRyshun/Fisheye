function profilFactory(data) {
    const { id, name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;


    function getPhotographerProfilDOM() {

        const priceF = document.getElementById("price");
        priceF.textContent = price + "€ / jour";

        const header = document.querySelector(".photograph-header");
        const profilCard = document.createElement("div");
        profilCard.classList = "profil-card";

        const profilInfo = document.createElement("div");
        profilInfo.classList = "profil-info";

        const profilBtn = document.createElement("div");
        profilBtn.classList = "profil-btn";
        const Btncontact = document.getElementById("contact");
        profilBtn.appendChild(Btncontact);

        header.prepend(profilCard);
        profilCard.appendChild(profilInfo);
        profilCard.appendChild(profilBtn);

        const profilName = document.createElement( 'span' );
        profilName.classList = "profil-name";
        profilName.textContent = name;
        profilInfo.appendChild(profilName);

        const profilLocation = document.createElement( 'span' );
        profilLocation.classList = "profil-location";
        profilLocation.textContent = city + ', ' + country;
        profilInfo.appendChild(profilLocation);
        
        const profilsentence = document.createElement( 'span' );
        profilsentence.classList= "profil-sentence";
        profilsentence.textContent = tagline;
        profilInfo.appendChild(profilsentence);


        const profilImg = document.createElement( 'img' );
        profilImg.setAttribute("src", picture);
        profilImg.setAttribute("alt", name);
        profilCard.appendChild(profilImg);

    }
    return { id, getPhotographerProfilDOM };
    
}

export { profilFactory };