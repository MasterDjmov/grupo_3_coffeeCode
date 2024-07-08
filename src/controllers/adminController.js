const express = require('express');
const path = require('path');

const adminController = {
    editProduct: (req, res) => {
        res.sendFile(path.resolve(__dirname,'../views/admin/editProduct.html'));
    },
    listProduct: (req, res) => {
        res.sendFile(path.resolve(__dirname,'../views/admin/listProduct.html'));
    },
    registerProduct: (req, res) => {
        res.sendFile(path.resolve(__dirname,'../views/admin/registerProduct.html'));
    }
}

module.exports = adminController;