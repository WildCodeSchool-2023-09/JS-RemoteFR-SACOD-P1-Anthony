const about = document.querySelector(".about");
const popup = document.querySelector("#popup");

about.addEventListener("click", () => {
	popup.classList.toggle("hidden");
	popup.addEventListener("click", () => {
		popup.classList.add("hidden");
	});
});
