const { response } = require('express'); // para tener los atajos cuando vas escribiendo


const crearUsuario = (req, res = response ) => {
    const { name, email, password } = req.body;
    res.status(201).json({
        ok: true,
        msg: 'regiser',
        name, 
        email, 
        password
    });
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