const express = require('express');
const router = express.Router();

//importación de controlladores
const customerController = require('./controllers/customerController');

module.exports = () => {

    ////Estados
    router.get('/customer', customerController.list);
    router.get('/customer/show/:id', customerController.show);
    router.post('/customer', customerController.add);
    router.put('/customer/update/:id', customerController.update);
    router.delete('/customer/delete/:id', customerController.delete);
    router.get('/search', customerController.search);

    return router;
}