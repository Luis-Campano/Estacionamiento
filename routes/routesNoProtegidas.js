const express = require('express');

const router = express.Router();

//const sesionController = require('./controllers/SesionController');
const userController = require('../controllers/userController');
//const passwordController = require('./controllers/PasswordController');

module.exports = function() {
  // rutas que no requieren autenticacion
  router.post('/login', sesionController.login);
  router.post('/signup', userController.add);
  /*
  router.post('/recuperar-password', passwordController.resetPassword);
  router.post('/validar-token', passwordController.validarToken);
  router.post('/actualizar-password', passwordController.guardarNuevoPassword);
*/
  return router;
};