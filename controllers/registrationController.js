const res = require('express/lib/response');
const { Op } = require("sequelize");
const { Registration } = require('../models');
const { Vehicle } = require('../models');
const { Customer } = require('../models');


//post 
exports.add = async (req, res, next) => {
    try {
        const registrationData = { ...req.body };
        const registration = await Registration.create(registrationData);
        res.json({
            message: "Nuevo registro",
            registration,
        });
        console.log(registration);
        } catch (error) {
        let errores = [];
        if (error.errors) {
            errores = error.errors.map((errorItem) => ({
            error: errorItem.message,
            field: errorItem.path,
            }));
        }
        res.status(500).json({
            message: 'Error al leer los registros',
            errors: errores,
        });
        console.log(error);
        }
    };

    //get
exports.list = async (req, res, next) => {
    try {
        //console.log(Vehicle.createAt);
        const registration = await Registration.findAll({
            include: [{
                model: Vehicle,
                as:'vehicles', 
                include: [{
                    model: Customer,
                    as:'customers'
                }]
            }]
                    
        });
        res.json(registration);
        console.log(registration);
        } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error al buscar Registros',
        });
        
        }
    };

    //get
exports.show = async (req, res, next) => {
    try {
        
        const registration = await Registration.findOne({
            where: { id: req.params.id },
            /*
                include: [{
                model: Vehicle,
                as:'vehicles', 
                include: [{
                    model: Type,
                    as:'type',
                }]
            }]
            //include: ['vehicles'],
            */
        });
        if(!registration) {
            res.status(404).json({message:'No se encontro el registro'});
        } else {
            res.json(registration);
        }
        } catch (error) {
        res.status(500).json({
            message: 'Error al leer registros',
        });
        }
    };