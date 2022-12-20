import { getAPI } from "../api.js";
import { photographerFactory } from "../factories/photographerFactory.js";


async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    const { photographers } = await getAPI();
    displayData(photographers);
    console.log(photographers);

};

init();
