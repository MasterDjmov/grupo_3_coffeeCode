const express = require('express');
const path = require('path');

const adminController = {
    editProduct: (req, res) => {
       // res.sendFile(path.resolve(__dirname,'../views/admin/editProduct.html'));
       res.render('admin/editProduct');
    },
    listProduct: (req, res) => {
       //res.sendFile(path.resolve(__dirname,'../views/admin/listProduct.html'));
       res.render('admin/listProduct');
    },
    registerProduct: (req, res) => {
        //res.sendFile(path.resolve(__dirname,'../views/admin/registerProduct.html'));
        res.render('admin/registerProduct');
    }
}

module.exports = adminController;