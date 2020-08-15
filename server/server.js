require('./config/config');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/user', (req, res) => {
    res.json('get user');
});

app.post('/user', (req, res) => {
    const { name, age, email } = req.body;
    if(!name) {
        res.status(400).json({ 
            ok: false, 
            msg: 'El nombre es necesario'
        });
    };
    res.json({ 
        user: {
            name,
            age,
            email
        }
    });
});

app.put('/user/:id', (req, res) => {

    const { id } = req.params;

    res.json({
        id
    });
});

app.delete('/user', (req, res) => {
    res.json('delete user');
});


app.listen(process.env.PORT, () => {
    console.log('Listen on port 3000');
});