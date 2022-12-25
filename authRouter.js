const Router = require('express');
const router = new Router();
const controller = require("./authController");
const {check} = require("express-validator");
const authMiddleware = require('./middlewares/authMiddleware');
const roleMiddleware = require('./middlewares/roleMiddleware');

router.post('/registration', controller.registation);
router.post('/login', controller.login);

router.get('/users', roleMiddleware(['USER', 'ADMIN']), controller.getUsers);
router.get('/main', controller.downloadMainPage);
router.get('/login', controller.downloadLoginPage);
router.get('/registration', controller.downloadRegistrationPage);

module.exports = router;