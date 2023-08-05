require('dotenv').config();
const JWT = require('jsonwebtoken');
const { User } = require('../models');
/*
*  Inserta al usuario autenticado en nuestro objeto de request
* */
const validateJWT = async (req, res, next) => {
    // console.log(req.headers)
    //Realizando la comprobación mediante el token en la cabecera
    const token = req.session.token || req.headers['x-token']
    //Realizando la comprobación mediante la cookie almacenada en una session
    // const token = req.session.token;
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición :('
        })
    }
    try {
        JWT.verify(token, process.env.SECRETORPUBLICKEY)
        const { uid } = JWT.decode(token, process.env.SECRETORPUBLICKEY);
        //leer usuario que corresponde al uid
        const usuario = await User.findOne({ id: uid });
        if (!usuario) {
            return res.status(401).json({
                msg: "El usuario no existe en la base de Datos"
            })
        }
        //Verificar si el uid no esta dado de baja state : false
        if (!usuario.state) {
            return res.status(401).json({
                msg: "El usuario no esta dado de alta"
            })
        }
        //Estos parametros ya se encuentran en el req todo de aqui en adelante cuenta con ellos

        req.user = usuario;
        req.uid = uid;
        next();
    } catch (e) {
        console.log(e)
        res.status(401).json({
            msg: "Token no valido"
        })
    }

}

module.exports = { validateJWT }
