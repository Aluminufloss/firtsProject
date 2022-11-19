const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener('click', doneTask);

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(task => renderTask(task));
}

chechEmptyList()

function addTask(event) {
    // Отменяем отправку формы
    event.preventDefault();

    // Польховательский текст
    const taskText = taskInput.value;

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    };

    // Добавляем задачу в массив с задачами
    tasks.push(newTask);

    saveLocalStorage();

    renderTask(newTask);

    // Очищаем поле ввода и возвращаем фокус на него
    taskInput.value = "";
    taskInput.focus();

    // Скрытие блока 
    chechEmptyList();
}


function deleteTask(event) {
    if (event.target.dataset.action !== 'delete') return;

    const parentNode = event.target.closest('.list-group-item');
    
    // Определяем id задачи
    const id = Number(parentNode.id);

    // Находим индекс задачи в массиве
    const index = tasks.findIndex((task) => task.id === id);

    // Удаляем задачу из массива с задачами
    tasks.splice(index, 1);

    saveLocalStorage();

    // Удаляем задачу из резметки
    parentNode.remove();

    // Скрытие блока 
    chechEmptyList();
 }


 function doneTask(event) {
        // Проtyверяем, что клик был по кнопке "задача выполнена"
        if (event.target.dataset.action !== "done") return;
    
        const parentNode = event.target.closest('.list-group-item');

        const id  = Number(parentNode.id);

        const task = tasks.find( (task) => task.id === id);
         
        task.done = !task.done;

        saveLocalStorage();

        const taskTitle = parentNode.querySelector('.task-title');
        taskTitle.classList.toggle('task-title--done');     
 }


 function chechEmptyList() {
    if (tasks.length === 0) {
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
                                    <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
                                    <div class="empty-list__title">Список дел пуст</div>
                                </li>`
        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
        
        if (tasks.length > 0) {
            const emptyListEL = document.querySelector('emptyList');
            emptyListEL ? emptyListEL.remove() : null;
        }
    }
 }

function saveLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(task) {
    // Формируем разметку для новой задачи
    const cssClass = task.done ? "task-title task-title--done" : "task-title";

    // Формируем разметку для новой задачи
    const taskHTML = `
            <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
                    <span class="${cssClass}">${task.text}</span>
                <div class="task-item__buttons">
                    <button type="button" data-action="done" class="btn-action">
                        <img src="./img/tick.svg" alt="Done" width="18" height="18">
                     </button>
                    <button type="button" data-action="delete" class="btn-action">
                        <img src="./img/cross.svg" alt="Done" width="18" height="18">
                    </button>
                </div>
            </li>`;

    // Добавляем задачу на страницу
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
}