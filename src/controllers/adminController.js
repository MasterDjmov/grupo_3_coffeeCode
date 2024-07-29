const express = require('express');
const path = require('path');
const productos = require('../data/products.json');
const session = require('express-session');


const adminController = {
    //formulario con GET
    formEditProduct: (req, res) => {
        
        // res.sendFile(path.resolve(__dirname,'../views/admin/editProduct.html'));
        const id =req.params.id;
        const cafe = productos.find(e=>e.id==id);
        console.log(cafe);
        res.render('admin/editProduct',{'cafe':cafe,
            'msg':"",
            'rol':req.session.categoria
        });
     },
     //formulario con POST
    editProduct: (req, res) => {
      
       const id =req.params.id;
       const cafe = productos.find(e=>e.id==id);
      
       res.render('admin/editProduct',
        {
         'cafe':cafe,
         'msg':"Edición Exitosa!!!",
         'rol':""
        });
    },
    // listProduct: (req, res) => {        

    //    //res.sendFile(path.resolve(__dirname,'../views/admin/listProduct.html'));
    //    res.render('admin/listProduct');
    // },
    formRegisterProduct: (req, res) => {
       
        res.render('admin/registerProduct',
            {'msg':"",
             'rol':""
        });
    },
    registerProduct: (req, res) => {
        console.log("se inserto un producto");
        
        res.render('admin/registerProduct',
            {
                'msg':"Producto Cargado Correctamente!!",
                'rol':""
            });
    }
}

module.exports = adminController;