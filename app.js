import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';

import { config } from './config.js';
import authRouter from './router/auth.js';
import tweetsRouter from './router/tweets.js';
import { initSocket } from './socket/socket.js';

const app = express();

// middlewares
app.use(express.json());
app.use(morgan('tiny'))
app.use(helmet())
app.use(cors())

// tweets
app.use('/tweets', tweetsRouter);
// auth
app.use('/auth', authRouter);

// test
app.get('/', (req, res, next) => {
    res.send('a');
});

// error
app.use((err, req, res, next) => {
    console.error(err);
    res.sendStatus(500);
});
app.use((req, res, next) => {
    res.sendStatus(404);
});

// 
const server = app.listen(config.host.port);
initSocket(server);
