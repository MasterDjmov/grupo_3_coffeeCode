module.exports = (Sequelize, DataTypes) => {
    const Provincias = Sequelize.define('Provincias', {
        id_provincia: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre_provincia: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        id_pais: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'provincias',
        timestamps: false
    });

    Provincias.associate = models => {
        Provincias.hasMany(models.Departamentos, {
            as: 'departamentos',
            foreignKey: 'id_provincia'
        });
    };

    return Provincias;
};
