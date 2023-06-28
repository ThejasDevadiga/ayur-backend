const notFound = (req,res , next) => {
    const err = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(err);
};

const errorHandler = (err,req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    console.log(err.message);
    // res.render('notFound', { title: 'ERROR PAGE', message: err.message ,heading:"ERROR FOUND"})
    res.status(statusCode).json({ message: err.message,heading:"ERROR FOUND"})
};

module.exports = { notFound , errorHandler};
