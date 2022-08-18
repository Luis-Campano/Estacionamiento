const nodemailer = require('nodemailer');
require('dotenv').config();


exports.notificationEmail = async (name, email) => {
   
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
    mensaje += 'Usted ha sido registrado al Estacionamiento "Cuchao"<br>';
    mensaje += '¡Gracias por confiar en nosotros!';
    let info = await transporter.sendMail({
        //your_email_smtp
      from: 'Estacionamiento <sandra.salas19@utim.edu.mx>',//sender address your_email_smtp
      to: `${name}<${email}>`, // list of receivers: Juan Pérez<juan@algo.com>
      subject: "Bienvenido", // Subject line
      html: mensaje, // html body
    });

    console.log("Message sent: %s", info.messageId);

    return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};