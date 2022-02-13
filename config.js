import 'dotenv/config';

function required(key) {
    const value = process.env[key];
    if (value == null)
        throw new Error(`Key ${key} is undefined`);
    return value;
}

export const config = {
    jwt: {
        secretKey: required('JWT_SECRET'),
        expires: required('JWT_EXPIRES'),
    },
    bcrypt: {
        saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS')),
    },
    host: {
        port: parseInt(required('HOST_PORT')),
    },
    gm: {
        pw: required('GM_PW'),
    },
};
