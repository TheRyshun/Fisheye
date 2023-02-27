import { getAPI } from "../api.js";
import { photographerFactory } from "../factories/photographerFactory.js";

/*
    Function : displayData 
	
	* @param  : photographers 
	* @import : 
	* @return : 

    - Elle crée une section HTML pour les photographes à partir de la classe CSS .photographer_section.

    - Ensuite, pour chaque photographe de la liste, elle crée un objet photographerModel en utilisant la fonction photographerFactory 
	  qui retourne un modèle d'objet représentant le photographe.

	- Elle crée ensuite un élément HTML de type "card" pour le photographe en appelant la méthode getUserCardDOM 
	  du modèle d'objet créé précédemment.

	*/
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
};

init();
