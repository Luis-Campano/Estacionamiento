const express = require('express');
const router = express.Router();

//importación de controlladores
const customerController = require('../controllers/customerController');
const vehicleController = require('../controllers/vehicleController');
const typeVehicleController = require('../controllers/typeVehicleController');
const floorController = require('../controllers/floorController');
const userController = require('../controllers/Users/userController');
const rateController = require('../controllers/rateController');
const registrationController = require('../controllers/registrationController');

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
    router.get('/vehiculos/search', vehicleController.search);

    //Tipo Vehiculo
    router.get('/tipos_vehiculos', typeVehicleController.list);
    router.get('/tipo_vehiculo/show/:id', typeVehicleController.show);
    router.post('/tipo_vehiculo', typeVehicleController.add);
    router.put('/tipo_vehiculo/update/:id', typeVehicleController.update);
    router.delete('/tipo_vehiculo/delete/:id', typeVehicleController.delete);
    router.get('/tipos_vehiculos/search', typeVehicleController.search);

    //Planta
    router.get('/plantas', floorController.list);
    router.get('/planta/:id', floorController.show);
    router.post('/planta', floorController.add);
    router.put('/planta/update/:id', floorController.update);
    router.delete('/planta/delete/:id', floorController.delete);
    router.get('/planta/search', floorController.search);

    //tarifa
    router.get('/tarifas', rateController.list);
    router.get('/tarifa/:id', rateController.show);
    router.post('/tarifa', rateController.add);
    //router.put('/planta/update/:id', typeVehicleController.update);
    //router.delete('/planta/delete/:id', typeVehicleController.delete);
    router.get('/tarifa/search', rateController.search);

    //Usuario
    router.get('/users', userController.list);
    router.get('/user/:id', userController.show);

    //Registro
    router.get('/registros', registrationController.list);
    router.get('/registros/:id', registrationController.show);
    router.post('/registro', registrationController.add);

    return router;
}