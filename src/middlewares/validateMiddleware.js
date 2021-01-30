const { schema } = require('../utils/validation');

exports.validateMiddleware = async (req, _, next) => {
    const {error, value} = schema.validate(req.body);

    if(error){
        req.error = error;
    }
    next();
} 