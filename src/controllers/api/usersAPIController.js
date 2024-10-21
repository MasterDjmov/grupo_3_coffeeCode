const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');
const { url } = require('inspector');


const Usuarios = db.Usuarios 


const usersAPIController = {
    lista: async (req, res) => {
        try {
            const users = await db.Usuarios.findAll({
                attributes: ['id_usuario', 'nombre', 'email'] 
            });

            const usersDetalles = users.map(user => ({
                id: user.id_usuario,
                name: user.nombre,
                email: user.email,
                detail: `/api/users/${user.id_usuario}` 
            }));

            res.json({
                count: users.length,
                users: usersDetalles,
                
            });
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: 'Error al mostrar la lista de usuarios.' });
        }
    },
    detalle: async (req, res) => {
        try {
            const user = await db.Usuarios.findByPk(req.params.id, {
                attributes: {
                    exclude: ['clave', 'id_rol'] 
                }
            });

            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }

            res.json({
                id_usuario: user.id_usuario,
                nombre: user.nombre,
                apellido: user.apellido,
                telefono: user.telefono,
                dni: user.dni,
                email: user.email,
                imagen_perfil: `/img/perfil/${user.imagen_perfil}`,
                barrio: user.barrio,
                calle: user.calle,
                numero: user.numero,
                piso: user.piso,
                departamento: user.departamento,
                created_at: user.created_at,
                updated_at: user.updated_at,
                id_localidad: user.id_localidad,
                id_estado: user.id_estado,
                cuil_t: user.cuil_t
            });
        } catch (error) {
            console.error(error);
            res.status(404).json({ error: 'Error al mostrar el detalle del usuario.' });
        }
    },
    paginado: async (req, res) => {
        try {
            const page = parseInt(req.params.page) || 1; 
            const limit = 10; 
            const offset = (page - 1) * limit; 

            const { count, rows: users } = await db.Usuarios.findAndCountAll({
                attributes: ['id_usuario', 'nombre', 'email'], 
                limit, 
                offset 
            });

            const totalPaginas = Math.ceil(count / limit); 

            const usersDetalles = users.map(user => ({
                id: user.id_usuario,
                name: user.nombre,
                email: user.email,
                detail: `/api/users/${user.id_usuario}` 
            }));

            
            const siguientePagina = page < totalPaginas ? `/api/users/page/${page + 1}` : null;
            const anteriorPagina = page > 1 ? `/api/users/page/${page - 1}` : null;

            res.json({
                count, 
                totalPaginas, 
                paginaActual: page, 
                users: usersDetalles, 
                next: siguientePagina, 
                previous: anteriorPagina, 
                url: '/api/users/page' 
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al mostrar el paginado de usuarios.' });
        }
    }
}



module.exports = usersAPIController