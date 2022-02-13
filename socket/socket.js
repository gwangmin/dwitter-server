import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

class Socket {
    constructor(serv) {
        this.sock = new Server(serv, {
            cors: {
                origin: '*',
            },
        });

        this.sock.use((s, next) => {
            const token = s.handshake.auth.token;
            if (!token)
                return next(new Error('Auth error'));
            jwt.verify(token, config.jwt.secretKey, (err, decoded) => {
                if (err)
                    return next(new Error('Auth error'));
                next();
            })
        });

        this.sock.on('connection', (s) => {
            console.log('[+] New socket connection');
        });
    }
}

let sock;
export function initSocket(server) {
    if (!sock)
        sock = new Socket(server);
}
export function getSocket() {
    if (sock)
        return sock.sock;
}