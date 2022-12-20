/*
  Function : getAPI

  -   Méthode fetch pour récupérer les informations non traitée de le photographers.json,
  pour vérifier avec une condition if pour voir si la requête est bien de status Ok qui envoi un message console.

  -   Si le JSON est inexistant ou autres une erreur console est envoyé

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
}


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
