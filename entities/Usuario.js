import sequelize from "../data/db.js";
import { DataTypes } from "sequelize";

// DataTypes.INTEGER → INT
// DataTypes.FLOAT → FLOAT
// DataTypes.TEXT → TEXT
// DataTypes.STRING → VARCHAR


const Usuario = sequelize.define(
    "Usuario",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        apellido: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        correo: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        celular: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        tableName: "usuarios",
        timestamps: true,
        createdAt: true,
        updatedAt: false,
    }
);

export default Usuario;
