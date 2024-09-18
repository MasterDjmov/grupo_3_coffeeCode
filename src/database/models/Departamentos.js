module.exports = (Sequelize, DataTypes) => {
    const Departamentos = Sequelize.define('Departamentos', {
        id_departamento: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre_dpto: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        id_provincia: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'departamentos',
        timestamps: false
    });

    Departamentos.associate = models => {
        Departamentos.hasMany(models.Localidades, {
            as: 'localidades',
            foreignKey: 'id_departamento'
        });
        
        Departamentos.belongsTo(models.Provincias, {
            as: 'provincia',
            foreignKey: 'id_provincia'
        });
    };

    return Departamentos;
};
