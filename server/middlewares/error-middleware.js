const errorMiddleware = (err , req , res , next) =>{

    const message = err.message || 'BACKEND ERROR';
    const extraDetails = err.extraDetails || "Something went wrong";

    return res.json({message , extraDetails});
}

module.exports = errorMiddleware;