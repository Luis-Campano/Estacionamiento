const express = require('express'); 
const cors = require ('cors');
const bodyParser = require('body-parser');
const passport = require('passport');



//Importación de variables de entorno.
require('dotenv').config();
require('./middleware/auth');

const db = require('./models');

//Importación de rutas.
const routes = require('./routes/routes');
//Rutas no protegidas
const routesNoProtegidas = require('./routes/routesNoProtegidas');


// conectar la BD
db.sequelize.authenticate()
.then(() => {
  console.log("BD Conectada");
})
.catch((error) => {
  console.log(error);
});

//creación del servidor
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Mensajen en pantalla inicial
app.get('/', (req, res) => {
  res.send('Welcome to the API Estacionamiento, ¡Cuchao!');
});

// cors
app.use(
    cors({
        credentials: true,
        origin: ['*'],
    })
);

//Rutas de acceso.
app.use('/', routesNoProtegidas());
//rutas protegidas
app.use('/', passport.authenticate('jwt', { session: false }), routes());


//Puerto de escuchar.
app.listen(process.env.PORT || 5000, () => {
    console.log("El servidor esta, activo.");
})
// 