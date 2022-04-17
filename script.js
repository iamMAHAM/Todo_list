var add_tasks = function() {
	let tasks_div = document.querySelector("body #parent .tasks")
	let div = document.createElement("div")
	let text_p = document.createElement("p")
	let icone_p = document.createElement("p")
	let button = document.createElement("button")
	let i = document.createElement("i")

	let value = document.querySelector("#input").value

	div.setAttribute("class", "under_tasks")
	text_p.setAttribute("class", "text")
	button.setAttribute("class", "icones")
	i.setAttribute("class", "fa-solid fa-trash")
	
	let text = document.createTextNode(value)

	text_p.appendChild(text)
	icone_p.appendChild(i)
	button.appendChild(icone_p)
	div.appendChild(text_p)
	div.appendChild(button)
	tasks_div.appendChild(div)

}

let add_button = document.querySelector("#add_button")
console.log(add_button)
add_button.addEventListener("click", add_tasks)
