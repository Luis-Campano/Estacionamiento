var intervalToDuration = require('date-fns/intervalToDuration')
//importacion de los modelos.
const db = require('../models');
const res = require('express/lib/response');
const { Op } = require("sequelize");
const { Registration } = require('../models');
const { Vehicle } = require('../models');
const { Customer } = require('../models');
const { Type } = require('../models');
const { Floor } = require('../models');
const { Rate } = require('../models');
const { Payment } = require('../models');


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
    //Atualizar el registro, en caso de ser necesario.
    
exports.update = async (req, res, next) => {
    try {
        const registrationData = { ...req.body };
        await Registration.update(registrationData, {
            where: { 
                id: req.params.id 
            },
        });

        res.json({
            message: "Registro actualizado."
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
        const registration = await Registration.findAll({
            include: [{
                model: Vehicle,
                as: 'vehicles',
                include: [{
                    model: Customer,
                    as: 'customers'
                }],
                include: [{
                    model: Type,
                    as:'types',
                    include: [{
                        model: Floor,
                        as:'floors',
                        include: [{
                            model: Rate,
                            as:'rates',
                            }]
                        }]
                }]
            }]
        });
        if(!registration) {
            return res.status(404).json({message:'No se encontro el registro'});
        } 
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
            include: [{
                model: Vehicle,
                as: 'vehicles',
                include: [{
                    model: Customer,
                    as: 'customers'
                }],
                include: [{
                    model: Type,
                    as:'types',
                    include: [{
                        model: Floor,
                        as:'floors',
                        include: [{
                            model: Rate,
                            as:'rates',
                            }]
                        }]
                }]
            }]
           //include: ['payments']
        });
               //Codigo de practica
      // si fuese a calcular la tarifa, hacer las operaciones
      // tomar la fecha y hora de entrada y la feca y hora actual
      console.log("Hora del registro: "+registration.createdAt)
      const distanceTime = intervalToDuration({
        start: registration.createdAt,
        end: new Date(),
      });
      //distanceTime tiene> years, months, days, hours, minutes 
      // tomar las horas y minutos
      console.log("TIEMPO:");
      console.log(distanceTime);
      // ir por los datos de la tarifa por hora
      const rate = db.Rate.findOne({
        where: {
          type: 'hora'
        }
      });

      // si no esta la tarifa, tirar error

      // la tarifa trae: type, quota

      // calcular la tarifa
      let totalTime = distanceTime.hours;
      console.log("TIEMPO TOTAL")
      console.log(totalTime);
      console.log("Cuata: "+registration.vehicles.types.floors.rates.quota);
      console.log("Tolerancia: "+registration.vehicles.types.floors.rates.tolerance)

      let rateAmount = distanceTime.hours * registration.vehicles.types.floors.rates.quota;
      if (distanceTime.minutes >= registration.vehicles.types.floors.rates.tolerance) {
        // aumentas una unidad por tarifa
        rateAmount += registration.vehicles.types.floors.rates.quota;
        totalTime += 1;
      }
          console.log(rateAmount);
          try {
            const pagoData = {rateAmount}
            const pago = await Payment.create(pagoData);
            
            console.log("Pago registrados"+ pago);
          } catch (error) {
            console.log(error);
          }
      res.json({ registration, totalTime, rateAmount });

        console.log(registration);
        if(!registration) {
            return res.status(404).json({message:'No se encontro el registro'});
        } 
        } catch (error) {
            console.log(error);
        res.status(500).json({
            message: 'Error al leer registros',
        });
        }
    };

//Funcion de busqueda.

  /*
//Busqueda de vehículo.
exports.search =  async (req, res, next) => {
    try {
        console.log(req.query);
      const registros = await Vehicle.findAll({
        include: [{}]
        where: {
          [Op.or]: [
            {
              vehicle.lincesPlate: {
                [Op.like]: `%${req.query.q.toLowerCase()}%`
              }
            }
          ]
        },
      });
      const busqueda = registros;
      if(!busqueda) {
        return res.status(404).json({
          message:'Sin resultados.'
        });
      }
        res.json({busqueda});
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error al buscar información.',
      });
    }
  };*/