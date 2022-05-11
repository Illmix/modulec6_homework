const wsUri = "wss://echo-ws-service.herokuapp.com";
const send_message = document.querySelector('.send_message');
const message = document.querySelector('input');
const output = document.querySelector('.chat');
const send_geo = document.querySelector('.send_geo')
let maplink;
websocket = new WebSocket(wsUri);

function writeToScreen(message, style) {
  let pre = document.createElement("div");
  pre.style.justifyContent = style;
  pre.innerHTML = message;
  output.appendChild(pre);
}

websocket.onmessage = function(evt) {
  if (evt.data !== maplink) {
    writeToScreen('<span>'+evt.data+'</span>', 'flex-start');
  }
  else {
    writeToScreen(`<span><a href='${evt.data}'>${evt.data}</a></span>`, 'flex-start');
  }
  };

send_message.addEventListener('click', () => {
  writeToScreen('<span>'+message.value+'</span>', 'flex-end')
  websocket.send(message.value);
});
const error = () => {
  alert('Ошибка получения геолокации.')
}
const success = (position) => {
  maplink = `https://www.openstreetmap.org/#map=18/${position.coords.latitude}/${position.coords.longitude}`;
  writeToScreen(`<span><a href='${maplink}'>${maplink}</a></span>`, 'flex-end');
  websocket.send(maplink);
}
send_geo.addEventListener('click', () => {
  if (!navigator.geolocation) {
    alert('Geolocation не поддерживается вашим браузером');
  }
  else {
  navigator.geolocation.getCurrentPosition(success, error);
}
});