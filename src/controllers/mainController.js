const express = require('express');
const path = require('path');

const mainController = {
    index: (req, res) => {
        //res.sendFile(path.resolve(__dirname,'../views/index.html'));
        const datos = {
            titulo: "COFFECODE"
        }
        const productos = [
            {
                id:1,
                imagen: "/img/imagen_producto.jpg",
                nombre: "Café Colombiano",
                descripcion: "Café de alta calidad de Colombia.",
                cantidad: 6,
                categoria: "café"
            },
            {
                id:2,
                imagen: "/img/imagen-producto4.jpg",
                nombre: "Café Brasileño",
                descripcion: "Café robusto y fuerte de Brasil.",
                cantidad: 6,
                categoria: "café"
            },
            {
                id:3,
                imagen: "/img/imagen_producto.jpg",
                nombre: "Café Etiopía",
                descripcion: "Café suave y afrutado de Etiopía.",
                cantidad: 6,
                categoria: "café"
            },
            {
                id:4,
                imagen: "/img/imagen_producto.jpg",
                nombre: "Café Kona",
                descripcion: "Café exótico de Hawai.",
                cantidad: 6,
                categoria: "café"
            },
            {
                id:5,
                imagen: "/img/imagen_producto.jpg",
                nombre: "Café de Sumatra",
                descripcion: "Café con notas especiadas de Sumatra.",
                cantidad: 6,
                categoria: "café"
            },
            {
                id:6,
                imagen: "/img/imagen_producto.jpg",
                nombre: "Café de Jamaica",
                descripcion: "Café suave y aromático de Jamaica.",
                cantidad: 6,
                categoria: "café"
            },
            {
                id:7,
                imagen: "/img/imagen-producto3.jpg",
                nombre: "Café de Guatemala",
                descripcion: "Café con cuerpo completo de Guatemala.",
                cantidad: 6,
                categoria: "café"
            }
        ];
        
        
        res.render('index',{'datos':datos,'listaProductos':productos});
    }
}

module.exports = mainController;