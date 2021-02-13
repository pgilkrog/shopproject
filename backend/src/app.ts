import dotenv from 'dotenv'
import express from 'express'
import { ConnectionDatabase } from './config/db';

// Load the enviroment variables from the .env file
dotenv.config({
    path: './.env'
})

const connection = new ConnectionDatabase;
connection.connectDB();

const app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS, PUT");
    next();
});

app.use('/api/item', require('./routers/itemRoute'));
app.use('/api/category', require('./routers/categoryRoute'));

const PORT = process.env.APP_PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));