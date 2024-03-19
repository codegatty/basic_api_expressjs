const errorHandler = (err, req, res, next) => {
    const status = res.statusCode ? res.statusCode : 500;
    switch (status) {
        case 404:
            res.status(404).json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack
            });
            break;

            case 403:
                res.status(403).json({
                    title: "Forbidden",
                    message: err.message,
                    stackTrace: err.stack
                });
                break;
        case 401:
            res.status(401).json({
                title: "Authentication Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case 400:
            res.status(400).json({
                title: "Validation Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case 500:
            res.status(500).json({
                title: "Internal Server Error",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        default:
            break;
    }
}

module.exports = errorHandler;