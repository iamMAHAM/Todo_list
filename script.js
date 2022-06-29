let tasks_div = document.querySelector(".tasks")
let tasks_amount = document.querySelector("#tasks_amount")
let task_input = document.querySelector("#input")
let add_button = document.querySelector("#add_button")
let remove_All_button = document.querySelector("#remove_all")
add_button.disabled = true

function add_task() {
	tasks_div.innerHTML += newTask(task_input.value)
	tasks_amount.textContent = Number(tasks_amount.textContent) + 1
}

function remove_tasks() {
	tasks_div.textContent = ""
	tasks_amount.textContent = 0
}

function remove_task(e) {

	let par = e.target.parentElement.parentElement
	console.log(par, par.parentElement)
	tasks_div.removeChild(par)
	tasks_amount.textContent = Number(tasks_amount.textContent) - 1
}

function newTask(task_text) {
	return (
		`
	<div class="under_tasks">
		<input onclick="ended_task(event)" type="checkbox" class="checkbox"/>
		<p class="text">
			${task_text}
		</p>
		<button id="icon_button" class="icones" onclick="remove_task(event)">
				<i class="fa-solid fa-trash"></i>
		</button>
	</div>
	`
	)
}

function handle() {
	if (task_input.value) {
		add_button.disabled = false
	} else {
		add_button.disabled = true
	}
}

function ended_task(e){
	let parent = e.target.parentElement
	let next = e.target.nextElementSibling
	let i = next.nextElementSibling

	parent.style.backgroundColor = "grey"
	next.style.textDecoration = "line-through"
	i.style.visibility = "hidden"

	if (!e.target.checked)
	{
		parent.style.backgroundColor = "white"
		next.style.textDecoration = "none"
		i.style.visibility = "visible"
	}
}

// events listener
add_button.addEventListener("click", add_task)
remove_All_button.addEventListener("click", remove_tasks)
task_input.addEventListener("input", handle)