const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");

dotenv.config();

const app = express();



app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "https://frontend-todo-lrpz.onrender.com",
,
      ], // Correct origin without trailing slash
      methods: "GET,POST,PUT,DELETE,OPTIONS", // Allowed HTTP methods
      allowedHeaders: "Content-Type,Authorization", // Allowed headers
      credentials: true, // Allow cookies/credentials
    })
  );


app.use(express.json());

const todoRoutes = require('./routes/todoRoute');
app.use('/api/todos', todoRoutes);


 mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Database copnnected"))
.catch((err) => console.log(err))

app.get("/", (req, res) => {
    res.status(200).json({
      Message: "server is running",
    });
  });


// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
