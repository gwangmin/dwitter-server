import * as tweetModel from '../model/tweet.js';
import * as userModel from '../model/user.js';
import * as socket from '../socket/socket.js';

export function createTweet(req, res, next) {
    const { text } = req.body;
    let tweet = tweetModel.createTweet(text, req.userId);
    tweet = tweetModel.tweetWithUser(tweet);
    res.status(201).json( tweet );
    socket.getSocket().emit('tweets', tweet);
}

export function updateTweet(req, res, next) {
    const id = req.params.id;
    const text = req.body.text;
    let tweet = tweetModel.getTweetById(id);
    if (!tweet)
        return res.status(404).json({ message: `Tweet not found: ${id}` });
    if (tweet.userId !== req.userId)
        return res.sendStatus(403);
    try {
        tweet = tweetModel.updateTweet(id, text);
    } catch(err) {
        return res.status(404).json({ msg: `Tweet id(${id}) not found` });
    }
    tweet = tweetModel.tweetWithUser(tweet);
    res.status(200).json( tweet );
}

export function deleteTweet(req, res, next) {
    const id = req.params.id;
    const tweet = tweetModel.getTweetById(id);
    if (!tweet)
        return res.status(404).json({ message: `Tweet not found: ${id}` });
    if (tweet.userId !== req.userId)
        return res.sendStatus(403);
    tweetModel.deleteTweet(id);
    res.sendStatus(204);
}

export function getTweetsByUsername(req, res, next) {
    const username = req.query.username;
    let tweets = tweetModel.getTweetsByUsername(username);
    if (tweets) {
        tweets = tweets.map((tweet) => tweetModel.tweetWithUser(tweet));
        res.status(200).json( tweets );
    }
    else
        res.status(404).json({ msg: `Tweet (${username}) not found` });
}

export function getTweetById(req, res, next) {
    const id = req.params.id;
    let tweet = tweetModel.getTweetById(id);
    if (tweet) {
        tweet = tweetModel.tweetWithUser(tweet);
        res.status(200).json( tweet );
    }
    else
        res.status(404).json({ msg: `Tweet id(${id}) not found` });
}
