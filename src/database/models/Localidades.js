module.exports = (Sequelize, DataTypes) => {
    const Localidades = Sequelize.define('Localidades', {
        id_localidad: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre_loc: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        codigo_postal: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        id_departamento: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        tableName: 'localidades',
        timestamps: false
    });

    Localidades.associate = models => {
        Localidades.hasMany(models.Usuarios, {
            as: 'usuarios',
            foreignKey: 'id_localidad'
        });  
        
        Localidades.belongsTo(models.Departamentos, {
            as: 'departamento',
            foreignKey: 'id_departamento'
        });   
    };

    return Localidades;
};
