// error handler for PK conflicts
module.exports = (err, req, res, next) => {
    if (err.code === '23505') {
        res.status(409).json({
            error: true,
            message: err.toString()
        });
    } else {
        next(err);
    }
}