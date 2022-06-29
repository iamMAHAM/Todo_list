let tasks_div = document.querySelector(".tasks")
let tasks_amount = document.querySelector("#tasks_amount")
let task_input = document.querySelector("#input")

let add_task = function() {
	// get values from field and index
	tasks_div.innerHTML += newTask(task_input.value)
	tasks_amount.textContent = Number(tasks_amount.textContent) + 1
}

// function to remove all tasks

let remove_tasks = function (){
	tasks_div.textContent = ""
	tasks_amount.textContent = 0
}

let remove_task = function (e){

	let par = e.target.parentElement.parentElement
	console.log(par, par.parentElement)
	tasks_div.removeChild(par)
	tasks_amount.textContent = Number(tasks_amount.textContent) - 1
}

let newTask = (task_text)=>{
	return (
	`
	<div class="under_tasks">
		<input type="checkbox" class="checkbox"/>
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

let handle = function (){
	if (task_input.value){
		add_button.disabled = false
	}else{
		add_button.disabled = true
	}
}

// select button add ans remove_all
let add_button = document.querySelector("#add_button")
let remove_All_button = document.querySelector("#remove_all")
let delete_button = document.querySelector("#icon_button")
add_button.disabled = true

// events listener
add_button.addEventListener("click", add_task)
remove_All_button.addEventListener("click", remove_tasks)
task_input.addEventListener("input", handle)