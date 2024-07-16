const express = require('express');
const path = require('path');
const productos = require('../data/products.json');

const adminController = {
    editProduct: (req, res) => {
       // res.sendFile(path.resolve(__dirname,'../views/admin/editProduct.html'));
       const id =req.params.id;
       const cafe = productos.find(e=>e.id==id);
       console.log(cafe);
       res.render('admin/editProduct',{'cafe':cafe});
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