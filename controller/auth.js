import * as userModel from '../model/user.js';
import { config } from '../config.js';
import jwt from 'jsonwebtoken';

function createJwt(obj) {
    return jwt.sign(obj, config.jwt.secretKey, {
        expiresIn: config.jwt.expires,
    });
}

export function signup(req, res, next) {
    const { username, name, password, email } = req.body;
    const url = req.body.url ?? '';
    let user;
    try {
        user = userModel.createUser(username, name, password, email, url);
    } catch (err) {
        return res.status(409).json({ msg: err.message });
    }
    const token = createJwt({ 'id': user.id });
    res.status(201).json({ token, username });
}

export function login(req, res, next) {
    const { username, password } = req.body;
    let user;
    try {
        user = userModel.checkExists(username, password);
    } catch (err) {
        return res.status(401).json({ msg: 'Invalid username or password' });
    }
    const token = createJwt({ 'id': user.id });
    res.status(200).json({ token, username });
}

/**
 * Check Authorization header and auth
 * middleware
 */
export function auth(req, res, next) {
    const AUTH_ERROR = { msg: 'Authentication error'};

    const authHeader = req.get('Authorization');
    if (!(authHeader && authHeader.startsWith('Bearer '))) {
      return res.status(401).json(AUTH_ERROR);
    }
  
    const token = authHeader.split(' ')[1];
    jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
        if (error)
            return res.status(401).json(AUTH_ERROR);
        const user = userModel.getUserById(decoded.id);
        if (!user)
            return res.status(404).json({ msg: 'User not found' });
        req.userId = user.id; // req.customData
        next();
    });
}

export function me(req, res, next) {
    res.sendStatus(200);
}
