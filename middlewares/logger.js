const loggerTodo = (req, res, next) => {
    const timenow = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - timenow;
        console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - ${duration} - ${res.statusCode}`);
    })
    next();
}

module.exports = loggerTodo;