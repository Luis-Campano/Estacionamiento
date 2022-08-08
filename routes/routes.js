const express = require('express');
const router = express.Router();

/*Importaci[on] de accessCotrol.js*/
const { grantAccess } = require('../middleware/accessControl');

//importación de controlladores
const customerController = require('../controllers/customerController');
const vehicleController = require('../controllers/vehicleController');
const typeVehicleController = require('../controllers/typeVehicleController');
const floorController = require('../controllers/floorController');
const userController = require('../controllers/Users/userController');
const rateController = require('../controllers/rateController');
const registrationController = require('../controllers/registrationController');

//eliminary configuration
const pagoController = require('../controllers/paymentController');
module.exports = () => {

    //Customer
    router.get('/customers', grantAccess('readAny', 'customers'), customerController.list);
    router.get('/customer/show/:id',  grantAccess('readAny', 'customers'), customerController.show);
    router.post('/customer',  grantAccess('createAny', 'customers'), customerController.add);
    router.put('/customer/update/:id', grantAccess('updateAny', 'customers'), customerController.update);
    router.delete('/customer/delete/:id', grantAccess('deleteAny', 'customers'), customerController.delete);
    router.get('/customer/search', grantAccess('readAny', 'customers'),customerController.search);

    //Vehiculo
    router.get('/vehiculos', grantAccess('readAny', 'vehicles'), vehicleController.list);
    router.get('/vehiculo/show/:id', grantAccess('readAny', 'vehicles'), vehicleController.show);
    router.post('/vehiculo', grantAccess('createAny', 'vehicles'), vehicleController.add);
    router.put('/vehiculo/update/:id', grantAccess('updateAny', 'vehicles'), vehicleController.update);
    router.delete('/vehiculo/delete/:id', grantAccess('deleteAny', 'vehicles'), vehicleController.delete);
    router.get('/vehiculos/search', grantAccess('readAny', 'vehicles'), vehicleController.search);

    //Tipo Vehiculo
    router.get('/tipos_vehiculos', grantAccess('readAny', 'types'), typeVehicleController.list);
    router.get('/tipo_vehiculo/show/:id', grantAccess('readAny', 'types'), typeVehicleController.show);
    router.post('/tipo_vehiculo', grantAccess('createAny', 'types'), typeVehicleController.add);
    router.put('/tipo_vehiculo/update/:id', grantAccess('updateAny', 'types'), typeVehicleController.update);
    router.delete('/tipo_vehiculo/delete/:id', grantAccess('readAny', 'types'), typeVehicleController.delete);
    router.get('/tipos_vehiculos/search', grantAccess('readAny', 'types'), typeVehicleController.search);

    //Planta
    router.get('/plantas', grantAccess('readAny', 'floors'), floorController.list);
    router.get('/planta/:id', grantAccess('readAny', 'floors'), floorController.show);
    router.post('/planta', grantAccess('createAny', 'floors'), floorController.add);
    router.put('/planta/update/:id' , grantAccess('updateAny', 'floors'), floorController.update);
    router.delete('/planta/delete/:id', grantAccess('deleteAny', 'floors'), floorController.delete);
    router.get('/planta/search', grantAccess('readAny', 'floors'), floorController.search);

    //tarifa
    router.get('/tarifas', grantAccess('readAny', 'rates'), rateController.list);
    router.get('/tarifa/:id', grantAccess('readAny', 'rates'), rateController.show);
    router.post('/tarifa', grantAccess('createAny', 'rates'), rateController.add);
    router.put('/tarifa/update/:id', grantAccess('updateAny', 'rates'), rateController.update);
    router.delete('/tarifa/delete/:id', grantAccess('deleteAny', 'rates'), rateController.delete);
    router.get('/tarifas/search', grantAccess('readAny', 'rates'), rateController.search);

    //Usuario
    router.post('/signup', grantAccess('createAny', 'users'), userController.add);
    router.get('/users', grantAccess('readAny', 'users'), userController.list);
    router.get('/user/:id', grantAccess('readAny', 'users'), userController.show);

    //Registro
    router.get('/registros', grantAccess('readAny', 'registrations'), registrationController.list);
    router.get('/registro/:id', grantAccess('readAny', 'registrations'), registrationController.show);
    router.post('/registro', grantAccess('createAny', 'registrations'), registrationController.add);
    router.delete('/registro/delete/:id', grantAccess('deleteAny', 'registrations'), registrationController.delete);
    router.get('/search-registrations', grantAccess('readAny', 'registrations'), registrationController.search)

    //Pagos
    router.get('/pagos', grantAccess('readAny', 'payments'), pagoController.list);
    router.get('/pago/:id', grantAccess('readAny', 'payments'), pagoController.show);

    return router;
}