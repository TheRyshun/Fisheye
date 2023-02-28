function photographerFactory(data) {
	const { id, name, portrait, city, country, tagline, price } = data;

	const picture = `assets/photographers/${portrait}`;
	const url = "photographer.html?id=" + id;

	function getUserCardDOM() {
		const redirect = document.createElement("a");
		redirect.setAttribute("href", url);

		const article = document.createElement("article");
		const img = document.createElement("img");
		const container_img = document.createElement("div");

		container_img.classList.add("container_img");
		img.setAttribute("src", picture);

		const h2 = document.createElement("h2");
		h2.textContent = name;

		const location = document.createElement("span");
		location.classList.add("location");
		location.textContent = city + ", " + country;

		const sentence = document.createElement("span");
		sentence.classList.add("tagline");
		sentence.textContent = tagline;

		const dayPrice = document.createElement("span");
		dayPrice.classList.add("dayprice");
		dayPrice.textContent = price + "€/jour";

		redirect.appendChild(article);
		article.appendChild(container_img);
		container_img.appendChild(img);
		article.appendChild(h2);
		article.appendChild(location);
		article.appendChild(sentence);
		article.appendChild(dayPrice);

		const ariaLabelValue =
      "Photographe: " +
      name +
      "; Lieu: " +
      city +
      ", " +
      country +
      "; Slogan: " +
      tagline +
      "; Prix: " +
      price + "€ par jour";
	
		article.setAttribute("aria-label", ariaLabelValue);

		return redirect;
	}
	return { name, picture, getUserCardDOM };
}

export { photographerFactory };
