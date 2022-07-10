let tasks_div = document.querySelector(".tasks")
let total_tasks = document.querySelector("#total")
let running_tasks = document.querySelector("#running")
let ended_tasks = document.querySelector("#ended")
let task_input = document.querySelector("#input")
let add_button = document.querySelector("#add_button")
let remove_All_button = document.querySelector("#remove_all")
let todo_list = null
add_button.disabled = true

function updateAmount(element, operator){
	element.textContent = eval(element.textContent + operator + "1")
}

function postData(){
	fetch("/", {
		method: 'POST',
		headers: {'content-type': 'application/json'},
		body: JSON.stringify({
			type: 'update',
			data: todo_list
		})
	}).then(res=> res.json())
	.then(data=>console.log(data))
}

function add_task() {
	tasks_div.innerHTML += newTask(task_input.value, "active")
	updateAmount(total_tasks, "+")
	updateAmount(running_tasks, "+")
	saveTask(task_input.value)
	task_input.value = ""
	task_input.focus()
	add_button.disabled = true
	running_tasks.textContent 
	postData()
}

function remove_tasks(e) {
	e.preventDefault()
	tasks_div.textContent = ""
	total_tasks.textContent = 0
	running_tasks.textContent = 0
	ended_tasks.textContent = 0
	todo_list = JSON.parse(localStorage.getItem("todo_list"))
	todo_list.tasks = []
	todo_list.state = []
	localStorage.setItem("todo_list", JSON.stringify(todo_list))
	postData()
}

function remove_task(e) {
	let par = null
	let to_unsave = null
	if (e.target.className === "icones"){
		to_unsave = e.target.previousElementSibling.textContent
		par = e.target.parentElement
	}else{
		to_unsave = e.target.parentElement.previousElementSibling.textContent
		par  = e.target.parentElement.parentElement
	}
	unsaveTask(to_unsave)
	tasks_div.removeChild(par)
	updateAmount(total_tasks, "-")
	updateAmount(running_tasks, "-")
	postData()
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
		updateAmount(ended_tasks, "+")
		updateAmount(running_tasks, "-")
	}else{
		changeState(next.textContent, "active")
		updateAmount(ended_tasks, "-")
		updateAmount(running_tasks, "+")
	}
	postData()
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
	todo_list.state[index] = value
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
		total_tasks.textContent = todo_list.tasks.length
	}
}

// events listener
add_button.addEventListener("click", add_task)
remove_All_button.addEventListener("click", remove_tasks)
task_input.addEventListener("input", handle)

window.addEventListener("DOMContentLoaded", async ()=>{
	todo_list = JSON.parse(localStorage.getItem("todo_list"))
	if (todo_list && todo_list.tasks.length){
		postData()
	}else{
		res = await fetch("/data")
		res = await res.json()
		localStorage.setItem("todo_list", res)
	}
	restoreTask()
})