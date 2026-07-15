const errorHandler = (err,req, res, next) => {
    console.error(err.message);
    res.status(err.statusCode || 404).json({message: err.message || "something went wrong!"});
}
module.exports = errorHandler;