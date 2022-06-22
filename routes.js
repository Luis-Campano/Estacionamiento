const express = require('express');
const router = express.Router();

//importación de controlladores
const customerController = require('./controllers/customerController');
const vehicleController = require('./controllers/vehicleController');

module.exports = () => {

    //Customer
    router.get('/customers', customerController.list);
    router.get('/customer/show/:id', customerController.show);
    router.post('/customer', customerController.add);
    router.put('/customer/update/:id', customerController.update);
    router.delete('/customer/delete/:id', customerController.delete);
    router.get('/customer/search', customerController.search);

    //Vehiculo
    router.get('/vehiculos', vehicleController.list);
    router.get('/vehiculo/show/:id', vehicleController.show);
    router.post('/vehiculo', vehicleController.add);
    router.put('/vehiculo/update/:id', vehicleController.update);
    router.delete('/vehiculo/delete/:id', vehicleController.delete);
    router.get('/vehiculo/search', vehicleController.search);

    return router;
}