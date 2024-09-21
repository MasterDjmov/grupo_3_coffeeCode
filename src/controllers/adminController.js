const express = require('express');
const path = require('path');
const productos = require('../data/products.json');
const session = require('express-session');

//agregamos la parte de sequelize
const db = require('../database/models/index.js');
const { Association, where } = require('sequelize');

const adminController = {
    //formulario con GET
    formEditProduct: async (req, res) => {
        try {
            const id = req.params.id;
            
            // Buscar el producto por su ID y cargar sus asociaciones
            const cafe = await db.Productos.findByPk(id, {
                include: [
                    { association: 'pais' },
                    { association: 'tipocafe' },
                    { association: 'unidad_de_medida' },
                    { association: 'productor' }
                ]
            });
            
            if (!cafe) {
                return res.status(404).render('errors/404');
            }

            // Obtener todas las opciones para los selects
            const tiposCafes = await db.TiposCafes.findAll();
            const unidadesMedida = await db.UnidadesDeMedidas.findAll();
            const paises = await db.Paises.findAll();
            const productores = await db.Productores.findAll();

            
            res.render('admin/editProduct', {
                cafe,
                tiposCafes,
                unidadesMedida,
                paises,
                productores,
                msg: "",
                rol: req.session.user 
            });
        } catch (error) {
            console.error("Error al cargar el producto:", error);
            res.status(404).render('errors/404');
        }
    },
     //formulario con POST
    editProduct: async (req, res) => {
        const {
            nombre_producto,
            descripcion_corta,
            descripcion_larga,
            precio,
            cantidad,
            idunidad_medida,
            id_pais,
            idproductor,
            region,
            procesamiento_natural,
            procesamiento_lavado,
            altitud
        } = req.body;
    
        try {
            const id = req.params.id;
            const cafe = await db.Productos.findByPk(id);
    
            if (!cafe) {
                console.log("Producto no encontrado");
                return res.status(404).render("errors/404", { msg: "Producto no encontrado" });
            }
    
            // Obtener las unidades de medida para el select
            const unidadesMedida = await db.UnidadesDeMedidas.findAll();
            const productores = await db.Productores.findAll();
            const paises = await db.Paises.findAll();


            const updatedData = {
                nombre_producto,
                descripcion_corta,
                descripcion_larga,
                precio,
                cantidad,
                idunidad_medida,
                id_pais,
                idproductor,
                region,
                procesamiento_natural,
                procesamiento_lavado,
                altitud
            };
    
            if (req.file) {
                updatedData.imagen_principal = req.file.filename;
            }
    
            if (req.files && req.files.imagen_secundaria) {
                updatedData.imagen_secundaria = req.files.imagen_secundaria[0].filename;
            }
    
            await cafe.update(updatedData);
    
            console.log("Producto actualizado correctamente");
    
            // Volver a renderizar la vista de edición con los datos del producto
            res.render('admin/editProduct', { cafe, unidadesMedida, productores,paises ,msg: 'Edición exitosa' });
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            res.status(500).send("Error al actualizar el producto");
        }
    },
    // listProduct: (req, res) => {        

    //    //res.sendFile(path.resolve(__dirname,'../views/admin/listProduct.html'));
    //    res.render('admin/listProduct');
    // },
    formRegisterProduct: (req, res) => {
        if (req.session.user && req.session.user.id_rol === 1) {
            Promise.all([
                db.Paises.findAll(),
                db.TiposCafes.findAll(),
                db.UnidadesDeMedidas.findAll(),
                db.Productores.findAll()
            ])
            .then(([paises, tiposCafes, unidades, productores]) => {
                res.render('admin/registerProduct', {
                    paises,
                    tiposCafes,
                    unidades,
                    productores,
                    msg: "",
                    user: req.session.user 
                });
            })
            .catch(error => console.error(error));
        } else {
            res.redirect('/login'); // Redirige si no es admin
        }
    },
    registerProduct: async (req, res) => {
        const {
            nombre_producto,
            descripcion_corta,
            descripcion_larga,
            precio,
            cantidad,
            id_tipo_cafe,
            idunidad_medida,
            id_pais,
            idproductor,
            region,
            procesamiento_natural,
            procesamiento_lavado,
            altitud,
        } = req.body;
    
        const imagen_principal = req.file ? req.file.filename : null;
            const imagen_secundaria = req.files && req.files.imagen_secundaria ? req.files.imagen_secundaria[0].filename : null;

    
        try {
            await db.Productos.create({
                nombre_producto,
                descripcion_corta,
                descripcion_larga,
                precio,
                cantidad,
                id_tipo_cafe,
                idunidad_medida,
                id_pais,
                idproductor,
                region,
                procesamiento_natural,
                procesamiento_lavado,
                altitud,
                imagen_principal,
                imagen_secundaria, 
            });
    
            res.render('admin/registerProduct', {
                msg: "Producto registrado correctamente",
                rol: "",
            });
        } catch (error) {
            console.error("Error al registrar el producto:", error);
            res.render('admin/registerProduct', {
                msg: "Error al registrar el producto",
                rol: "",
            });
        }
    },
    deleteProduct1:(req, res) => {
        console.log("Se Borro por get El producto N° "+req.params.id);
        
        res.redirect('/');
    },
    deleteProduct2:(req, res) => {
        console.log("Se Borro por post El producto N° "+req.params.id);
        
        res.redirect('/');
    },
}

module.exports = adminController;