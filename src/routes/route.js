const { GetMyProfile, ValidateController } = require('../controller/controller');
const { validateMiddleware } = require('../middlewares/validateMiddleware')
const Route = require('express').Router();

Route.get('/', GetMyProfile)
     .post('/validate-rule',validateMiddleware, ValidateController)

module.exports = Route;