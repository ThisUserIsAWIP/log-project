import * as bcrypt from 'bcrypt';
//function to encrypt a password
export function generateHash(password: string) {
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

//function to compare an incoming password with the one in my SQL
export function compareHash(password: string, hashed: string) {
    return bcrypt.compareSync(password, hashed);
}