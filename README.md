Data base craeated:
create used for users:
---------------------------------------------------------------------------
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

create used for tasks:
---------------------------------------------------------------------------
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('Todo', 'In Progress', 'Done') DEFAULT 'Todo',
    priority ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

APIS:

1. For login
url: /user/login, 
method: post

3. For register
url: /user/add, 
method: post

4. For add task
url: /task/addTask, 
method: post

5. For delete task
url: /task/deleteTask, 
method: delte

6. For get all tasks
url: /task/getTasks, 
method: post

Added env variable n env-dev file
