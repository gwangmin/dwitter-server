import * as auth from '../controller/auth.js';
import express from 'express';
import 'express-async-errors';

const router = express.Router();

/**
 * POST /auth/signup
 * SignUp
 * req - {
 *     username: string,
 *     name: string,
 *     password: string,
 *     email: string,
 *     url: string
 * }
 * res -
 *     201 { token: string, username: string }
 *     409 { msg }
 */
router.post('/signup', auth.signup);

/**
 * POST /auth/login
 * LogIn
 * req - { username: string, password: string }
 * res -
 *     200 { token: string, username: string },
 *     401 { msg }
 */
router.post('/login', auth.login);

/**
 * GET /auth/me
 * Verify token
 * req - 'Authorization' header
 * res -
 *     200
 *     401 { msg }
 *     404 { msg }
 */
router.get('/me', auth.auth, auth.me);

export default router;
