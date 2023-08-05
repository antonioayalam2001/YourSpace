const { where, Sequelize, or, Op } = require("sequelize");
const { db, mysqlDB } = require("../database/config");
const { Post } = require("../models/Post");
const { User } = require("../models/User");
const bcryptjs = require('bcryptjs');
const { JsonWebTokenGenerator } = require('../helpers/jsonWebToken');

async function userExists(body) {
    let { username = "", email = "" } = body;
    username = username.trim();
    email = email.trim();
    const userExists = await User.findOne({
        where: {
            [Op.or]: [{ username }, { email }]
        }
    });
    if (userExists) {
        return { user: userExists, exists: true };
    }
    return {
        user: null,
        exists: false
    };
}

const login = async (req, res) => {
    const { username, password } = req.body;
    const { user, exists } = await userExists(req.body);
    if (!exists) {
        return res.status(400).json({
            ok: false,
            msg: 'User does not exist'
        });
    }
    if (password === undefined || password === null || password === '') {
        return res.status(400).json({
            ok: false,
            msg: 'Password is required'
        });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
        return res.status(400).json({
            ok: false,
            msg: 'Password is incorrect'
        });
    }

    const token = await JsonWebTokenGenerator(user.id);
    const { password: userPass, ...userInfo } = user.dataValues;
    return res.cookie('access_token', token, {
        httpOnly: false,
    }).
        status(201).send({
            ok: true,
            msg: 'Success Registration',
            user: userInfo
        })
};


const register = async (req, res) => {
    const { username, email, password, img = "not found" } = req.body;
    console.log(req.body);

    const { user, exists } = await userExists(req.body);
    if (exists) {
        return res.status(409).json({
            ok: false,
            msg: 'User already exists'
        });
    }

    const passwordHash = bcryptjs.hashSync(password, 10);
    const newUser = await User.create({ username, email, password: passwordHash, img });

    return res.status(201).json({
        ok: true,
        msg: 'Success Registration',
    })
};


const emptyTable = async (req, res) => {
    //Reinciiando contandor de id
    const query = "ALTER TABLE users AUTO_INCREMENT = 1;";
    await mysqlDB.query(query);
    await User.destroy({ where: {} });
    return res.json({
        ok: true,
    });
}

const logout = async (req, res) => {
    res.clearCookie('access_token', {
        sameSite: 'none',
        secure: true
    });
    return res.json({
        ok: true,
        msg: 'Logout successfully'
    });
}

module.exports = {
    register,
    login,
    emptyTable,
    logout
};