const { response } = require('express'); // para tener los atajos cuando vas escribiendo
const bcrypt = require('bcryptjs');

const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt')

const crearUsuario = async(req, res = response ) => {
    const { email, password } = req.body;
    try {

        // retorna null si no hay otro usuario con ese email, si no devuelve ese usuario
        let usuario = await Usuario.findOne({ email });

        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo.'
            });
        }

        usuario = new Usuario( req.body ); // creamos el usuario

        // encriptar contraseña
        const salt = bcrypt.genSaltSync(); // 10 salts
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        // Generar nuestro JWT (Json Web Token)
        const token = await generarJWT( usuario.id, usuario.name );

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
        });
    }
}

const loginUsuario = async(req, res = response ) => {    
    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ email });

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe.'
            });
        }

        // confirmar password
        const validPassword = bcrypt.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        // Generar nuestro JWT (Json Web Token)
        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
        });
    }
}

const revalidarToken = async (req, res = response ) => {    
    const { uid, name } = req;

    // generar una nueva JWT
    const token = await generarJWT( uid, name );
    
    res.json({
        ok: true,
        token
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}