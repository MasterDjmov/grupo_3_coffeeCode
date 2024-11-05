const db = require('../../database/models');

const tiposProductApiController = {
    lista: async (req, res) => {
        try {
            const tipoCafe = await db.TiposCafes.findAll();


            res.json({
                count: tipoCafe.length,
                product: tipoCafe

            });
            res.json(tipoCafe)
        } catch (error) {

        }
    }
}
module.exports = tiposProductApiController;