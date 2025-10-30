import servicesUsuario from "../services/servicesUsuario.js";

const crearUsuario = async (req, res) => {
    try {
        const usuario = req.body
        const { nombre, apellido, correo, celular } = usuario

        // sanitizamos los datos
        const usuarioSanitizado = {
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            correo: correo.trim().toLowerCase(),
            celular: Number(celular)
        };

        const nuevoUsuario = await servicesUsuario.crearUsuario(usuarioSanitizado)

        return res.success?.(201, "usuario creado exitosamente", nuevoUsuario) ||
            res.status(201).json({
                success: true,
                message: "usuario creado correctamente",
                data: nuevoUsuario,
                error: null
            })
    } catch (error) {
        next(error)
    }
}


const listarUsuarios = async (req, res) => {
    console.log("listar usuarios")
    try {
        const usuarios = await servicesUsuario.listarUsuarios();
        if (!usuarios || usuarios.length === 0) {
            return res.success(200, "No hay  usuarios registradas", []) ||
                res.status(200).json({
                    success: true,
                    message: "No hay  usuarios registradas",
                    data: [],
                    error: null
                });
        }
        return res.success(200, "usuarios obtenidas correctamente", usuarios) ||
            res.status(200).json({
                success: true,
                message: "usuarios obtenidas correctamente",
                count: usuarios.length,
                data: usuarios,
                error: null
            });

    } catch (error) {
        next(error)
    }
};


const obtenerUsuarioPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await servicesUsuario.obtenerUsuarioPorId(id);

        if (!usuario) {
            return res.success(404, "Usuario no encontrado", []) ||
                res.status(404).json({
                    success: false,
                    message: "Usuario no encontrado",
                    data: [],
                    error: true
                });
        }

        return res.success(404, "Usuario obtenido correctamente", usuario) ||
            res.status(200).json({
                success: true,
                message: "Usuario obtenido correctamente",
                data: usuario,
                error: null
            });

    } catch (error) {
        next(error)
    }


};

const actualizarUsuario = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, apellido, correo, celular } = req.body;

        if (!id) return res.status(400).json({ success: false, message: "ID requerido", data: [], error: true });

        // Validación básica
        if (!nombre || !nombre.trim() || !apellido || !apellido.trim() || !correo || !correo.trim() || !celular) {
            return res.status(406).json({
                success: false,
                message: "Todos los campos son obligatorios",
                data: [],
                error: true
            });
        }

        // Validar formato de correo
        const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correoRegex.test(correo)) {
            return res.status(406).json({
                success: false,
                message: "Correo inválido",
                data: [],
                error: true
            });
        }

        // Validar celular como número positivo
        const celularNum = Number(celular);
        if (isNaN(celularNum) || celularNum <= 0) {
            return res.status(406).json({
                success: false,
                message: "Celular inválido",
                data: [],
                error: true
            });
        }

        const usuarioSanitizado = {
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            correo: correo.trim().toLowerCase(),
            celular: celularNum
        };

        const actualizado = await servicesUsuario.actualizarUsuario(id, usuarioSanitizado);
        if (!actualizado) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado", data: [], error: true });
        }

        return res.status(200).json({
            success: true,
            message: "Usuario actualizado correctamente",
            data: actualizado,
            error: null
        });

    } catch (error) {
        next(error)
    }
};

/**
 * Controlador para eliminar un usuario por su ID.
 *
 * Este endpoint recibe un ID de usuario a través de los parámetros de la URL (`req.params.id`),
 * verifica si el usuario existe en la base de datos y, si es así, lo elimina.
 * En caso de que el usuario no exista, devuelve un mensaje de error formateado.
 *
 * @async
 * @function eliminarUsuario
 * @param {import('express').Request} req - Objeto de solicitud de Express. Debe contener el parámetro `id` en `req.params`.
 * @param {import('express').Response} res - Objeto de respuesta de Express, extendido con los métodos personalizados `res.success` y `res.error` por el middleware `formatearRespuesta`.
 * @param {import('express').NextFunction} next - Función de Express para pasar el control al siguiente middleware en caso de error.
 * @returns {Promise<void>} No devuelve ningún valor directamente; responde al cliente con JSON formateado.
 *
 * @example
 * // DELETE /usuarios/5
 * // Respuesta exitosa:
 * {
 *   "success": true,
 *   "message": "Usuario eliminado correctamente",
 *   "data": { "id": 5, "nombre": "Juan", "correo": "juan@gmail.com" },
 *   "error": null
 * }
 *
 * @example
 * // Si el usuario no existe:
 * {
 *   "success": false,
 *   "message": "Usuario no encontrado",
 *   "data": [],
 *   "error": null
 * }
 */
const eliminarUsuario = async (req, res, next) => {
    try {

        const usuario = await servicesUsuario.obtenerUsuarioPorId(req.params.id)

        if (!usuario) return res.error(404, "Usuario no encontrado");

        const eliminado = await servicesUsuario.eliminarUsuario(req.params.id);

        if (typeof res.success === 'function') {
            return res.success(200, "Usuario eliminado correctamente", eliminado);
        }

        return res.status(200).json({
            success: true,
            message: "Usuario eliminado correctamente",
            data: eliminado,
            error: null
        });
    } catch (error) {
        next(error);
    }
};


export { crearUsuario, listarUsuarios, obtenerUsuarioPorId, actualizarUsuario, eliminarUsuario };


