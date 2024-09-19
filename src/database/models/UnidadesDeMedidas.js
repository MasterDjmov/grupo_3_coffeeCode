// src/models/UnidadMedida.js

module.exports = (Sequelize, DataTypes) => {
    const UnidadesDeMedidas = Sequelize.define('UnidadesDeMedidas', {
        id_unidad_medida: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre_medida: {
            type: DataTypes.STRING(45),
            allowNull: true
        }
    }, {
        tableName: 'unidad_medida',
        timestamps: false
    });
    UnidadesDeMedidas.associate = models => {
        UnidadesDeMedidas.hasMany(models.Productos, {
            as: 'productos',
            foreignKey: 'idunidad_medida'
        });
    };
    return UnidadesDeMedidas;
};
