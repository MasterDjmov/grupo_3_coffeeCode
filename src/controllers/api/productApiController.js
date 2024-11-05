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
    }
}
module.exports = proctApiController;
