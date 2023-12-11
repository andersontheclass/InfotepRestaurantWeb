const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Puedes cambiar el puerto según tus necesidades

// Configuración de nodemailer para el envío de correos electrónicos
const transporter = nodemailer.createTransport({
  host: 'tu_servidor_smtp',
  port: 587,
  secure: false,
  auth: {
    user: 'tu_usuario_smtp',
    pass: 'tu_contraseña_smtp'
  }
});

// Analizar las solicitudes con body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Manejar las solicitudes POST para el formulario de contacto
app.post('/submit', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Configuración del correo electrónico
  const mailOptions = {
    from: email,
    to: 'contact@example.com', // Cambiar con tu dirección de correo electrónico real
    subject: subject,
    text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`
  };

  // Enviar el correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo electrónico:', error);
      res.status(500).send('Error interno del servidor');
      return;
    }

    // Envía la respuesta al cliente
    res.json({ success: true });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});