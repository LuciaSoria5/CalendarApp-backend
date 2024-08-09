
const express = require('express'); // import express from 'express';
const dotenv = require('dotenv').config();

// Crear el servidor de express
const app = express();

// Directorio público
app.use( express.static('public') );

// Rutas:
// app.get('/', (req, res) => {    
//     res.json({
//         ok: true
//     })
// });

// Escuchar peticiones --> process.env.PORT nos sirve para acceder a las variables de entorno
app.listen( process.env.PORT , () => { 
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }.`)
} );
