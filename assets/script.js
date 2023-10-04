/**
 * Tous mes selectors
 */
const categories = document.querySelector("#categories");
const form = document.querySelector("form");
const todo = document.querySelector("#todo");
const category = document.querySelector("#category");
const displayAllTodos = document.querySelector(".allTodos");

let allTodos = [];
form.addEventListener("submit", (event) => {
	event.preventDefault();
	const newTodo = document.createElement("li");
	if (todo.value === "") return;
	newTodo.textContent = todo.value;
	newTodo.dataset.category = category.value;

	displayAllTodos.appendChild(newTodo);
	todo.value = "";

	getAllTodos(document.querySelectorAll(".allTodos li"));
});

function getAllTodos(todos) {
	allTodos = [...todos];
}

categories.addEventListener("change", (event) => {
	if (event.target.value === "all") {
		displayAllTodos.innerHTML = "";
		allTodos.forEach((todo) => displayAllTodos.appendChild(todo));
	} else {
		const filteredTodos = allTodos.filter(
			(todo) => todo.dataset.category === event.target.value
		);
		console.log(filteredTodos);
		displayAllTodos.innerHTML = "";
		filteredTodos.forEach((todo) => displayAllTodos.appendChild(todo));
	}
});
