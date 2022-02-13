import * as userModel from './user.js';

class Tweet {
    id; // string,   트윗 아이디
    text; // string,   트윗 텍스트
    createdAt; // Date,  트윗 생성 날짜
    userId; // string, 유저 아이디

    constructor(text, userid, id=undefined) {
        this.id = id ? id : new Date().toString();
        this.text = text;
        this.createdAt = new Date().toString();
        this.userId = userid;
    }
}

let tweets = [
    new Tweet(
        '드림코더분들 화이팅!', // text
        '1', // userid
        '1', // id
    ),
    new Tweet(
        '안뇽!', // text
        '1', // userid
        '2', // id
    ),
    new Tweet(
        'asd', // text
        '3', // userid
        '3', // id
    ),
];

export function tweetWithUser(tweet) {
    // find
    const { username, name, email, url } = userModel.getUserById(tweet.userId);
    // combine
    const combined = {...tweet, username, name, email, url};
    return combined;
}

/**
 * Create tweet
 * @returns created tweet
 */
export function createTweet(text, userid, id=undefined) {
    const tweet = new Tweet(text, userid, id);
    tweets = [tweet, ...tweets];
    return tweet;
}

/**
 * Get tweet list by username
 * @param {*} username if null, all tweets
 * @returns tweet list by username or all
 */
export function getTweetsByUsername(username) {
    const combined = tweets.map(tweet => tweetWithUser(tweet));
    return username
        ? combined.filter((tweet) => tweet.username === username)
        : combined;
}
/**
 * Get tweet by id
 * @param {*} id id
 * @returns tweet or undefined
 */
export function getTweetById(id) {
    return tweets.find((tweet) => tweet.id === id)
}

/**
 * Update tweet.text
 * @param {*} id tweet
 * @param {*} text new text
 * @returns updated tweet
 */
export function updateTweet(id, text) {
    const tweet = getTweetById(id);
    if (!tweet) {
      throw new Error('tweet not found!');
    }
    tweet.text = text;
    return tweet;
}

/**
 * Delete tweet
 * @param {*} id tweet
 * @returns success?
 */
export function deleteTweet(id) {
    tweets = tweets.filter((tweet) => tweet.id !== id);
    return true;
}
