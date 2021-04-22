import { Query } from './index';
import { User } from '../../../types'
import { db } from '../../../utilities'

//find for authentication purposes
const find = async (email: User['email']) => Query(`SELECT * FROM Authors WHERE email = ?`, [email])

const CreateUser = async (username: User['username'], email: User['email'], password: User['password'], bio: User['bio']) => Query(`INSERT INTO Authors ( username, email, password, bio ) VALUES (?, ?, ?, ?)`, [username, email, password, bio]);
export default {
    find
    CreateUser
}