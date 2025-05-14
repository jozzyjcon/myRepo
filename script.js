document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const totalTasks = document.getElementById('total-tasks');
    const completedTasks = document.getElementById('completed-tasks');
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    function renderTasks() {
        todoList.innerHTML = '';
        let completedCount = 0;
        
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            if (task.completed) {
                li.classList.add('completed');
                completedCount++;
            }
            
            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            taskText.addEventListener('click', () => toggleTask(index));
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteTask(index);
            });
            
            li.appendChild(taskText);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);
        });
        
        totalTasks.textContent = `Total: ${tasks.length}`;
        completedTasks.textContent = `Completed: ${completedCount}`;
        
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    function addTask() {
        const text = todoInput.value.trim();
        if (text !== '') {
            tasks.push({ text, completed: false });
            todoInput.value = '';
            renderTasks();
        }
    }
    
    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }
    
    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }
    
    addBtn.addEventListener('click', addTask);
    
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    renderTasks();
});
