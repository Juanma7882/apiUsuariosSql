import { Router } from "express";
import { validarIdUsuario } from "../middleware/validarCampos.js";
import { crearUsuario, listarUsuarios, obtenerUsuarioPorId, actualizarUsuario, eliminarUsuario } from "../controllers/controllerUsuario.js";

const router = Router();
console.log("[router] usuario.routes.js cargado correctamente");
router.post("/", crearUsuario);
router.get("/", listarUsuarios);

// Obtener un usuario por ID
router.get("/:id", validarIdUsuario, obtenerUsuarioPorId);

// Actualizar un usuario por ID
router.put("/:id", validarIdUsuario, actualizarUsuario);

// Eliminar un usuario por ID
// router.delete("/:id", eliminarUsuario);
router.delete("/:id", validarIdUsuario, eliminarUsuario);

export default router;