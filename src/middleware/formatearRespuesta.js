

const formatearRespuesta = (req, res, next) => {
    // Debug: confirmar que el middleware se ejecuta en cada petición
    // Puedes quitar o comentar este log en producción
    console.log('[middleware] formatearRespuesta ejecutado para', req.method, req.originalUrl);
    res.success = (message, data = []) => {
        res.status(200).json({
            success: true,
            message,
            data,
            error: null,
        });
    };

    res.error = (status, message, error = null) => {
        res.status(status).json({
            success: false,
            message,
            data: [],
            error,
        });
    };

    next();
};

export { formatearRespuesta }