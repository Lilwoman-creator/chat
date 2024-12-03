const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Criação do aplicativo Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve os arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// Quando um cliente se conecta
io.on('connection', (socket) => {
  console.log('Usuário conectado');

  // Define o nickname do usuário como 'Anônimo' por padrão
  socket.nickname = 'Anônimo';

  // Evento para atualizar o nickname
  socket.on('set nickname', (nickname) => {
    socket.nickname = nickname;
    console.log(`Nickname alterado para: ${nickname}`);
  });

  // Quando uma mensagem é enviada
  socket.on('chat message', (msg) => {
    // Emite a mensagem para todos os clientes conectados
    io.emit('chat message', {
      nickname: socket.nickname,
      text: msg
    });
  });

  // Quando o usuário se desconecta
  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });
});

// Porta que o servidor irá rodar
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
