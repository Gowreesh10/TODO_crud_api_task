const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const app = express();
dotenv.config();
connectDB();

app.use(express.json()); // Middleware to parse JSON bodies
app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`);
})
