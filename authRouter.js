const Router = require('express');
const router = new Router();
const controller = require("./authController");
const {check} = require("express-validator");
const authMiddleware = require('./middlewares/authMiddlewares');

router.post('/registation', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})
], controller.registation);
router.post('/login', controller.login);
router.get('/users', authMiddleware, controller.getUsers);

module.exports = router;