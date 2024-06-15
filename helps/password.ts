import bcrypt from 'bcrypt';

const saltRounds = 10;

export function generalPasswordHash(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) reject(err);
            resolve(hash);
        });
    });
}

export function checkPassword(password: string, hash: string) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, function (err, result) {
            if (err) reject(err);
            resolve(result);
        });
    });
}
