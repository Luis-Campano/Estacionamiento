# Estacionamiento
Proyecto Cuatrimestral de un Estacionamiento

Enlace AzureDevops
``https://dev.azure.com/sandrasalas19/Estacionamiento``

## Requirements
* Node js
* Git
* Sequelize.
* Server SMTP to notification


## Common setup

Step 1: Clone the repo and install the dependencies.

```bash
git clone https://github.com/Luis-Campano/Estacionamiento.git
cd Estacionamiento
```

Step 2:
```bash
npm install
npm install nodemon --save-dev
```

Step 3: Open `variables.env` and inject your credentials so it looks like this

```
#Variables de entorno.

#Puerto de escucha
NODE_ENV=development,production,test
APP_PORT=your_port

#Conexion BDgit
DB_USER_NAME=root
DB_USER_PWD=your?password
DB_NAME=your?database
DB_HOST=localhost
DB_DIALECT=dialect(mysql)

#Token de contraseña.
TOKEN_SECRET=token_random

#Variables para que se envie el correo al usuario y asi lo recupere
SERVIDOR_SMTP=servicio_smtp
USUARIO_SMTP=your_email_smtp
PASSWORD_SMTP=your_password_smtp

```
## Steps for read-only access
Step 4:
To start the express server, run the following

```bash
npm run dev
```
Step 5: Go to browser
Open [http://localhost:5000](http://localhost:5000) and take a look around.
