const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Puedes cambiar el puerto según tus necesidades

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'tu_host_mysql',
  user: 'tu_usuario_mysql',
  password: 'tu_contraseña_mysql',
  database: 'tu_base_de_datos_mysql'
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    throw err;
  }
  console.log('Conexión a la base de datos establecida');
});

// Analizar las solicitudes con body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Manejar las solicitudes POST para el formulario
app.post('/submit', (req, res) => {
  const { name, email, phone, date, time, people, message } = req.body;

  // Realizar operaciones en la base de datos (aquí deberías ajustar según tu esquema de base de datos)
  const sql = 'INSERT INTO reservas (name, email, phone, date, time, people, message) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, email, phone, date, time, people, message], (err, result) => {
    if (err) {
      console.error('Error al insertar en la base de datos:', err);
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