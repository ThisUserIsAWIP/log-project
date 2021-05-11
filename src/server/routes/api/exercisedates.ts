import * as express from 'express';
import db from '../../db';
import { MySQL_Res } from '../../../../utilities';
import { ReqUser } from '../../../../types'
import { tokenCheck } from '../../middleware/auth.mw';

let router = express.Router()

router.get('/:id?', tokenCheck, async (req: ReqUser, res, next) => {
    try {
        let userid = req.user.id;
        let created = req.body.selecteddate
        

        let allDailyExercisesDates = await db.dailyexercises.GetDailyExercisesDates(userid)
        console.log('Got Dates')
        res.json(allDailyExercisesDates)
    } catch (error) {
        console.log(error)
    }
})
    export default router;