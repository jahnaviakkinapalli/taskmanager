document.addEventListener('DOMContentLoaded', () => {
    showTasks();
});

const staticTasks = [
    { id: '1', title: 'Task 1', description: 'Description 1', status: 'Todo', priority: 'High', dueDate: '2023-08-01' },
    { id: '2', title: 'Task 2', description: 'Description 2', status: 'In Progress', priority: 'Medium', dueDate: '2023-08-02' },
    { id: '3', title: 'Task 3', description: 'Description 3', status: 'Done', priority: 'Low', dueDate: '2023-08-03' },
    { id: '4', title: 'Task 4', description: 'Description 4', status: 'Todo', priority: 'Medium', dueDate: '2023-08-04' },
    { id: '5', title: 'Task 5', description: 'Description 5', status: 'In Progress', priority: 'High', dueDate: '2023-08-05' }
];

function fetchTasks() {
    const statusFilter = document.getElementById('filter-status').value;
    const priorityFilter = document.getElementById('filter-priority').value;
    const dueDateFilter = document.getElementById('filter-dueDate').value;
    const searchFilter = document.getElementById('search').value.toLowerCase();

    const filteredTasks = staticTasks.filter(task => {
        return (
            (statusFilter === '' || task.status === statusFilter) &&
            (priorityFilter === '' || task.priority === priorityFilter) &&
            (dueDateFilter === '' || task.dueDate === dueDateFilter) &&
            (searchFilter === '' || task.title.toLowerCase().includes(searchFilter) || task.description.toLowerCase().includes(searchFilter))
        );
    });

    displayTasks(filteredTasks);
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

function logOut(){
    window.location.href="/frontend/login.html"
}
