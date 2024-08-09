const { response } = require('express'); // para tener los atajos cuando vas escribiendo

const crearUsuario = (req, res = response ) => {    
    res.json({
        ok: true,
        msg: 'regiser'
    });
}

const loginUsuario = (req, res = response ) => {    
    res.json({
        ok: true,
        msg: 'login'
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