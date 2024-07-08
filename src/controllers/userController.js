const express = require('express');
const path = require('path');

const userController = {
    login: (req, res) => {
        res.sendFile(path.resolve(__dirname,'../views/users/login.html'));
    },
    register: (req, res) => {
        res.sendFile(path.resolve(__dirname,'../views/users/register.html'));
    },
    recuperarClave: (req, res) => {
        res.sendFile(path.resolve(__dirname,'../views/users/recuperarClave.html'));
    }
}

module.exports = userController;