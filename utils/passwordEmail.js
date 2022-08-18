const nodemailer = require('nodemailer');
require('dotenv').config();


exports.passwordEmail = async (name, email, token) => {
    try {
        let transporter = nodemailer.createTransport({
        host: process.env.SERVIDOR_SMTP,
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.USUARIO_SMTP, // generated ethereal user
            pass: process.env.PASSWORD_SMTP, // generated ethereal password
        },
        tls:{
            rejectUnauthorized:
            false,
        },
    });

    let mensaje = `Hola, ${name}<br>`;
    mensaje += 'Has solicitado restaurar tu contraseña, ';
    mensaje += `<a href="http://localhost:3000/restablecer-contrasena/${token}">Haz clic aquí</a><br>`;
    mensaje += 'El enlace es válido sólo por una hora desde su envío.';

    let info = await transporter.sendMail({
      from: 'Luis Campano <luisr.campano19@utim.edu.mx>',//`process.env.NAME_SMTP <{process.env.USUARIO_SMTP}>`, // sender address
      to: `${name}<${email}>`, // list of receivers: Juan Pérez<juan@algo.com>
      subject: "Recuperación de contraseña", // Subject line
      html: mensaje, // html body
    });

    console.log("Message sent: %s", info.messageId);

    return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};