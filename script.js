// function to add task
var add_task = function() {
	// select parent div
	let tasks_div = document.querySelector("body #parent .tasks")
	let tasks_amount = document.querySelector("#tasks_amount")

	//create elements for add tasks
	let div = document.createElement("div")
	let text_p = document.createElement("p")
	let icone_p = document.createElement("p")
	let button = document.createElement("button")
	let i = document.createElement("i")

	// get values from field and index
	let amount_text = tasks_amount.textContent
	let index = Number(amount_text)+1

	let value = document.querySelector("#input").value

	// set attributes (class and id to created div)
	div.setAttribute("class", "under_tasks")
	text_p.setAttribute("class", "text")
	button.setAttribute("class", "icones")
	i.setAttribute("class", "fa-solid fa-trash")
	
	let text = document.createTextNode(value)
	// let amount = document.createTextNode(index)

	// append all to html page
	tasks_amount.innerHTML = tasks_amount.innerHTML.replace(amount_text, index)
	text_p.appendChild(text)
	icone_p.appendChild(i)
	button.appendChild(icone_p)
	div.appendChild(text_p)
	div.appendChild(button)
	tasks_div.appendChild(div)

}

// function to remove all tasks

var remove_tasks = function (){
	let tasks_div = document.querySelector("body #parent .tasks")
	let last = tasks_div.lastElementChild

	while (last)
	{
		tasks_div.removeChild(last)
		last = tasks_div.lastElementChild
	}

	let tasks_amount = document.querySelector("#tasks_amount")
	let amount_text = tasks_amount.textContent
	tasks_amount.innerHTML = tasks_amount.innerHTML.replace(amount_text, 0)

}

var remove_task = function (){
	let icones  = document.querySelectorAll("#icon_button")
	// console.log(tasks_div)
	// console.log(icone)
	for (let i = 0; i < icones.length; i++)
	{
		this.parentElement.remove()
	}
	


	 
}

// select button add ans remove_all
let add_button = document.querySelector("#add_button")
let remove_All_button = document.querySelector("#remove_all")
let delete_button = document.querySelector("#icon_button")

// events listener
add_button.addEventListener("click", add_task)
delete_button.addEventListener("click", remove_task)
remove_All_button.addEventListener("click", remove_tasks)
