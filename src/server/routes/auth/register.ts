import { Router } from 'express';
import { compareHash, generateHash } from '../../../../utilities/passwords';
import db from '../../db';
import { Request } from 'express';
import * as passport from 'passport';
import { authenticate } from 'passport';
import * as jwt from 'jsonwebtoken';
import config from '../../config';

const router = Router();


//
router.post('/', async (req, res) => {
    const newUser = req.body;
    console.log(newUser)
    try {
        newUser.password = generateHash(newUser.password)
            let thisUser = await db.users.CreateUser(newUser.name, newUser.email, newUser.password, newUser.bio)
            const token = jwt.sign({ id: thisUser.insertid, email: thisUser.email, role: 1},
                config.jwt.secret,
                { expiresIn: '30d'}
                );
                res.json(token);
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'my code sucks'});
    }
})

export default router;