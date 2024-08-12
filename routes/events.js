/*
    Rutas de Eventos / events
    host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

const router = Router();

// Todas las peticiones de aca abajo tienen que pasar la validación de JWT
router.use( validarJWT );

// Obtener eventos
router.get('/', getEventos);

// Crear eventos
router.post('/', 
    [
        check( 'title', 'El titulo es obligatorio').not().isEmpty(),
        check( 'start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check( 'end', 'La fecha de fin es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento);

// Actualizar eventos
router.put('/:id', actualizarEvento);

// Borrar eventos
router.delete('/:id', eliminarEvento);

module.exports = router;