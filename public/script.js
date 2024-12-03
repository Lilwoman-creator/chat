// Conexão com o servidor Socket.io
const socket = io();

// Elementos da página
const messages = document.querySelector('#messages'); // Lista de mensagens
const form = document.querySelector('#chatForm'); // Formulário de envio de mensagem
const inputMessage = document.querySelector('#m'); // Campo de mensagem
const inputNickname = document.querySelector('#nickname'); // Campo de nickname

// Evento para definir o nickname
inputNickname.addEventListener('blur', function() {
  const nickname = inputNickname.value.trim();
  if (nickname) {
    // Envia o nickname para o servidor
    socket.emit('set nickname', nickname);
  }
});

// Evento para enviar a mensagem
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Impede o envio tradicional do formulário
  
  const message = inputMessage.value.trim();
  if (message) {
    // Envia a mensagem para o servidor
    socket.emit('chat message', message);
    inputMessage.value = ''; // Limpa o campo de mensagem após o envio
  }
});

// Quando uma nova mensagem é recebida
socket.on('chat message', function(msg) {
  const item = document.createElement('li'); // Cria um novo item de lista para a mensagem
  item.textContent = `${msg.nickname}: ${msg.text}`; // Exibe o nickname e a mensagem

  messages.appendChild(item); // Adiciona o item à lista de mensagens
  window.scrollTo(0, document.body.scrollHeight); // Rolagem automática para a última mensagem
});
