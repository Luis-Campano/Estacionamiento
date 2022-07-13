const { Payment } = require('../models');
const { Vehicle } = require('../models');
const { Registration } = require('../models');
const { Type } = require('../models');
 
//Solo mostrar los pagos registrados
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
//SHOW Mostrar los pagos por id
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
        res.json(pago);
        } catch (error) {
            console.log(error);
        res.status(500).json({
            message: 'Error al leer pago',
        });
        }
    };