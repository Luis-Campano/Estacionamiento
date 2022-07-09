const express = require('express');

const router = express.Router();

const sesionController = require('../controllers/Users/sesionController');
module.exports = function() {
  // rutas que no requieren autenticacion
  //Solo se contara con la ruta de login.
  router.post('/login', sesionController.login);
  //Ruta de recuperación de contraseña.
  return router;
};