const bcrypt = require('bcrypt');
const { User } = require('../../models');

exports.add = async (request, response, next) => {
    try {
      // validar que venga la contraseña
      if (!request.body.password) {
        response.status(400).json({ message: 'La contraseña es obligatoria.'});
        next();
      }
  
      const datosUsuario = {...request.body};
  
      // asegurar la contraseña usar bcrypt
      // salt: generacion de una cadena aleatoria de N longitud
      const salt = await bcrypt.genSalt(10);
  
      // cifrar la contraseña y meterla en los datos del usuario
      datosUsuario.password = await bcrypt.hash(datosUsuario.password, salt);

      
      // registrar el usuario
      const user = await User.create(datosUsuario);
  
      user.password = null; // evitar enviarlo en la respuesta

      response.json({ message: 'El usuario ha sido registrado.', user});
    } catch (error) {
      console.log(error);
    
      let errores = [];
      if (error.errors) {
        errores = error.errors.map( errorItem => ({ 
          campo: errorItem.path,
          error: errorItem.message,
        }));
      }
  
      response.json({ error: true, mensaje: 'Error al registrar el usuario', errores });
    }
  };

  //Mostrar a los usuarios de la tabla.
exports.list = async (req, res, next) => {
  try {
      const user = await User.findAll({});
      res.json(user);
  } catch (error) {
      res.status().json({
          message: 'Error al mostrar usuario',
      });
      
  }
};

//Listar usuarios por ID.
exports.show = async(req, res, next) => {
  try {
      const user = await User.findOne({
         where: {
             id: req.params.id,
         },
      });
      user.password = null;
      if (!user) {
        res.status(404).json({ mensaje: 'No se encontró el usuario.' });
      } else {
        res.json(user);
      }
  } catch (error) {
      res.status(500).json({
          message: "Error al encontrar al usuario.",
      });
  }
};



// mostrar mi perfil
exports.profile = async (req, res, next) => {
  try {
    const usuario = await User.findByPk( req.user.id );
    usuario.password = null;
    if (!usuario) {
      res.status(404).json({ mensaje: 'No se encontró el usuario.' });
    } else {
      res.json(usuario);
    }
  } catch (error) {
    console.log(error);
    response.status(503).json({ mensaje: 'Error al leer el perfil de usuario' });
  }
};