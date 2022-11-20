const Router = require('express');
const router = new Router();
const controller = require("./authController");
const {check} = require("express-validator");
const authMiddleware = require('./middlewares/authMiddleware');
const roleMiddleware = require('./middlewares/roleMiddleware');

router.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})
], controller.registation);
router.post('/login', controller.login);

router.get('/users', roleMiddleware(['USER', 'ADMIN']), controller.getUsers);
router.get('/main', controller.downloadMainPage);
router.get('/login', controller.downloadLoginPage);
router.get('/registration', controller.downloadRegistrationPage);

module.exports = router;