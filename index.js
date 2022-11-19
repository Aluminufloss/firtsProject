const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRouter');
const path = require('path');
const PORT = process.env.PORT || 5000
const app = express();

app.use(express.json());
app.use("/auth", authRouter);

app.set('views', __dirname + '/views');
console.log(__dirname + '\views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.static(__dirname + "/views"));


const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://Admin:Nazar13579@cluster0.xkai1rn.mongodb.net/?retryWrites=true&w=majority');
        app.listen(PORT, () => console.log("Server started"));
    } catch (e) {
        console.log(e);
    }
 }

start();

