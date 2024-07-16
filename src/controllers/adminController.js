const express = require('express');
const path = require('path');
const productos = require('../data/products.json');

const adminController = {
    formEditProduct: (req, res) => {
        // res.sendFile(path.resolve(__dirname,'../views/admin/editProduct.html'));
        const id =req.params.id;
        const cafe = productos.find(e=>e.id==id);
        console.log(cafe);
        res.render('admin/editProduct',{'cafe':cafe,'msg':""});
     },
    editProduct: (req, res) => {
       // res.sendFile(path.resolve(__dirname,'../views/admin/editProduct.html'));

       const id =req.params.id;
       const cafe = productos.find(e=>e.id==id);
      
       res.render('admin/editProduct',{'cafe':cafe, 'msg':"Edición Exitosa!!!"});
    },
    listProduct: (req, res) => {
       //res.sendFile(path.resolve(__dirname,'../views/admin/listProduct.html'));
       res.render('admin/listProduct');
    },
    formRegisterProduct: (req, res) => {
        //res.sendFile(path.resolve(__dirname,'../views/admin/registerProduct.html'));
        res.render('admin/registerProduct',{'msg':""});
    },
    registerProduct: (req, res) => {
        //res.sendFile(path.resolve(__dirname,'../views/admin/registerProduct.html'));
        console.log("se inserto un producto");
        res.render('admin/registerProduct',{'msg':"Producto Cargado Correctamente!!"});
    }
}

module.exports = adminController;