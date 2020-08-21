'use strict';
// Переменные
const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

    const todoData = JSON.parse(localStorage.getItem('savesToDo')) || [];

// Функции
const renderToDo = () => {
    todoList.textContent = '';
    todoCompleted.textContent = '';
    todoData.forEach((item, i) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${item.value}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `);

        if(item.completed) {
            todoCompleted.prepend(li);
        } else {
            todoList.prepend(li);
        }

        const todoComplete = li.querySelector('.todo-complete'),
        todoRemove = li.querySelector('.todo-remove');

        todoComplete.addEventListener('click', () => {
            item.completed = !item.completed;
            saveToDo();
            renderToDo();
        });
        todoRemove.addEventListener('click', event => {
            todoData.splice(i, 1);
            saveToDo();
            renderToDo();
        });
    });
}, 
saveToDo = () => {
    localStorage.setItem('savesToDo', JSON.stringify(todoData));
};

// Обработчики событий и вызовы функций
renderToDo();
todoControl.addEventListener('submit', event => {
    event.preventDefault();
    if (headerInput.value.trim() === '') {
        alert('Введите план');
        return;
    }
    const newToDo = {
        value: headerInput.value,
        completed: false
    }
    todoData.push(newToDo);
    todoControl.reset();
    saveToDo();
    renderToDo();
});
