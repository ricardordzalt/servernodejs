const express = require('express');
const app = express();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('underscore');

app.get('/user', (req, res) => {

    const from = Number(req.query.from) || 0;

    const limit = Number(req.query.limit) || 5;

    const queryActiveUsers = {
        status: true
    };

    User.find(queryActiveUsers, 'name email role status img')
        .skip(from).limit(limit).exec((err, users) => {
            if(err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            };

            User.count(queryActiveUsers, (err, count) => {
                if(err){
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                };
                
                res.json({
                    ok: true,
                    users,
                    count
                });

            });
        });
});

app.post('/user', (req, res) => {
    let { name, email, password, role } = req.body;

    password = bcrypt.hashSync(password, 10);

    let user = new User({
        name,
        email,
        password,
        role
    });

    user.save((err, userDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        };
        

        res.json({
            ok: true,
            user: userDB
        });
    });
});

app.put('/user/:id', (req, res) => {

    const { id } = req.params;
    const body = _.pick( req.body, ['name', 'email', 'img', 'role', 'status']);



    const options = {
        new: true,
        runValidators: true
    };

    User.findByIdAndUpdate(id, body, options, (err, userDB) => {

        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            user: userDB
        });

    });
});

app.delete('/user/:id', (req, res) => {
    
    const { id } = req.params;

    const newStatus = { 
        status: false 
    };

    User.findByIdAndUpdate(id, newStatus, (err, deletedUser) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if(!deletedUser) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }

        res.json({
            ok: true,
            user: deletedUser
        });
    });
    

});


module.exports = app;