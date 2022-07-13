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
        });
      //Codigo de practica
      // si fuese a calcular la tarifa, hacer las operaciones
      // tomar la fecha y hora de entrada y la feca y hora actual
      const distanceTime = intervalToDuration({
        start: registration.createdAt,
        end: new Date(),
      });
      //distanceTime tiene> years, months, days, hours, minutes 
      // tomar las horas y minutos
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
      let rateAmount = distanceTime.hours * registration.vehicles.types.floors.rates.quota;
      if (distanceTime.minutes >= registration.vehicles.types.floors.rates.tolerance) {
        // aumentas una unidad por tarifa
        rateAmount += registration.vehicles.types.floors.rates.quota;
        totalTime += 1;
      }
      //Guardar campos en Modelo de payment
      console.log("ID: " +registration.id );
      console.log("PAGO: "+ rateAmount);

      //Guardar pago
      let payment = rateAmount;
      let registrationId= registration.id;

      const pagoData = {payment, registrationId}
      const pago = await Payment.create(pagoData);
        
      //Mostrar resultado
      res.json({ registration, totalTime, rateAmount, pago });
      console.log(registration);
      if(!registration) {
          return res.status(404).json({message:'No se encontro el registro'});
      } 
      } catch (error) {
      res.status(500).json({
          message: 'Error al leer registros',
      });
      }
  };

//Funcion de busqueda.

  
//Busqueda de registro con placa en espesifico.
exports.search =  async (req, res, next) => {
  try {
      console.log(req.query);
    const registration = await Vehicle.findAll({
        where: {
          [Op.or]: [
            {
              lincesPlate: {
                [Op.like]: `%${req.query.q.toLowerCase()}%`
              }
            }
          ]
        },
        include: ['customers',{
          model: Type,
          as:'types', 
          include: [{
            model: Floor,
            as:'floors',
            include : [{
              model: Rate,
              as:'rates',
            }]
          }],   
      }]
    });
    const searchRegistration = registration;
    if(!searchRegistration) {
      return res.status(404).json({
        message:'Sin resultados.'
      });
    }
      res.json({searchRegistration});
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error al buscar información.',
    });
  }
};