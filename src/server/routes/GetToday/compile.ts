import * as express from 'express';
import db from '../../db';
import { MySQL_Res } from '../../../../utilities';
import { ReqUser } from '../../../../types'
import { tokenCheck } from '../../middleware/auth.mw';

let router = express.Router()

router.get('/:selectedDate?', tokenCheck, async (req: ReqUser, res, next) => {
    try {
        let insertid = Number(req.params.insertid)
        let userid = req.user.id;
        console.log(req.params.selectedDate)
        let created = req.params.selectedDate
        console.log(created)

    
        let allUserData = await {
            completedexercises: await db.dailyexercises.GetADaysDailyExercises(userid, created),
            completednotes: await db.notes.GetADaysNotes(userid, created),
            completedjournals: await db.journal.GetADaysJournals(userid, created),
            consumedfood: await db.foodimages.GetADaysFoodImages(userid, created),
            consumedwater: await db.foodimages.GetADaysFoodImages(userid, created),
            addedexercises: await db.exercises.GetADaysExercises(userid, created)
        }
        console.log(allUserData)
        res.json(allUserData)
        
    } catch (error) {
        next(error)
    } 
})

export default router;