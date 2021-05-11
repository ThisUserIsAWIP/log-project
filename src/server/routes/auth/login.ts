import { Router } from 'express';
import { compareHash } from '../../../../utilities/passwords';
import { ReqUser, Payload } from '../../../../types';
import db from '../../db';
import { Request } from 'express';
import * as passport from 'passport';
import { authenticate } from 'passport';
import * as jwt from 'jsonwebtoken';
import config from '../../config';

let router = Router();


//
router.post('/', authenticate('local'), async (req: ReqUser, res) => {
    const userLogin = req.user
    console.log(userLogin)
    try {
            const token = jwt.sign({ id: userLogin.id, email: userLogin.email, role: 1},
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