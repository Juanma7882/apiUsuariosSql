import { sync, close } from "../data/db";
import Usuario from "../entities/Usuario"; // Importá tus modelos

async function sincronizar() {
    try {
        await sync({ alter: true });
        console.log("✅ Tablas sincronizadas correctamente");
    } catch (error) {
        console.error("❌ Error al sincronizar:", error.message);
    } finally {
        await close();
    }
}

sincronizar();
