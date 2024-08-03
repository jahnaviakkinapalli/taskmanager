document.addEventListener('DOMContentLoaded', () => {
    showTasks();
    fetchTasks();
});

const apiUrl = 'http://localhost:3000';
const token = localStorage.getItem('jwtToken');
const user_id = localStorage.getItem('user_id');

function fetchTasks() {
    const statusFilter = document.getElementById('filter-status').value;
    const priorityFilter = document.getElementById('filter-priority').value;
    const dueDateFilter = document.getElementById('filter-dueDate').value;
    const searchFilter = document.getElementById('search').value.toLowerCase();

    fetch(`${apiUrl}/task/getTasks`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({})
        }
    )
        .then(response => response.json())
        .then(tasks => {
            const filteredTasks = tasks.data.filter(task => {
                return (
                    (statusFilter === '' || task.status === statusFilter) &&
                    (priorityFilter === '' || task.priority === priorityFilter) &&
                    (dueDateFilter === '' || task.due_date === dueDateFilter) &&
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
        row.insertCell(4).textContent = task.due_date;

        const actionsCell = row.insertCell(5);
        actionsCell.innerHTML = `
            <button onclick="deleteTask('${task.id}')">Delete</button>
        `;
    });
}

function showAddTask() {
    document.getElementById('task-form-container').style.display = 'block';
    document.getElementById('task-list-container').style.display = 'none';
    document.getElementById('filter-container').style.display = 'none';
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

function deleteTask(id) {
    fetch(`${apiUrl}/task/deleteTask?id=${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': `Bearer ${token}`
        },
    })
        .then(response => response.json())
        .then(() => {
            fetchTasks();
        })
        .catch(error => console.error('Error deleting task:', error));
}

document.getElementById('task-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const task = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        status: document.getElementById('status').value,
        priority: document.getElementById('priority').value,
        due_date: document.getElementById('dueDate').value,
        user_id
    };

    const taskId = document.getElementById('task-id').value;
    payload = {
        ...task,
        jwtToken: localStorage.getItem('jwtToken')
    }

    fetch(`${apiUrl}/task/addTask`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Task added:', data);
            showTasks();
        })
        .catch(error => console.error('Error adding task:', error));
});

function logOut() {
    window.location.href = 'login.html';
    localStorage.clear()
}
