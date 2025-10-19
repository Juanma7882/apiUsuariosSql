import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.NAME_DATABASE,
    process.env.USER,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        port: process.env.PORT,
        dialect: "mysql", // hay que especificar que base de datos es
    }
);
export default sequelize

// nombreDeLaBase de datos -> nombre de la cuenta -> donde se va conectar -> nombre de la base de datos
// mysql:
// root:admi → usuario y contraseña
// @localhost → host
// :3306 → puerto
// /ecommerce → base de datos




























