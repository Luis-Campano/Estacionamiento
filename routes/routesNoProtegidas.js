const express = require('express');

const router = express.Router();

const sesionController = require('../controllers/Users/sesionController');
const userController = require('../controllers/Users/userController');

module.exports = function() {
  // rutas que no requieren autenticacion
  router.post('/login', sesionController.login);
  router.post('/signup', userController.add);
 
  return router;
};