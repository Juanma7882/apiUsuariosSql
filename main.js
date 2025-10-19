// require("./src/app").default;
import app from "./src/app.js";

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📡 API disponible en http://localhost:${PORT}/usuarios/`);
});