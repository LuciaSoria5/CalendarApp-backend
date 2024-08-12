const express = require('express'); // import express from 'express';
const dotenv = require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Directorio público
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Rutas:   --> localhost:4000/api/auth/loquesea
app.use( '/api/auth', require('./routes/auth') );
// TODO: CRUD: Eventos

// Escuchar peticiones --> process.env.PORT nos sirve para acceder a las variables de entorno
app.listen( process.env.PORT , () => { 
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }.`)
} );
