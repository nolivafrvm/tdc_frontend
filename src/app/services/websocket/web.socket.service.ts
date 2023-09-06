import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService  {
  constructor(private socket: Socket) {}

  connect() {
    console.log(this.socket);
    this.socket.emit("hola!"); // Reemplaza con la URL de tu servidor WebSocket
  }

  sendMessage(message: string) {
    this.socket.emit('message', message);
  }

  receiveMessage() {
    
    return this.socket.fromEvent('message');
  }
}