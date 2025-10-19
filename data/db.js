import sequelize from "../config/index.js";

//! no lo nesesito porque lo instacion en ../config/index
// const { Sequelize } = require("sequelize");
// const sequelize = new Sequelize(stringDb, {
//     dialect: "mysql",   // <- obligatorio
//     logging: false      // opcional
// });


//! test de conexión
async function probarConexion() {
    try {
        await sequelize.authenticate();
        console.log("✅ Conexión exitosa con la base de datos");
    } catch (error) {
        console.error("❌ Error al conectar:", error.message);
    }
    //  finally {
    //     await sequelize.close();
    // }
}
probarConexion();

export default sequelize;
