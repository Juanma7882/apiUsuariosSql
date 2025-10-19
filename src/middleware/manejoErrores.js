

export const manejadorErrores = (error, req, res, next) => {
    console.error('[Error Handler]', error);

    const isDev = process.env.NODE_ENV === "development";

    // Si el error tiene un status code, úsalo; si no, 500
    const statusCode = error.statusCode || 500;

    res.error(
        statusCode,
        error.message || "Ha ocurrido un error interno",
        isDev ? error.stack : null
    );
};