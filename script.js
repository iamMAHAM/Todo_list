// function to add task
var add_task = function(){
	// select parent div
	let tasks_div = document.querySelector(".tasks")
	let tasks_amount = document.querySelector("#tasks_amount")
	let input  = document.querySelector("#input")

	// get values from field and index
	let amount_text = tasks_amount.textContent
	let index = Number(amount_text)+1

	let value = input.value

	let tasks = 
	`
		<div class="under_tasks">
			<input type="checkbox" class="checkbox"/>
			<p class="text">
				${value}
			</p>
			<button id="icon_button" class="icones" onclick="remove_task(event)">
					<i class="fa-solid fa-trash"></i>
			</button>
		</div>
	`

	// append all to html page
	tasks_div.innerHTML += tasks

	//set input to none
	input.value = " "
	tasks_amount.innerHTML = tasks_amount.innerHTML.replace(amount_text, index)

	

}

// function to remove all tasks

var remove_tasks = function (){
	let tasks_div = document.querySelector(".tasks")
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

function remove_task(e){
	let tasks_div = document.querySelector(".tasks")
	let task_amount = document.querySelector("#tasks_amount")
	let amount_text = task_amount.textContent
	let index = Number(amount_text)-1


	console.log(e.target)
	tasks_div.removeChild(e.target.parentElement.parentElement)
	tasks_amount.innerHTML = tasks_amount.innerHTML.replace(amount_text, index)
}

// select button add ans remove_all
let add_button = document.querySelector("#add_button")
let remove_All_button = document.querySelector("#remove_all")

// events listener
add_button.addEventListener("click", add_task)
remove_All_button.addEventListener("click", remove_tasks)
