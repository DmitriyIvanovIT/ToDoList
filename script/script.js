'use strict';

class ToDo {
    constructor(form, input, todoList, todoCompleted, todoContainer) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoContainer = document.querySelector(todoContainer);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
    }

    addTodo(e) {
        e.preventDefault();
        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };

            this.todoData.set(newTodo.key, newTodo);
            this.render();
            this.input.value = '';
        } else {
            alert('Пустое дело нельзя добавить');
        }
    }

    adToStorage() {
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.adToStorage();
    }

    createItem(todo) {
        const li = document.createElement('li');

        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
                <button class="todo-edit"></button>
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
    `);

        if (todo.completed) {
            this.todoCompleted.prepend(li);
        } else {
            this.todoList.prepend(li);
        }
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    handler() {
        this.todoContainer.addEventListener('click', event => {
            let target = event.target;

            if (target.classList.contains('todo-complete')) {
                target = target.closest('.todo-item');
                this.completedItem(target.key);
            }

            if (target.classList.contains('todo-remove')) {
                target = target.closest('.todo-item');
                this.deleteItem(target.key);
            }
        });
    }

    deleteItem(key) {
        this.todoData.delete(key);
        this.render();
        this.adToStorage();
    }

    completedItem(key) {
        const item = this.todoData.get(key);

        if (item.completed) {
            item.completed = false;
        } else {
            item.completed = true;
        }

        this.render();
        this.adToStorage();
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
        this.handler();
    }



}

const todo = new ToDo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container');

todo.init();