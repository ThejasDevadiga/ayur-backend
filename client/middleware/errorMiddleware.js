const notFound = (req,res , next) => {
    res.render('notFound', { title: 'NOT FOUND', message: 'It looks like one of the  developers fell asleep' ,heading:"PAGE NOT FOUND"})
};

const errorHandler = (err,req, res, next) => {
    const statusCode = res.statusCode === 200 ? 400 : res.statusCode;
    console.log(err.message);
    // res.render('notFound', { title: 'ERROR PAGE', message: err.message ,heading:"ERROR FOUND"})
    res.status(statusCode).json({ message: err.message,heading:"ERROR FOUND"})
};

module.exports = { notFound , errorHandler};
