const express = require('express');
const connectDB = require('./database/db')
const AdminRouter = require('./routes/admin')
const dotenv = require("dotenv")
dotenv.config();
connectDB();
const PORT = process.env.PORT
const app = express();
// Middleware for parsing request bodies

app.use(express.json());
app.use('/admin', AdminRouter)


app.listen(PORT, () => {
    console.log(`Server is running on localhost port ${PORT}`);
});  