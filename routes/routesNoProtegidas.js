const express = require('express');

const router = express.Router();

const sesionController = require('../controllers/Users/sesionController');
const passwordController = require('../controllers/passwordController');

module.exports = function() {
  // rutas que no requieren autenticacion
  //Solo se contara con la ruta de login.
  router.post('/login', sesionController.login);
  //Ruta de recuperación de contraseña.
    router.post('/recuperar-password', passwordController.resetearPassword);
    router.post('/validar-token', passwordController.validarToken);
    router.post('/actualizar-password', passwordController.guardarNuevoPassword);
  return router;
};