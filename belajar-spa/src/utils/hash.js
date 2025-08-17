const crypto = require('crypto');

export function hashPassword(password) {
    const salt = generateSalt();
    const hash = crypto.createHash('sha256').update(password + salt).digest('hex');
    return { hash, salt };
}

export function verifyPassword(inputPassword, storedHash, storedSalt) {
    const hash = crypto.createHash('sha256').update(inputPassword + storedSalt).digest('hex');
    return hash === storedHash;
}

function generateSalt(length = 16) {
    return crypto.randomBytes(length).toString('hex');
}