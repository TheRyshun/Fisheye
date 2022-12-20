import { getAPI } from "../api.js";
import { photographerFactory } from "../factories/photographerFactory.js";


const displayData = async (photographers) => {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

// Récupère les datas des photographes
 const init = async() => {
    const { photographers } = await getAPI();
    displayData(photographers);
    console.log(photographers);
};

init();
