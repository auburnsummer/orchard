// error handler
module.exports = (err, req, res, next) => {
	console.log(err);
	res.status(err.status || 500).json({
		error: true,
		message: err.toString()
	});
};
