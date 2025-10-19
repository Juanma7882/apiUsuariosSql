import { param, validationResult } from "express-validator";

const validarIdUsuario = [
    param("id").isInt().withMessage("El ID debe ser un número entero"),

    (req, res, next) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Datos inválidos",
                errors: errores.array(),
            });
        }
        next();
    },
];
export { validarIdUsuario }