document.addEventListener('DOMContentLoaded', () => {
    showTasks();
    fetchTasks();
});

const apiUrl = 'http://localhost:3000'; 

function fetchTasks() {
    const statusFilter = document.getElementById('filter-status').value;
    const priorityFilter = document.getElementById('filter-priority').value;
    const dueDateFilter = document.getElementById('filter-dueDate').value;
    const searchFilter = document.getElementById('search').value.toLowerCase();

    fetch(`${apiUrl}/getTasks`)
        .then(response => response.json())
        .then(tasks => {
            const filteredTasks = tasks.filter(task => {
                return (
                    (statusFilter === '' || task.status === statusFilter) &&
                    (priorityFilter === '' || task.priority === priorityFilter) &&
                    (dueDateFilter === '' || task.dueDate === dueDateFilter) &&
                    (searchFilter === '' || task.title.toLowerCase().includes(searchFilter) || task.description.toLowerCase().includes(searchFilter))
                );
            });
            displayTasks(filteredTasks);
        })
        .catch(error => console.error('Error fetching tasks:', error));
}

function displayTasks(tasks) {
    const taskList = document.getElementById('task-list').getElementsByTagName('tbody')[0];
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const row = taskList.insertRow();
        row.insertCell(0).textContent = task.title;
        row.insertCell(1).textContent = task.description;
        row.insertCell(2).textContent = task.status;
        row.insertCell(3).textContent = task.priority;
        row.insertCell(4).textContent = task.dueDate;

        // Actions cell
        const actionsCell = row.insertCell(5);
        actionsCell.innerHTML = `
            <button onclick="editTask('${task.id}')">Edit</button>
            <button onclick="deleteTask('${task.id}')">Delete</button>
        `;
    });
}

function showAddTask(isEdit = false ) {
    document.getElementById('task-form-container').style.display = 'block';
    document.getElementById('task-list-container').style.display = 'none';
    document.getElementById('filter-container').style.display = 'none';
    if(!isEdit){
        clearForm();
    }
}

function showTasks() {
    document.getElementById('task-form-container').style.display = 'none';
    document.getElementById('task-list-container').style.display = 'block';
    document.getElementById('filter-container').style.display = 'flex';
    fetchTasks();
}

function clearForm() {
    document.getElementById('task-id').value = '';
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('status').value = 'Todo';
    document.getElementById('priority').value = 'Low';
    document.getElementById('dueDate').value = '';
}

function editTask(id) {
    fetch(`${apiUrl}/getTask/${id}`)
        .then(response => response.json())
        .then(task => {
            document.getElementById('task-id').value = task.id;
            document.getElementById('title').value = task.title;
            document.getElementById('description').value = task.description;
            document.getElementById('status').value = task.status;
            document.getElementById('priority').value = task.priority;
            document.getElementById('dueDate').value = task.dueDate;

            showAddTask(true);
        })
        .catch(error => console.error('Error fetching task:', error));
}

function deleteTask(id) {
    fetch(`${apiUrl}/deleteTask/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(() => {
            fetchTasks(); // Refresh task list
        })
        .catch(error => console.error('Error deleting task:', error));
}

document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const task = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        status: document.getElementById('status').value,
        priority: document.getElementById('priority').value,
        dueDate: document.getElementById('dueDate').value
    };

    const taskId = document.getElementById('task-id').value;
    payload ={
        task,
        jwtToken : localStorage.getItem('jwtToken')
     }
    if (taskId) {
        fetch(`${apiUrl}/updateTask/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Task updated:', data);
                showTasks();
            })
            .catch(error => console.error('Error updating task:', error));
    } else {
        fetch(`${apiUrl}/addTask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Task added:', data);
                showTasks();
            })
            .catch(error => console.error('Error adding task:', error));
    }
});
function logOut(){
    window.location.href = 'login.html';
    localStorage.clear()
}
