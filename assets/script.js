/**
 * Tous mes selectors html
 */
const categories = document.querySelector("#categories");
const form = document.querySelector("form");
const todo = document.querySelector("#todo");
const category = document.querySelector("#category");
const displayAllTodos = document.querySelector(".allTodos");
// allTodos est un tableau qui contiendra tous les todos
const allTodos = [];

/**
 * La fonction `onload` est appelée lorsque la page est chargée
 * Elle me permet d'initialiser mon application
 */
onload = () => {
	// Je récupère mes todos dans le localStorage
	const todos = JSON.parse(localStorage.getItem("todos"));
	if (!todos) return;
	todos.forEach((todo) => {
		displayOnLoad(todo);
	});
};

/** Cette fonction, me permet d'afficher et d'interagire avec mes anciens todos */
function displayOnLoad(todo) {
	// Je créer un li
	const newTodo = document.createElement("li");
	newTodo.classList.add("wip");
	newTodo.classList.add(todo.category);
	const span = document.createElement("span");
	span.textContent = todo.text;
	newTodo.appendChild(span);
	newTodo.dataset.category = todo.category;

	// Si le todo est checké, j'ajoute la classe checked
	if (todo.checked) {
		newTodo.classList.add("checked");
	}

	const containerButtons = document.createElement("span");

	/** Button check */
	const isCheck = document.createElement("button");
	isCheck.textContent = todo.checked ? "❌" : "✅";
	isCheck.classList.add("check");
	containerButtons.appendChild(isCheck);

	/** J'écoute ce button, pour savoir si je met un ✅ ou ❌ */
	isCheck.addEventListener("click", () => {
		newTodo.classList.toggle("checked");
		newTodo.classList.contains("checked")
			? (isCheck.textContent = "❌")
			: (isCheck.textContent = "✅");
		// Puis je sauvegarde mes todos
		saveTodos();
	});

	/** Button supprimer */
	const del = document.createElement("button");
	del.textContent = "🗑️";
	del.classList.add("delete");
	containerButtons.appendChild(del);

	// Si le button est cliqué, je supprime le li
	del.addEventListener("click", () => {
		newTodo.remove();
		allTodos.splice(allTodos.indexOf(newTodo), 1);

		// Puis je sauvegarde mes todos
		saveTodos();
	});

	newTodo.appendChild(containerButtons);

	displayAllTodos.appendChild(newTodo);
	allTodos.push(newTodo);
}

function createTodo(todo, category) {
	const newTodo = document.createElement("li");
	newTodo.classList.add("wip");
	newTodo.classList.add(category.value);

	// si le champ est vide, je ne fais rien
	if (todo.value === "") return;

	const containerButtons = document.createElement("span");

	// Je créer une span, pour accèder plus facilement au contenu du texte
	const span = document.createElement("span");
	span.textContent = todo.value;
	newTodo.appendChild(span);
	newTodo.dataset.category = category.value;

	/** Button check */
	const isCheck = document.createElement("button");
	isCheck.textContent = todo.checked ? "❌" : "✅";
	isCheck.classList.add("check");
	containerButtons.appendChild(isCheck);

	/** J'écoute ce button, pour savoir si je met un ✅ ou ❌ */
	isCheck.addEventListener("click", () => {
		newTodo.classList.toggle("checked");
		newTodo.classList.contains("checked")
			? (isCheck.textContent = "❌")
			: (isCheck.textContent = "✅");
		// Puis je sauvegarde mes todos
		saveTodos();
	});

	const del = document.createElement("button");
	del.textContent = "🗑️";
	del.classList.add("delete");
	containerButtons.appendChild(del);

	// if del is clicked
	del.addEventListener("click", () => {
		// remove the li from the ul
		newTodo.remove();
		allTodos.splice(allTodos.indexOf(newTodo), 1);
		console.log(allTodos);
		saveTodos();
	});

	newTodo.appendChild(containerButtons);

	displayAllTodos.appendChild(newTodo);
	todo.value = "";

	allTodos.push(newTodo);
}

form.addEventListener("submit", (event) => {
	event.preventDefault();
	createTodo(todo, category);
	saveTodos();
});

const saveTodos = () => {
	const todos = allTodos.map((todo) => ({
		text: todo.childNodes[0].textContent,
		checked: todo.classList.contains("checked"),
		category: todo.dataset.category,
	}));
	localStorage.setItem("todos", JSON.stringify(todos));
};

categories.addEventListener("change", (event) => {
	if (event.target.value === "all") {
		displayAllTodos.innerHTML = "";
		allTodos.forEach((todo) => displayAllTodos.appendChild(todo));
	} else {
		const filteredTodos = allTodos.filter(
			(todo) => todo.dataset.category === event.target.value
		);
		displayAllTodos.innerHTML = "";
		filteredTodos.forEach((todo) => displayAllTodos.appendChild(todo));
	}
});
