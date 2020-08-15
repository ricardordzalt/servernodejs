require('./config/config');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require('./routes/user'));
console.log('urlbd', process.env.URL_DB);
mongoose.connect(process.env.URL_DB, 
    { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
    if(err) throw err;
    console.log('Database is online');
});


app.listen(process.env.PORT, () => {
    console.log('Listen on port 3000');
});