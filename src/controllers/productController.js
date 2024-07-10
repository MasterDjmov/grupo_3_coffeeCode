const express = require('express');
const path = require('path');

const productController = {
    productCart: (req, res) => {
       // res.sendFile(path.resolve(__dirname,'../views/products/productCart.html'));
       res.render('products/productCart');
    },
    productCart_detalle: (req, res) => {
       // res.sendFile(path.resolve(__dirname,'../views/products/productCart_detalle.html'));
       res.render('products/productCart_detalle');
    },
    productCart_facturacion: (req, res) => {
       // res.sendFile(path.resolve(__dirname,'../views/products/productCart_facturacion.html'));
       res.render('products/productCart_facturacion');
    },
    productDetail: (req, res) => {
        //res.sendFile(path.resolve(__dirname,'../views/products/productDetail.html'));
        const id =req.params.id;
        const productos = [
         {
             id: 1,
             imagen: "/img/imagen_producto.jpg",
             nombre: "Café Colombiano",
             descripcion: "Café de alta calidad de Colombia.",
             cantidad: 6,
             categoria: "café",
             precio: `$${(Math.random() * (50000 - 30000) + 30000).toFixed(2)}`
         },
         {
             id: 2,
             imagen: "/img/imagen-producto4.jpg",
             nombre: "Café Brasileño",
             descripcion: "Café robusto y fuerte de Brasil.",
             cantidad: 6,
             categoria: "café",
             precio: `$${(Math.random() * (50000 - 30000) + 30000).toFixed(2)}`
         },
         {
             id: 3,
             imagen: "/img/imagen_producto.jpg",
             nombre: "Café Etiopía",
             descripcion: "Café suave y afrutado de Etiopía.",
             descripcion2: "Café suave y afrutado de Etiopíahhhhhhhhhhhh.",
             cantidad: 6,
             categoria: "café",
             precio: `$${(Math.random() * (50000 - 30000) + 30000).toFixed(2)}`
         },
         {
             id: 4,
             imagen: "/img/imagen_producto.jpg",
             nombre: "Café Kona",
             descripcion: "Café exótico de Hawai.",
             cantidad: 6,
             categoria: "café",
             precio: `$${(Math.random() * (50000 - 30000) + 30000).toFixed(2)}`
         },
         {
             id: 5,
             imagen: "/img/imagen_producto.jpg",
             nombre: "Café de Sumatra",
             descripcion: "Café con notas especiadas de Sumatra.",
             cantidad: 6,
             categoria: "café",
             precio: `$${(Math.random() * (50000 - 30000) + 30000).toFixed(2)}`
         },
         {
             id: 6,
             imagen: "/img/imagen_producto.jpg",
             nombre: "Café de Jamaica",
             descripcion: "Café suave y aromático de Jamaica.",
             cantidad: 6,
             categoria: "café",
             precio: `$${(Math.random() * (50000 - 30000) + 30000).toFixed(2)}`
         },
         {
             id: 7,
             imagen: "/img/imagen-producto3.jpg",
             nombre: "Café de Guatemala",
             descripcion: "Café con cuerpo completo de Guatemala.",
             cantidad: 6,
             categoria: "café",
             precio: `$${(Math.random() * (50000 - 30000) + 30000).toFixed(2)}`
         }
     ];

     const cafe = productos.find(e=>e.id==id);
     //console.log(cafe);
        res.render('products/productDetail',{'cafe':cafe});
    }
    
}

module.exports = productController;