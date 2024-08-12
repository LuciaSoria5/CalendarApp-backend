/*
    Rutas de Eventos / events
    host + /api/events
*/

const { Router } = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events')

const router = Router();

// Todas las peticiones de aca abajo tienen que pasar la validación de JWT
router.use( validarJWT );

// Obtener eventos
router.get('/', getEventos);

// Crear eventos
router.post('/', crearEvento);

// Actualizar eventos
router.put('/:id', actualizarEvento);

// Borrar eventos
router.delete('/:id', eliminarEvento);

module.exports = router;