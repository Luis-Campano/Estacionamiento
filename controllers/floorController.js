
const res = require('express/lib/response');
const { Op } = require("sequelize");
const { Floor } = require('../models');
const { Vehicle } = require('../models');
const { Type } = require('../models');
const { Customer } = require('../models');
//post 
exports.add = async (req, res, next) => {
  try {
    const floorData = { ...req.body };
    const floor = await Floor.create(floorData);
    res.status(200).json({
      message: "Nueva planta registrada",
      floor,
    });
    console.log(floor);
  } catch (error) {
    console.log(error);
    let errores = [];
    if (error.errors) {
      errores = error.errors.map((errorItem) => ({
        error: errorItem.message,
        field: errorItem.path,
      }));
    }
    res.status(400).json({
      message: 'Error al leer las Cliente',
      error: errores,
    });
  }
};

//get
exports.list = async (req, res, next) => {
  try {
    const floor = await Floor.findAll({
      //include: ['vehicles'],
      include: [{
        model: Type,
        as:'types',
        include: [{
          model: Vehicle,
          as:'vehicles', 
          include: [{
            model: Customer,
            as:'customers',
          }]
        }]
      }]
    });
    res.json(floor);
    console.log(floor);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error al buscar planta',
    });
   
  }
};

//get
exports.show = async (req, res, next) => {
  try {
    const floor = await Floor.findOne({
      where: { id: req.params.id },
      include: [{
        model: Type,
        as:'types',
        include: [{
          model: Vehicle,
          as:'vehicles', 
          include: [{
            model: Customer,
            as:'customers',
          }]
        }]
      }]
    });
    if(!floor) {
      res.status(404).json({message:'No se encontro la planta'});
  } else {
      res.status(200).json(floor);
  }
  } catch (error) {
    res.status(400).json({
      message: 'Error al leer planta',
    });
  }
};

//delete
exports.delete = async (req, res, next) => {
  try {
    const floor = await Floor.destroy({
      where: {
        id: req.params.id,
      }
    });
    if(!floor){
      res.status(404).json({
        message: 'planta no encontrada',
      })
    }else {
      res.status(200).json({
        message: 'planta eliminada',
      });
    }
  } catch (error) {
    res.status(400).json({
      message: 'Error al eliminar planta',
    });
  }
};

//put
exports.update = async (req, res, next) => {
  try {
    const actualizaFloor = { ...req.body };
    await Floor.update(actualizaFloor, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      message: "Planta actualizada",
    });

  } catch (error) {
    let errores = [];
    if (error.errors) {
      errores = error.errors.map((errorItem) => ({
        error: errorItem.message,
        field: errorItem.path,
      }));
    }
    res.status(400).json({
      message: "Error al actualizar Planta",
      error: errores,
    });
  }
};


//Busqueda de usuarios.
exports.search =  async (req, res, next) => {
  try {
    console.log(req.query);
    const floor = await Floor.findAll({
      where: {
        [Op.or]: [
          {
              name:{
                [Op.like]:  `%${req.query.q.toLowerCase()}%`
              },
          },
        ]
      },
    }); 
    const busqueda = floor;
    if(busqueda=='') {
      res.status(404).json({
        message:'Sin resultados de búsqueda'
      });
    } else {
      res.status(200).json({busqueda});
    }
    console.log(floor);


  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Error al buscar planta',
    });
  }
};
