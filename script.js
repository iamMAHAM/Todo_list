let tasks_div = document.querySelector(".tasks")
let tasks_amount = document.querySelector("#tasks_amount")
let task_input = document.querySelector("#input")
let add_button = document.querySelector("#add_button")
let remove_All_button = document.querySelector("#remove_all")
let todo_list = null
add_button.disabled = true

function add_task() {
	tasks_div.innerHTML += newTask(task_input.value, "active")
	tasks_amount.textContent = Number(tasks_amount.textContent) + 1
	saveTask(task_input.value)
	task_input.value = ""
	task_input.focus()
	add_button.disabled = true
}

function remove_tasks() {
	tasks_div.textContent = ""
	tasks_amount.textContent = 0
	todo_list = JSON.parse(localStorage.getItem("todo_list"))
	todo_list.tasks = []
	todo_list.state = []
	localStorage.setItem("todo_list", JSON.stringify(todo_list))
}

function remove_task(e) {

	let par = e.target.parentElement.parentElement
	let to_unsave = e.target.parentElement.previousElementSibling.textContent
	unsaveTask(to_unsave)
	tasks_div.removeChild(par)
	tasks_amount.textContent = Number(tasks_amount.textContent) - 1
}

function newTask(task_text, className, checked="") {
	return (
		`
	<div class="under_tasks ${className}">
		<input onclick="ended_task(event)" type="checkbox" class="checkbox" ${checked}/>
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
	let prev = parent.classList.contains("active") ? "active" : "inactive"
	let right = parent.classList.contains("active") ? "inactive" : "active"
	let next = e.target.nextElementSibling

	parent.classList.remove(prev)
	parent.classList.add(right)

	if (e.target.checked){
		changeState(next.textContent, "inactive")
	}else{
		changeState(next.textContent, "active")
	}
}

function saveTask(text){
	todo_list = localStorage.getItem("todo_list")
	if (todo_list){
		todo_list = JSON.parse(todo_list)
	}else{
		todo_list = {
			"tasks": [],
			"state": []
		}
	}
	todo_list.tasks.push(text.trim())
	todo_list.state.push("active")
	localStorage.setItem("todo_list", JSON.stringify(todo_list))
}

function unsaveTask(text){
	todo_list = JSON.parse(localStorage.getItem("todo_list"))
	let index = todo_list.tasks.indexOf(text.trim())
	todo_list.tasks.splice(index, 1)
	todo_list.state.splice(index, 1)
	localStorage.setItem("todo_list", JSON.stringify(todo_list))
}

function changeState(text, state){
	todo_list = JSON.parse(localStorage.getItem("todo_list"))
	let index = todo_list.tasks.indexOf(text.trim())
	let value = state === "active" ? "active" : "inactive"
	console.log("at index", index, "text", text.trim())
	todo_list.state[index] = value
	console.log(todo_list)
	localStorage.setItem("todo_list", JSON.stringify(todo_list))
}

function restoreTask(){
	let c = null
	todo_list = JSON.parse(localStorage.getItem("todo_list"))
	if (todo_list){
		for (let i = 0; i < todo_list.tasks.length; i++){
			c = todo_list.state[i] === "inactive" ? "checked" : ""
			tasks_div.innerHTML += newTask(todo_list.tasks[i], todo_list.state[i], c)
		}
	}
	tasks_amount.textContent = todo_list.tasks.length
}

// events listener
add_button.addEventListener("click", add_task)
remove_All_button.addEventListener("click", remove_tasks)
task_input.addEventListener("input", handle)

window.addEventListener("load", restoreTask)