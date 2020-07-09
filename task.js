let navBar = {

    init : function(){
        this.cachDOM();
        pubSub.subscribe('tasksChanged', this.setTasks.bind(this));
    },

    cachDOM : function(){
        this.totalTasks = document.getElementById('totalTasks');
    },

    render : function(){
        this.totalTasks.innerHTML = `Total tasks : ${this.total}`;
    },

    setTasks : function(value){
        this.total = value || 0;
        this.render();
    }
}
navBar.init();



// task moudle using Object Literal pattern
let task = {
    init : function(){
        this.cachDOM();
        this.bindEvents();
        this.fetchStorage();
        pubSub.emit('tasksChanged', this.tasks.length);
        this.render();
    },

    cachDOM : function(){
        this.addTaskBtn = document.getElementById('addTaskBtn');
        this.addInput = document.getElementById('newTask');
        this.taskList = document.querySelector('ul#tasksCollection');
        this.clearTasksBtn = document.getElementById('clearTasks');
        this.filterTaskInput = document.querySelector('#filterTask');
    },

    bindEvents : function(){
        this.addTaskBtn.addEventListener('click', this.addTask.bind(this));
        this.taskList.addEventListener('click', this.deleteTask.bind(this));
        this.clearTasksBtn.addEventListener('click', this.clearTasks.bind(this));
        this.filterTaskInput.addEventListener('keyup', this.filter.bind(this));
    },

    render : function(tasks = this.tasks){
        this.taskList.innerHTML ='';
        let loop = function(task){
            this.taskList.innerHTML += `<li class="collection-item">
            <span>${task}</span>
            <a class="secondary-content">
                    <i class="material-icons icon-delete">cancel</i>
                </a>
            </li>`;
        }
        tasks.forEach(loop.bind(this));
        pubSub.emit('tasksChanged', this.tasks.length);
    },

    fetchStorage : function(){
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    },

    updateStorage : function(){
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },

    trimValue : function(value){
        return value.replace(/\s+/g,' ').replace(/^\s|\s$/g,'');
    },

    addTask : function(value){
        let newTask = typeof value === 'string' ? this.trimValue(value) : this.trimValue(this.addInput.value);
        if(newTask){
            this.tasks.push(newTask);
            this.addInput.value = '';
            this.updateStorage();
            this.render();
        }
    },

    deleteTask : function(e){
        let value = typeof e === 'string' ? e:null;
        if(!value){
            if(e.target.classList.contains('icon-delete')){
                this.tasks.splice(this.tasks.indexOf(e.target.parentElement.previousElementSibling.textContent),1);
                this.updateStorage();
                this.render();
            }
        }else{
            let index = this.tasks.indexOf(value);
            if(index != -1)
            this.tasks.splice(index,1);
            this.updateStorage();
            this.render();
        }
    },

    clearTasks : function(){
        this.tasks = [];
        this.updateStorage();
        this.render();
    },

    filter : function(value){
        let query = typeof value === 'string' ? this.trimValue(value) : this.trimValue(this.filterTaskInput.value);
        if(query){
            let results = [];
            this.tasks.forEach(function(task){
                if(task.toLowerCase().indexOf(query.toLowerCase()) != -1){
                    results.push(task);
                }
            })
            this.render(results);
        }else{
            this.render();
        }
    }
}
task.init();

