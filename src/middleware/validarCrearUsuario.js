import { body, param, validationResult } from "express-validator";

// Validaciones al crear un usuario
const validarCrearUsuario = [
    body("nombre")
        .trim()
        .notEmpty().withMessage("El nombre es obligatorio")
        .isLength({ min: 2 }).withMessage("El nombre debe tener al menos 2 caracteres"),

    body("apellido")
        .trim()
        .notEmpty().withMessage("El apellido es obligatorio"),

    body("correo")
        .trim()
        .notEmpty().withMessage("El correo es obligatorio")
        .isEmail().withMessage("El correo no tiene un formato válido"),

    body("celular")
        .notEmpty().withMessage("El celular es obligatorio")
        .isNumeric().withMessage("El celular debe ser un número")
        .custom(value => {
            if (Number(value) <= 0) throw new Error("El celular debe ser un número positivo");
            return true;
        }),

    // Middleware final para devolver los errores si hay alguno
    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(406).json({
                success: false,
                message: "Datos inválidos",
                errors: errores.array(),
            });
        }
        next();
    },
];

export { validarCrearUsuario };
