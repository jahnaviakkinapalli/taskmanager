const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoute');
const taskRoutes = require('./routes/taskRoute');
const cors = require("cors")
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors())
app.use(bodyParser.json());

// Use user routes
app.use('/user', userRoutes);
app.use('/task', taskRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
