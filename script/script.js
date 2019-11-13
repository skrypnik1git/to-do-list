const submitBtn = document.getElementsByName('submit_btn')[0]
const mainTextArea = document.getElementsByName('task')[0]
const taskContainer = document.querySelector('.tasks')
const header = document.querySelector('.header')

const undoneTasks =  document.createElement('div')
taskContainer.prepend(undoneTasks)

mainTextArea.addEventListener('keypress', keyEnter)
mainTextArea.addEventListener('keydown', keyEsc)
mainTextArea.addEventListener('input', changeHeight)

window.onload = () => {
    const dateDiv = document.createElement('div')
    const tasksInfo = document.createElement('div')

    const date = document.createElement('div')
    date.classList.add('mrn-15-30')
    date.classList.add('date')
    date.textContent = `${getDay()}, ${getDate()}`

    const month = document.createElement('div')
    month.classList.add('mrn-15-30')
    month.classList.add('date')
    month.textContent = `${getMonth()}`

    const count = document.createElement('div')
    count.classList.add('mrn-15-30')
    count.classList.add('counter')
    count.textContent = `${counterOftasks()}`

    const clearAllBtn = document.createElement('input')
    clearAllBtn.setAttribute('name', 'clear_all')
    clearAllBtn.setAttribute('type', 'button')
    clearAllBtn.setAttribute('value', 'Clear All')
    clearAllBtn.setAttribute('class', 'btn')
    clearAllBtn.classList.add('blue-red')
    clearAllBtn.classList.add('mrn-15-30')

    tasksInfo.prepend(clearAllBtn)
    tasksInfo.prepend(count)
    dateDiv.prepend(month)
    dateDiv.prepend(date)
    header.prepend(tasksInfo)
    header.prepend(dateDiv)

    submitBtn.addEventListener('click', () => {
        count.textContent = `${counterOftasks()}`
    })

    clearAllBtn.classList.add('mrn-15-30')
    clearAllBtn.addEventListener('click', clearAllTasks)
    clearAllBtn.addEventListener('click', () => {
        count.textContent = `${counterOftasks()}`
    })
}

submitBtn.addEventListener('click', addTask)

function clearAllTasks () {
    Array.from(taskContainer.children).forEach(item => {
        Array.from(item.children).forEach(task => {
            task.remove()
        })
    })
    let doneTasks = document.getElementsByName('done-tasks')[0]
    if (!doneTasks) {
        return
    } else if (!Array.from(doneTasks.children).length) {
        doneTasks.remove()
    }
    let count = document.querySelector('.counter')
    count.textContent = `${counterOftasks()}`
}

