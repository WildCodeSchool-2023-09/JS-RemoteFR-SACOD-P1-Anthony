const categories = document.querySelector("#categories");

categories.addEventListener("change", (event) => {
	if (event.target.value === "all") {
		console.log(event.target.value);
	} else {
		console.log(event.target.value);
	}
});
