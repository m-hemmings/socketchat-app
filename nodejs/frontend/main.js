document.addEventListener('DOMContentLoaded', () => {
    const socket = io('http://localhost:8001');
  
    const messageForm = document.getElementById('message-form');
    const messageInput = document.getElementById('message-input');
    const messageBox = document.getElementById('message-box');
    const usersBox = document.getElementById('users-box');
  
    const messageTemplate = Handlebars.compile(document.getElementById('message-template').innerHTML);
    const usersTemplate = Handlebars.compile(document.getElementById('users-template').innerHTML);
  
    socket.on('connect', () => {
      console.log('Connected to server');
  
      messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value;
        socket.emit('sendMessage', message);
        messageInput.value = '';
      });
    });
  
    socket.on('message', (message) => {
      const html = messageTemplate({ messages: [message] });
      messageBox.insertAdjacentHTML('beforeend', html);
    });
  
    socket.on('users', (users) => {
      const html = usersTemplate({ users });
      usersBox.innerHTML = html;
    });
  });
  