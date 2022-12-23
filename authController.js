const User = require('./models/User');
const Role = require('./models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const validator = require("email-validator");
const {secret} = require("./config");

const generateAccessToken = (id, roles) => {
    const payload = {
        id, 
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"});
}

class authController {
    async registation(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({message: "Ошибка при регистрации", errors});

            const {username, email, password, passwordAgain} = req.body;

            if (!validator.validate(email)) return res.status(400).json({message: "Некорректно введена почта"});

            const candidate = await User.findOne({email});

            if (candidate) return res.status(400).json({message: "Пользователь с такой почтой уже существует"});

            if (!(password === passwordAgain)) return res.status(400).json({message: "Пароли не совпадают"});
        
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"});

            const user = new User({username, email, password: hashPassword, roles: [userRole.value]});
            await user.save();

            return res.redirect("login");
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Registation error'});
        }
    }

    async login(req, res) {
        try {
            const email = req.body.login_email; 
            const password = req.body.login_password;

            const user = await User.findOne({email});
            
            if (!user) return res.status(400).json({message: `Пользователь ${email} не найден`});
            
            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword) return res.status(400).json({message: 'Введён неправильный пароль'});
            
            const token = generateAccessToken(user._id, user.roles);
            return res.redirect('main');
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Login error'});
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async downloadMainPage(req, res, next) {
        try {
            res.render('index.html');
        } catch(e) {
            next(e);
        }
    }

    async downloadLoginPage(req, res, next) {
        try {
            res.render('formLogin.html');
        } catch(e) {
            next(e);
        }
    }

    async downloadRegistrationPage(req, res, next) {
        try {
            res.render('formRegistration.html');
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new authController();