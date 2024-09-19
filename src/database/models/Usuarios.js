module.exports = (Sequelize, DataTypes) => {
    const Usuarios = Sequelize.define('Usuarios', {
        id_usuario: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        apellido: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        telefono: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        dni: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        imagen_perfil: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        barrio: {
            type: DataTypes.STRING(65),
            allowNull: true
        },
        calle: {
            type: DataTypes.STRING(75),
            allowNull: true
        },
        numero: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        piso: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        departamento: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        id_localidad: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_estado: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        id_rol: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        cuil_t: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        clave: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    }, {
        tableName: 'usuarios',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    Usuarios.associate = models => {
        Usuarios.belongsTo(models.Roles, {
            as: 'rol',
            foreignKey: 'id_rol'
        });

        Usuarios.belongsTo(models.Estados, {
            as: 'estado',
            foreignKey: 'id_estado'
        });

        Usuarios.belongsTo(models.Localidades, {
            as: 'localidad',
            foreignKey: 'id_localidad'
        });
        
        Usuarios.hasMany(models.Carritos, {
            as: 'carritos',
            foreignKey: 'id_usuario'
        });
    };
    return Usuarios;
};
