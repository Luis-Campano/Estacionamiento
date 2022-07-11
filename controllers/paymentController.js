const { intervalToDuration } = require('date-fns/intervalToDuration')

const { Payment } = require('../models');
const { Vehicle } = require('../models');
const { Registration } = require('../models');
const { Type } = require('../models');
 
//ADD
exports.add = async (req, res, next) => {
    try {
          //Codigo de practica
      // si fuese a calcular la tarifa, hacer las operaciones
      // tomar la fecha y hora de entrada y la feca y hora actual
      const distanceTime = intervalToDuration({
        start: vehicle.createdAt,
        end: new Date(),
      });
      //distanceTime tiene> years, months, days, hours, minutes 
      // tomar las horas y minutos
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
      let rateAmount = distanceTime.hours * rate.quota;
      if (distanceTime.minutes >= rate.tolerance) {
        // aumentas una unidad por tarifa
        rateAmount += rate.quota;
        totalTime += 1;
      }
          
      res.json({ ...vehicle, totalTime, rateAmount });

        const pago = await Payment.create(vehicle);
        res.json({
            message: "Pagpo registrado",
            registration,
        });
        console.log(pago);
        } catch (error) {
        let errores = [];
        if (error.errors) {
        
            errores = error.errors.map((errorItem) => ({
            error: errorItem.message,
            field: errorItem.path,
            }));
        }
        
        console.log(error);
        res.status(500).json({
            message: 'Error al registrar pago',
            errors: errores,
        });
        }
    };
//UPDATE

exports.update = async (req, res, next) => {
    try {
        const pagoData = { ...req.body };
        await Payment.update(pagoData, {
            where: { 
                id: req.params.id 
            },
        });
        res.json({
            message: "Pago actualizado."
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
            message: 'Error al buscar pago',
            errors: errores,
        });
        console.log(error);
        }
    };
//LIST

exports.list = async (req, res, next) => {
    try {
        const pagos = await Payment.findAll({
            include: [{
                model: Registration,
                as:'registrations',
                include: [{
                    model: Vehicle,
                    as:'vehicles',
                    include: [{
                        model: Type,
                        as:'types'
                    }]
                }]
            }]
        });
        if(!pagos) {
            return res.status(404).json({
                message:'No se encontraron pagos'
            });
        } 
            res.json(pagos);
            console.log(pagos);
        } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error al buscar Pagos',
        });
        
        }
    };
//SHOW

exports.show = async (req, res, next) => {
    try {
        const pago = await Payment.findOne({
            where: { id: req.params.id },
                include: [{
                    model: Registration,
                    as:'registrations',
                    include: [{
                        model: Vehicle,
                        as:'vehicles',
                        include: [{
                            model: Type,
                            as:'types'
                        }]
                    }]
                }]
            });
       
        if(!pago) {
            return res.status(404).json({
                message:'No se encontro el pago'
            });
        }
        console.log("Esto lleva pago: " +pago);
        res.json(pago);
        } catch (error) {
            console.log(error);
        res.status(500).json({
            message: 'Error al leer pago',
        });
        }
    };
//DELETE
//No sera contemplada. ya que los registros no seran eliminados