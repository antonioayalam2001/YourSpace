const JWT = require('jsonwebtoken');
const { User } = require('../models/User');
require('dotenv').config();

//UID -> User Identifier lo unico que vamos a almacenar en el Payload
//Podemos almacenar to do lo que queramos
const JsonWebTokenGenerator = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid }
        //process.env.SECRETORPUBLICKEY -> Llave que utilizamos para poder firmar y corroborar que somos nosotros
        JWT.sign(payload, process.env.SECRETORPUBLICKEY, {
            expiresIn: '3h'
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject('Could not generate Token');
            } else {
                resolve(token)
            }
        })
    })
}

const validateJWT = async (token = ' ') => {
    try {
        console.log(token);
        const { uid } = JWT.verify(token, process.env.SECRETORPUBLICKEY);
        const { dataValues } = await User.findByPk(uid);

        if (dataValues) {
            return dataValues;
        } else {
            return null;
        }
    } catch (e) {
        return null;
    }
}


module.exports = { JsonWebTokenGenerator, validateJWT };