const express = require('express'); 
const cors = require ('cors');
const db = require('./models')

//Importación de variables de entorno.
require('dotenv').config();

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

// cors
/*app.use(
    cors({
        credentials: true,
        origin: ['http://localhost:5000'],
    })
);
app.use('/', routes());
*/

//Puerto de escuchar.
app.listen(process.env.APP_PORT, () => {
    console.log("El servidor esta, activo.");
})
//correcion