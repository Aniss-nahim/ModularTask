// UI vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#new-task');
const addTaskBtn = document.querySelector('.add-task');
const filterTask = document.querySelector('#filter-task');
const taskList = document.querySelector('ul.collection');
const clearTasksBtn = document.querySelector('.clear-tasks');
const taskListMsg = document.querySelector('#task-list-msg');
const emptyList = 'Empty task list';

// Init Ui with existing tasks in localStorage
window.onload = loadStorage;
// localStorage.clear();
// To load all event listeners
function loadStorage(){
    let tasks;
    if(localStorage.getItem('tasks') === null || JSON.parse(localStorage.getItem('tasks')).length === 0){
        displayMsg(emptyList);
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach( function (task){
            taskList.appendChild(createTask(task));
        });
    }
}
loadEventListeners();

function loadEventListeners(){
    //Add task
    form.addEventListener('submit',addTask);
    //Remove task
    taskList.addEventListener('click',removeTask);
    //Clear tasks
    clearTasksBtn.addEventListener('click',clearTasks);
    //Ui inputs
    taskInput.addEventListener('keydown',validateIput); // styling error case
    //Filter task
    filterTask.addEventListener('keyup',filter);
}

// validateInputUi
function validateIput(){
    if(taskInput.classList.contains('invalid')){
        taskInput.classList.remove('invalid');
        taskInput.previousElementSibling.classList.remove('invalide');
        taskInput.nextElementSibling.classList.remove('invalide');
    }
}

// display Ui msg
function displayMsg(textMsg){
    const p = document.createElement('p');
    p.className = "center-align flow-text";
    p.appendChild(document.createTextNode(textMsg));
    taskListMsg.appendChild(p);
}


//Add task
function addTask(e){ 
    e.preventDefault(); // prevent the default behavior
    const taskContent = String(taskInput.value).trim()
    if(taskContent !== ''){
        //remove msg
        if(!taskList.firstElementChild)
            taskListMsg.firstElementChild.remove();
        taskList.appendChild(createTask(taskContent));
        //LocaleStorage
        storeTaskInLocalStorage(taskContent);
        //Clear input
        taskInput.value = '';  
    }else{
        taskInput.classList.add('invalid');
        taskInput.previousElementSibling.classList.add('invalide');
        taskInput.nextElementSibling.classList.add('invalide');
    }
}

// create task
function createTask(taskContent){
    const li = document.createElement('li'); // create li element
    const link = document.createElement('a'); // create link element

    link.classList.add('secondary-content');
    link.setAttribute('href','');
    link.innerHTML = '<i class="material-icons icon-delete">cancel</i>';
    li.classList.add('collection-item');
    li.appendChild(document.createTextNode(taskContent));
    li.appendChild(link);
    return li;
}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    // add new task to existing tasks
    tasks.push(task);
    // Reset localStorage
    localStorage.setItem('tasks',JSON.stringify(tasks));

}

//Remove task
function removeTask(e){
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    e.preventDefault();
    if(e.target.classList.contains('icon-delete')){
        // (li) > text | a > i > Text
        e.target.parentElement.parentElement.remove();
        // li > (Text) | a > i > Text 
       // tasks one remove task starting from the matched element.
        tasks.splice(tasks.indexOf(e.target.parentElement.previousSibling.textContent), 1);
        if(tasks.length === 0 )
            displayMsg(emptyList);
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }
}

// clear Tasks
function clearTasks(){
    if(taskList.firstElementChild){
        // much faster
        while(taskList.firstElementChild){ 
            taskList.firstElementChild.remove(); 
        }
        //display message empty list
        displayMsg(emptyList);
        // remove all tasks from localStorage
        localStorage.removeItem('tasks');
    }
}

// filter
function filter(e){
    const text =e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const taskContent = task.firstChild.textContent.toLowerCase();
        if(taskContent.indexOf(text) != -1){
            task.style.display = 'block';
            findAny = true;
        }else{
            task.style.display = 'none';
        }
    });
}
