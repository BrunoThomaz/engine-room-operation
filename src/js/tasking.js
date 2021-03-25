const btnReload = document.querySelector("#reload")
btnReload.addEventListener('click', loadTasks)

function loadTasks() {
    const taskList = document.querySelector(".taskList")
    const tasks = localStorage.getItem('tasks') || ''
    taskList.innerHTML = ''
    if (tasks) {
        let items = tasks.split(';')
        for (item of items) {
                if(item){
                const li = document.createElement('li')    

                const task = document.createElement('div')
                task.textContent = item
                li.appendChild(task)
                
                const removeBtn = document.createElement('span')
                removeBtn.classList.add('remove')
                removeBtn.textContent = '-'
                removeBtn.addEventListener('click', confirmRemove)
                li.appendChild(removeBtn)

                taskList.appendChild(li)
            }
        }
    } else {
        const empty = document.createElement('li')
        empty.textContent = "Task list is empty!"
        taskList.appendChild(empty)
    }
}


function confirmRemove() {
    const element = this
    const preEl = element.previousElementSibling
    let previousState = ''
    previousState = preEl.textContent
    element.style.backgroundColor = "rgb(196, 82, 29)"
    element.textContent = "remove"
    element.removeEventListener('click', confirmRemove)
    element.addEventListener('click', removeTask)

    const previous = ()=>{
        let parent = element.parentElement
        parent.innerHTML = ''
        const task = document.createElement('div')
        task.textContent = previousState
        parent.appendChild(task)
        
        const removeBtn = document.createElement('span')
        removeBtn.classList.add('remove')
        removeBtn.textContent = '-'
        removeBtn.addEventListener('click', confirmRemove)
        parent.appendChild(removeBtn)

        // taskList.appendChild(li)
    }
    setTimeout(previous, 2000)
}




function removeTask(event) {
        const task = event.target.previousElementSibling.textContent
        let tasks = localStorage.getItem('tasks')
        tasks = tasks.replace(`${task};`, '')
        localStorage.setItem('tasks', tasks)
        loadTasks()
}

const addBtn = document.querySelector("span.add")
function addTasks() {
    const task =  `${prompt('Schedule task on format:\n[Date:dd/mm/aa][Name of responsible] Task text.')};`
    console.log(task)
    if(task === ';' || task === 'null;') {
        return;
    }
    if (localStorage.getItem('tasks')) {
        localStorage.setItem('tasks',`${localStorage.getItem('tasks')}${task}`)  
    } else {
        localStorage.setItem('tasks', task)
    }
    alert('task scheduled!')
    loadTasks()
}


addBtn.addEventListener('click', addTasks)
loadTasks()
