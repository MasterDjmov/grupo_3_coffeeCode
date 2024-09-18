module.exports = (Sequelize, DataTypes) => {
    const MediosDePagos = Sequelize.define('MedioPagos', {
        id_medio_pago: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre_pago: {
            type: DataTypes.STRING(45),
            allowNull: true
        }
    }, {
        tableName: 'medio_pagos',
        timestamps: false
    });

    MediosDePagos.associate = models => {
        MediosDePagos.hasMany(models.Carritos, {
            as: 'medios_de_pagos',
            foreignKey: 'id_medio_pago'
        });
    };

    return MediosDePagos;
};
