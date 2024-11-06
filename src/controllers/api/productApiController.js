const db = require('../../database/models');

const proctApiController = {
    lista: async (req, res) => {
        try {
            const product = await db.Productos.findAll();


            res.json({
                count: product.length,
                product: product

            });
            res.json(product)
        } catch (error) {

        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await db.Productos.findByPk(id);
            if (!product) {
                return res.status(404).json({ error: 'Producto no encontrado.' });
            }
            await product.destroy(); 
            res.json({ message: 'Producto eliminado con éxito.' });
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            res.status(404).json({ error: 'Hubo un error al eliminar el producto.' });
        }
    }
}
module.exports = proctApiController;
