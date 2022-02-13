import { config } from '../config.js';
import bcrypt from 'bcrypt';

class User {
    id; // string, 유저 아이디
    username; // string,   사용자 닉네임 (아이디)
    name; // string,   사용자 이름
    password; // string, 비번
    email; // string, 이메일
    url; // string (optional)  사용자 프로파일 사진 URL

    constructor(username, name, password, email, url=undefined, id=undefined) {
        this.username = username;
        this.name = name;
        this.password = password;
        this.email = email;
        this.url = url ? url : '';
        this.id = id ? id : Date.now().toString();
    }
}

let users = [
    new User(
      'bob', // username
      'Bob', // name
      '$2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm', // password
      'bob@gmail.com', // email
      'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png', // url
      '1', // id
    ),
    new User(
      'ellie', // username
      'Ellie', // name
      '$2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm', // password
      'ellie@gmail.com', // email
      undefined, // url
      '2', // id
    ),
];
createUser('gm','gm',config.gm.pw,'ygm.gwangmin@gmail.com',undefined,'3');

export function createUser(username, name, password, email, url=undefined, id=undefined) {
    const already = getUserByUsername(username);
    if (already)
        throw new Error('username already exists');
    password = bcrypt.hashSync(password, config.bcrypt.saltRounds);
    const user = new User(username, name, password, email, url, id);
    users.push(user);
    return user;
}

export function checkExists(username, password) {
    const user = getUserByUsername(username);
    if (!user)
        throw new Error('username not found');
    const corr = bcrypt.compareSync(password, user.password);
    if (corr)
        return user;
    else
        throw new Error('Invalid password');
}

export function getAllUsers() {
    return users;
}

export function getUserById(id) {
    return users.find((user) => user.id === id);
}

export function getUserByUsername(username) {
    return users.find((user) => user.username === username);
}

function updateUser() {
}

function deleteUser() {
}
