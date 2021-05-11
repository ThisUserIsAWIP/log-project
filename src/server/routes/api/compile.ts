import * as express from 'express';
import db from '../../db';
import { MySQL_Res } from '../../../../utilities';
import { ReqUser } from '../../../../types'
import { tokenCheck } from '../../middleware/auth.mw';

let router = express.Router()

router.get('/:id?', tokenCheck, async (req: ReqUser, res, next) => {
    try {
        let insertid = Number(req.params.insertid)
        let userid = req.user.id;
    let exerciseid = Number(req.params.exerciseid);

    
        let allUserData = await db.compile.GetAllThisUsersData(userid)
        console.log(allUserData)
        res.json(allUserData)
        
    } catch (error) {
        next(error)
    } 
})

export default router;