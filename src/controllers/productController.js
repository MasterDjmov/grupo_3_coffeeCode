const express = require('express');
const path = require('path');
const productos = require('../data/products.json');
const session = require('express-session');

//agregamos la parte de sequelize
const db = require('../database/models/index.js');
const { Association, where } = require('sequelize');

const productController = {
    productCart: (req, res) => {
       // res.sendFile(path.resolve(__dirname,'../views/products/productCart.html'));
       res.render('products/productCart');
    },
    productCart_detalle: (req, res) => {
      const id =req.params.id;
      const msg = "";
      const cafe = productos.find(e=>e.id==id);
      if(req.session.user){
             user= req.session.user
       }else{
             user="";
       }
       
       res.render('products/productCart_detalle',
         {
            'cafe':cafe,
            'user':user,
            'msg':"Usted debe iniciar Sesión para Agregar al Carrito"
         }
       );
    },
    productCart_facturacion: (req, res) => {
       // res.sendFile(path.resolve(__dirname,'../views/products/productCart_facturacion.html'));
       res.render('products/productCart_facturacion');
    },
    productDetail: (req, res) => {
        const id =req.params.id;
        const msg = "";
        const cafe = productos.find(e=>e.id==id);
        if(req.session.user){
               user= req.session.user
         }else{
               user="";
         }
      
        res.render('products/productDetail',
         {
            'cafe':cafe,
            'user':user,
             'msg':"Usted debe iniciar Sesión para Agregar al Carrito"
         });
    }
    
}

module.exports = productController;