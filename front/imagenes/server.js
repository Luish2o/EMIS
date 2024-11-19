const express = require('express');
const app = express();
const PORT = 5500; // El puerto en el que deseas que tu servidor escuche

// Middleware para permitir solicitudes POST en todas las rutas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Manejar la solicitud POST en la ruta '/index.html'
app.post('/index.html', (req, res) => {
    // Aquí puedes manejar la lógica de la solicitud POST
    res.send('¡Solicitud POST recibida en /index.html!');
});

// Iniciar el servidor
app.post('/', (req, res) => {
    // Manejar la solicitud POST aquí
    res.send('¡Solicitud POST recibida en la raíz del servidor!');
});