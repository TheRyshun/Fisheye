/*
  Function : getAPI

  - La fonction commence par effectuer une requête fetch vers le fichier JSON, 
    qui est stockée dans la variable res. Ensuite, un bloc conditionnel vérifie si la requête a réussi (res.ok vaut true), 
	et affiche un message de statut et de connexion en console si c'est le cas. Si la requête a échoué, un message d'erreur est affiché en console.

  - Enfin, la fonction renvoie la réponse res au format JSON.

*/
const getAPI = async() => {
	const res = await fetch("../data/photographers.json");
	if (res.ok) {
		console.log(
			"Statut de L'API : " + res.ok + "\nConnexion : " + res.statusText
		);
	} else {
		console.error(res);
	}
	return res.json();
};


/*
  Function : getPhotographers

  -   Méthode fetch pour récupérer les informations des photographers du json,
      return la listes des photographers.

*/

const getPhotographers = async () => {
	const { photographers } = await fetch("../data/photographers.json").then(
		(res) => res.json()
	);
	return { photographers };
};
export { getAPI, getPhotographers };
