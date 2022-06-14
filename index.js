const express = require('express'); 

//Importación de variables de entorno.
require('dotenv').config();

//creación del servidor.
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Puerto de escuchar.
app.listen(process.env.APP_PORT, () => {
    console.log("El servidor esta, activo.");
})