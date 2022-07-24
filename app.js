//Define UI vars
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearbtn = document.querySelector('.clear-task')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

//Load All event listeners
loadAllEventListeners ()

//loadAllEventListeners 
function loadAllEventListeners () {
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasks)
  //Add task event 
  form.addEventListener('submit', addTask)
  //Remove task event
  taskList.addEventListener('click', removeTask)
  //Clear task event
  clearbtn.addEventListener('click', clearTasks)
  //Filter tasks 
  filter.addEventListener('keyup', filterTasks)
}

//Get tasks from LS
function getTasks () {
  let tasks
  if(localStorage.getItem('tasks') === null){
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function (task) {
    //Create li element
    const li = document.createElement('li')
    //add class 
    li.className = 'collection-item'
    //Create text node and append to the li
    li.appendChild(document.createTextNode(task))
    //create new link el
    const link = document.createElement('a')
    //Add class
    link.className = 'delete-item secondary-content'
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>'
    //append the link to li 
    li.appendChild(link)
    //append the li to ul
    taskList.appendChild(li)
  })
}


//Add task
function addTask (e) {
  if (taskInput.value === '') {
    alert ('Add a task')
  }

  //Create li element
  const li = document.createElement('li')
  //add class 
  li.className = 'collection-item'
  //Create text node and append to the li
  li.appendChild(document.createTextNode(taskInput.value))
  //create new link el
  const link = document.createElement('a')
  //Add class
  link.className = 'delete-item secondary-content'
  //Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>'
  //append the link to li 
  li.appendChild(link)
  //append the li to ul
  taskList.appendChild(li)

  //Store in local storage
  storeTaskInLocalStorage(taskInput.value)

  //clear the input
  taskInput.value = ''


  e.preventDefault()
}

//Store task
function storeTaskInLocalStorage (task) {
  let tasks
  if(localStorage.getItem('tasks') === null){
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.push(task)

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

//Removefrom LS
function removeTaskFromLocalStorage (taskItem) {
  let tasks
  if(localStorage.getItem('tasks') === null){
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1)
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

//Remove Task
function removeTask (e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure')) {
      e.target.parentElement.parentElement.remove()

      //Remove task from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement)
    }
  }
}

//Clear tasks from LS
function clearTasksFromLocalStorage ( ) {
  localStorage.clear()
}
//ClearTasks
function clearTasks (e) {
  // taskList.innerHTML = ''

  //Faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }

  // https://jsperf.com/innerhtml-vs-removechild

  //Clear from LS
  clearTasksFromLocalStorage()
}

//Filter Tasks
function filterTasks (e) {
  const text = e.target.value.toLowerCase()

  document.querySelectorAll('.collection-item').forEach(
    function (task) {
      const item = task.firstChild.textContent
      if (item.toLowerCase().indexOf(text) != -1) {
        task.style.display = 'block'
      }else {
        task.style.display = 'none'
      }
    }
  )
}