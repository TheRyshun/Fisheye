async function getAPI() {
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

const getPhotographers = async () => {
  const { photographers } = await fetch("../data/photographers.json").then(
    (res) => res.json()
  );
  return { photographers };
};

export { getAPI, getPhotographers };
