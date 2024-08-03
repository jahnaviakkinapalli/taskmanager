const db = require('../config/db');

addTask = (req, res) => {
    const { title, description, status, priority, due_date, user_id } = req.body;

    // Validate required fields
    if (!title || !user_id) {
        return res.status(400).send({
            status: 'error',
            message: 'Title and User ID are required'
        });
    }

    let newTask = {
        title: title,
        description: description,
        status: status || 'Todo',
        priority: priority || 'Low',
        due_date: due_date,
        created_at: new Date(),
        updated_at: new Date(),
        user_id: user_id
    };

    let sql = 'INSERT INTO tasks SET ?';

    db.query(sql, newTask, (err, result) => {
        if (err) {
            return res.status(500).send({
                status: 'error',
                message: err?.sqlMessage
            });
        }
        res.send({
            status: 'success',
            data: result
        });
    });
};

deleteTask = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({
            status: 'error',
            message: 'Task ID is required'
        });
    }

    let sql = 'DELETE FROM tasks WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send({
                status: 'error',
                message: err?.sqlMessage
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({
                status: 'error',
                message: 'Task not found'
            });
        }
        res.send({
            status: 'success',
            message: 'Task deleted successfully'
        });
    });
};

getTasks = (req, res) => {
    const { status, priority, due_date, title } = req.query;

    let sql = 'SELECT * FROM tasks WHERE 1=1';
    let params = [];

    if (status) {
        sql += ' AND status = ?';
        params.push(status);
    }

    if (priority) {
        sql += ' AND priority = ?';
        params.push(priority);
    }

    if (due_date) {
        sql += ' AND due_date = ?';
        params.push(due_date);
    }

    if (title) {
        sql += ' AND title LIKE ?';
        params.push(`%${title}%`);
    }

    db.query(sql, params, (err, results) => {
        if (err) {
            return res.status(500).send({
                status: 'error',
                message: err?.sqlMessage
            });
        }
        res.send({
            status: 'success',
            data: results
        });
    });
};


module.exports = { addTask, deleteTask, getTasks }