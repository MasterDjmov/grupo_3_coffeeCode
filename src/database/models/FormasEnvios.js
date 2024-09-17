module.exports = (Sequelize, DataTypes) => {
    const FormasEnvios = Sequelize.define('FormasEnvios', {
        id_forma_envio: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre_envio: {
            type: DataTypes.STRING(65),
            allowNull: true
        },
        monto_envio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        }
    }, {
        tableName: 'formas_envios',
        timestamps: false
    });

    return FormasEnvios;
};
