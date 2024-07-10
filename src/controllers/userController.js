const express = require('express');
const path = require('path');

const userController = {
    login: (req, res) => {
        //res.sendFile(path.resolve(__dirname,'../views/users/login.html'));
        res.render('users/login');
    },
    register: (req, res) => {
        //res.sendFile(path.resolve(__dirname,'../views/users/register.html'));
        res.render('users/register');
    },
    recuperarClave: (req, res) => {
       // res.sendFile(path.resolve(__dirname,'../views/users/recuperarClave.html'));
       res.render('users/recuperarClave');
    }
}

module.exports = userController;