function addTask() {
    const fullDataOfTask = document.createElement('div')
    fullDataOfTask.className = "task"
    
    const taskText = document.createElement('p')
    taskText.className = "task-text"
    if (mainTextArea.value.trim()) {
        taskText.textContent = mainTextArea.value
    } else { 
        return 
    }
    
    const taskCheckBox = document.createElement('input')
    taskCheckBox.type = 'checkbox'
    taskCheckBox.className = "input"
    taskCheckBox.onchange = (event) => {
        for (let p of event.target.parentNode.querySelectorAll('p')) {
            if (event.target.checked) {
                taskCheckBox.classList.add('input-checked')
                p.classList.add('checked-p')
                
                let task = event.target.parentNode
                let doneTasks = document.getElementsByName('done-tasks')[0]
                if (doneTasks) {
                    task.remove()
                    doneTasks.prepend(task)
                } else {
                    doneTasks = document.createElement('div')
                    doneTasks.setAttribute('name', 'done-tasks')
                    doneTasks.className = 'done-tasks'
                    let containerOfAllTasks = document.querySelector('.tasks')
                    containerOfAllTasks.append(doneTasks)
                    task.remove()
                    doneTasks.prepend(task)
                }
                let count = document.querySelector('.counter')
                count.textContent = `${counterOftasks()}`
            } else {
                p.classList.remove('checked-p')
                taskCheckBox.classList.remove('input-checked')
                let task = event.target.parentNode
                task.remove()
                undoneTasks.prepend(task)
                let taskTime = document.getElementsByName('time-of-task')[0]
                taskTime.textContent = `${getHours()}:${getMinutes()}`
                let doneTasks = document.getElementsByName('done-tasks')[0]
                let count = document.querySelector('.counter')
                count.textContent = `${counterOftasks()}`
                if (!doneTasks) {
                    return
                } else if (!Array.from(doneTasks.children).length) {
                    doneTasks.remove()
                }
            }  
        }
    }
    
    const taskTime = document.createElement('p')
    taskTime.setAttribute('name', 'time-of-task')
    taskTime.textContent = `${getHours()}:${getMinutes()}`

    
    const iconToClose = document.createElement('img')
    iconToClose.setAttribute('src', 'images/close1.png')
    iconToClose.className = 'closing-icon'
    iconToClose.onclick = (e) => {
        let task = e.target.parentNode
        
        let coverDiv = document.createElement('div');
        coverDiv.className = 'cover-div'

        let confirmation = document.createElement('div');
        confirmation.className = 'confirmation'

        let buttons = document.createElement('div');
        buttons.className = 'cover-btns'

        let textOfConfirm = document.createElement('p');
        textOfConfirm.textContent = 'Delete this Task?'
        textOfConfirm.className = 'text-for-cover'

        let confirmBtn = document.createElement('input');
        confirmBtn.setAttribute('type', 'button')
        confirmBtn.setAttribute('value', 'Ok')
        confirmBtn.classList.add('btn')
        confirmBtn.classList.add('blue-btn')
        confirmBtn.onclick = () => {
                task.remove()
                let count = document.querySelector('.counter')
                count.textContent = `${counterOftasks()}`
                let doneTasks = document.getElementsByName('done-tasks')[0]
                if (!doneTasks) {
                    return
                } else if (!Array.from(doneTasks.children).length) {
                    doneTasks.remove()
                }
            }
        
        let cancelBtn = document.createElement('input');
        cancelBtn.setAttribute('type', 'button')
        cancelBtn.setAttribute('value', 'Cancel')
        cancelBtn.classList.add('btn')
        cancelBtn.classList.add('blue-red')
        cancelBtn.onclick = () => {
            confirmation.remove()
            coverDiv.remove()
        }


        buttons.prepend(cancelBtn)
        buttons.prepend(confirmBtn)
        confirmation.prepend(buttons)
        confirmation.prepend(textOfConfirm)
        fullDataOfTask.append(coverDiv)
        fullDataOfTask.append(confirmation)
    }


    fullDataOfTask.append(taskCheckBox)
    fullDataOfTask.append(taskText)
    fullDataOfTask.append(taskTime)
    fullDataOfTask.append(iconToClose)
    mainTextArea.value = ""
    mainTextArea.placeholder = "Put your task here"
    undoneTasks.prepend(fullDataOfTask)
}

function getMinutes() {
    const currMinutes = new Date().getMinutes()
    return currMinutes < 10 ? String(currMinutes).padStart(2, '0') : currMinutes
}

function getHours() {
    const currHours = new Date().getHours()
    return currHours < 10 ? String(currHours).padStart(2, '0') : currHours
}

function getDay() {
   switch (new Date().getDay()) {
       case 0: return "Sunday"
       case 1: return "Monday"
       case 2: return "Tuesday"
       case 3: return "Wednesday"
       case 4: return "Thursday"
       case 5: return "Friday"
       case 6: return "Saturday"
   } 
}

function getMonth() {
    switch (new Date().getMonth()) {
        case 0: return "January"
        case 1: return "February"
        case 2: return "March"
        case 3: return "April"
        case 4: return "May"
        case 5: return "June"
        case 6: return "July"
        case 7: return "August"
        case 8: return "September"
        case 9: return "October"
        case 10: return "November"
        case 11: return "December"
    } 
 }

function getDate() {
    switch (new Date().getDate()) {
        case 1: return "1st"
        case 2: return "2nd"
        case 3: return "3rd"
       
    }
    return new Date().getDate() + 'th'
}    

function counterOftasks() {
    if (undoneTasks.children.length <= 1) {
        return `${undoneTasks.children.length} task`
    } else {
        return `${undoneTasks.children.length} tasks`
    }
}

function keyEnter(e){
    if(e.keyCode === 13){
        e.preventDefault();
        addTask()
        changeHeight(e)
        let count = document.querySelector('.counter')
        count.textContent = `${counterOftasks()}`
    }
}

function keyEsc(e){
    if (e.keyCode == 27) {
        mainTextArea.value = ""
    }
}

function changeHeight(e) {
    if (e.target.value.length < 28 || e.target.value == "") {
        e.target.rows = "1"
    }
    if (e.target.value.length > 28) {
         e.target.rows = "2"
    }
    if (e.target.value.length > 56) {
        e.target.rows = "3"
    }
}