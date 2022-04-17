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

	div.style.marginLeft = "0px"
	div.style.justifyContent = "space-around"
	div.style.display = "flex"
	text_p.style.fontSize = "20px"
	text_p.style.margin = "5px"
	text_p.style.width = "85%"
	text_p.style.color = "red"
	text_p.style.backgroundColor = "white"

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
