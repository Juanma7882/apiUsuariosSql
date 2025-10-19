import servicesUsuario from "../services/servicesUsuario.js";

const crearUsuario = async (req, res) => {
    try {
        const usuario = req.body
        const { nombre, apellido, correo, celular } = usuario

        // Validación básica
        if (
            !nombre || !nombre.trim() ||
            !apellido || !apellido.trim() ||
            !correo || !correo.trim() ||
            !celular
        ) {
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

        // Sanitización simple
        const usuarioSanitizado = {
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            correo: correo.trim().toLowerCase(),
            celular: celularNum
        };


        const nuevoUsuario = await servicesUsuario.crearUsuario(usuarioSanitizado)
        return res.status(201).json({
            success: true,
            message: "usuario creado correctamente",
            data: nuevoUsuario,
            error: null
        })
    } catch (error) {
        const isDev = process.env.NODE_ENV === "development"
        return res.status(400).json({
            success: false,
            message: "a ocurrido un error al interno", ...(isDev && { error: error.message }),
            data: [],
            error: true
        })
    }
}

const listarUsuarios = async (req, res) => {
    console.log("listar usuarios")
    try {
        const usuarios = await servicesUsuario.listarUsuarios();
        if (!usuarios || usuarios.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No hay  usuarios registradas",
                data: [],
                error: null
            });
        }

        return res.status(200).json({
            success: true,
            message: " usuarios obtenidas correctamente",
            count: usuarios.length,
            data: usuarios,
            error: null
        });
    } catch (error) {
        console.error("Error en obtener usuarios:", error);
        const isDev = process.env.NODE_ENV === "development";
        return res.status(500).json({
            success: false,
            message: "Ocurrió un error obteniendo las  usuarios",
            ...(isDev && { error: error.message }),
            data: null
        });
    }
};


const obtenerUsuarioPorId = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id || !id.toString().trim()) {
            return res.status(400).json({ success: false, message: "ID requerido", data: [], error: true });
        }

        const usuario = await servicesUsuario.obtenerUsuarioPorId(id);
        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado",
                data: [],
                error: true
            });
        }

        return res.status(200).json({
            success: true,
            message: "Usuario obtenido correctamente",
            data: usuario,
            error: null
        });

    } catch (error) {
        console.error("Error en obtener usuarios:", error);
        const isDev = process.env.NODE_ENV === "development";
        return res.status(500).json({
            success: false,
            message: "Ocurrió un error obteniendo las  usuarios",
            ...(isDev && { error: error.message }),
            data: null
        });
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
        const isDev = process.env.NODE_ENV === "development";
        return res.status(500).json({
            success: false,
            message: "Ha ocurrido un error interno",
            ...(isDev && { error: error.message }),
            data: [],
            error: true
        });
    }
};



const eliminarUsuario = async (req, res, next) => {
    console.log("listar usuarios")
    try {
        const eliminado = await servicesUsuario.eliminarUsuario(req.params.id);
        if (typeof res.success === 'function') {
            return res.success("Usuario eliminado correctamente", eliminado);
        }

        // Fallback si el middleware no está montado
        return res.status(200).json({ success: true, message: "Usuario eliminado correctamente", data: eliminado, error: null });
    } catch (error) {
        next(error);
    }
};


// const eliminarUsuario = async (req, res) => {
//     try {
//         const id = req.params.id;
//         if (!id) return res.status(400).json({ success: false, message: "ID requerido", data: [], error: true });

//         const eliminado = await servicesUsuario.eliminarUsuario(id);
//         if (!eliminado) {
//             return res.status(404).json({ success: false, message: "Usuario no encontrado", data: [], error: true });
//         }

//         return res.status(200).json({
//             success: true,
//             message: "Usuario eliminado correctamente",
//             data: eliminado,
//             error: null
//         });

//     } catch (error) {
//         const isDev = process.env.NODE_ENV === "development";
//         return res.status(500).json({
//             success: false,
//             message: "Ha ocurrido un error interno",
//             ...(isDev && { error: error.message }),
//             data: [],
//             error: true
//         });
//     }
// };

export { crearUsuario, listarUsuarios, obtenerUsuarioPorId, actualizarUsuario, eliminarUsuario };


