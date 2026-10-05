const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Servir la interfaz del juego
app.use(express.static(__dirname));

// Lógica de las salas online del juego
io.on('connection', (socket) => {
    console.log('Un jugador se ha conectado');

    socket.on('crearSala', () => {
        const codigoSala = Math.random().toString(36).substring(2, 7).toUpperCase();
        socket.join(codigoSala);
        socket.emit('salaCreada', codigoSala);
    });

    socket.on('unirseSala', (codigo) => {
        socket.join(codigo);
        io.to(codigo).emit('jugadorUnido', '¡Un amigo se ha unido a la sala!');
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
