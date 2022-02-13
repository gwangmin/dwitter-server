import * as tweet from '../controller/tweets.js';
import * as auth from '../controller/auth.js'
import express from 'express';
import 'express-async-errors';

const router = express.Router();

router.use(auth.auth);

/**
 * POST /tweets
 * [C] Create tweet
 * req - { text: string }
 * res - 201 createdTweet
 */
router.post('/', tweet.createTweet);

/**
 * GET /tweets?username=
 * [R] Get tweets by username
 * res -
 *     200 tweetList
 *     404 { msg }
 */
router.get('/', tweet.getTweetsByUsername);

/**
 * GET /tweets/:id
 * [R] Get tweets by id
 * res -
 *     200 tweet
 *     404 { msg }
 */
router.get('/:id', tweet.getTweetById)

/**
 * PUT /tweets/:id
 * [U] Update tweet
 * req - { text:string }
 * res -
 *     200 updatedTweet
 *     404 { msg }
 *     403
 */
router.put('/:id', tweet.updateTweet);

/**
 * DELETE /tweets/:id
 * [D] Delete tweet
 * res - 204, 403, 404 { msg }
 */
router.delete('/:id', tweet.deleteTweet);

export default router;
