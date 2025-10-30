




const formatearRespuesta = (req, res, next) => {
    // Debug: confirmar que el middleware se ejecuta en cada petición
    // console.log('[middleware] formatearRespuesta ejecutado para', req.method, req.originalUrl);
    res.success = (status, message, data = []) => {
        res.status(status).json({
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