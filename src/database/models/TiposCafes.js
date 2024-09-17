module.exports = (Sequelize, DataTypes) => {
    const TiposCafes = Sequelize.define('TiposCafes', {
        id_tipo_cafe: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre_cafe: {
            type: DataTypes.STRING(45),
            allowNull: true
        }
    }, {
        tableName: 'tipos_cafe',
        timestamps: false
    });

    return TiposCafes;
};
