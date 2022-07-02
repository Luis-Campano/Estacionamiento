
const res = require('express/lib/response');
const { Op } = require("sequelize");
const { Rate } = require('../models');
const { Vehicle } = require('../models');
//const { Type } = require('../models');

//post 
/*
exports.add = async (req, res, next) => {
  try {
    const rateData = { ...req.body };
    const rate = await Customer.create(rateData);
    res.json({
      message: "Cliente registrado",
      rate,
    });
    console.log(rate);
  } catch (error) {
    console.log(error);
    let errores = [];
    if (error.errors) {
      errores = error.errors.map((errorItem) => ({
        error: errorItem.message,
        field: errorItem.path,
      }));
    }
    res.status(500).json({
      message: 'Error al leer las Tarifa',
      errors: errores,
    });
  }
};
*/
//get
exports.list = async (req, res, next) => {
  try {
    console.log(Vehicle.createAt);

    const rate = await Rate.findAll({
      //include: ['vehicles'],
    });
    res.json(rate);
    console.log(rate);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error al buscar Tarifa',
    });
   
  }
};

//get
exports.show = async (req, res, next) => {
  try {
    console.log(Vehicle.createdAt);
    const rate = await Rate.findOne({
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
    if(!rate) {
      res.status(404).json({message:'No se encontro la Tarifa'});
  } else {
      res.json(rate);
  }
  } catch (error) {
    res.status(500).json({
      message: 'Error al leer Tarifa',
    });
  }
};

//delete
/*
exports.delete = async (req, res, next) => {
  try {
    await Rate.destroy({
      where: {
        id: req.params.id,
      }
    });
    res.status(500).json({
      message: 'Tarifa eliminada',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar Tarifa',
    });
  }
};

//put
exports.update = async (req, res, next) => {
  try {
    const actualizarRate = { ...req.body };
    await Customer.update(actualizarRate, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Tarifa actualizada",
    });

  } catch (error) {
    let errores = [];
    if (error.errors) {
      errores = error.errors.map((errorItem) => ({
        error: errorItem.message,
        field: errorItem.path,
      }));
    }
    res.status(500).json({
      message: "Error al actualizar Tarifa",
      errors: errores,
    });
  }
};
*/

//Busqueda de usuarios.
exports.search =  async (req, res, next) => {
  try {
    console.log(req.query);
    const rate = await Rate.findAll({
      where: {
        [Op.or]: [
          {
              quota:{
                [Op.like]:  `%${req.query.q.toLowerCase()}%`
              },
          },
        ]
      },
    }); 
    const busqueda = rate;
    if(!busqueda) {
      res.status(404).json({
        message:'Sin resultados de búsqueda.'
      });
    } else {
      res.json({busqueda});
    }
    console.log(rate);


  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error al buscar Tarifa',
    });
  }
};






//Operación de Horas
/*
let hoy = new Date();
let diferencia = Vehicle.createAt.getTime() - hoy.getTime();
let horasTranscurridas = diferencia / 1000 / 60 / 60;
res.json(horasTranscurridas);
*/
