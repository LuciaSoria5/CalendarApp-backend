const { response } = require('express'); // para tener los atajos cuando vas escribiendo
const Usuario = require('../models/Usuario');

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
        await usuario.save();

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
        });
    }
}

const loginUsuario = (req, res = response ) => {    
    const { email, password } = req.body;
    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    });
}

const revalidarToken = (req, res = response ) => {    
    res.json({
        ok: true,
        msg: 'renew'
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}