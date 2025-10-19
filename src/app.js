import express from "express";
import cors from "cors";
import usuarioRoutes from "./routes/usuario.routes.js";
import { formatearRespuesta } from "./middleware/formatearRespuesta.js";
import { manejadorErrores } from "./middleware/manejoErrores.js"

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Utils
app.use(formatearRespuesta);


// Rutas
app.use("/usuarios", usuarioRoutes);

// Ruta raíz de prueba
app.get("/", (req, res) => {
    res.json({
        message: "¡Servidor funcionando correctamente!",
        api: "Visita /api/usuarios para usar la API"
    });
});

// Manejador de errores
app.use(manejadorErrores);

export default app;