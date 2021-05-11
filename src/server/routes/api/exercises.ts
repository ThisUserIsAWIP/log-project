import * as express from 'express';
import db from '../../db';
import { MySQL_Res } from '../../../../utilities';
import { ReqUser } from '../../../../types'
import { tokenCheck } from '../../middleware/auth.mw';

let router = express.Router()

router.get('/:id?', tokenCheck, async (req: ReqUser, res, next) => {
    try {
        let userid = req.user.id;
    let exerciseid = Number(req.params.id);

    if (!isNaN(exerciseid)) {
        let thisExercise = await db.exercises.GetExercise(exerciseid, userid)
        res.json(thisExercise)
    } else {
        let allExercises = await db.exercises.GetExercises(userid)
        res.json(allExercises)
    }   
    } catch (error) {
        next(error)
    } 
})

router.post('/', tokenCheck, async (req: ReqUser, res, next) => {
    try {
        let userid = req.user.id
    let body = req.body
    let thisExercise = await db.exercises.CreateExercise(userid, body.exercisename, body.exercisedescription, body.demolink, body.requiredequipment)
    res.json(thisExercise)
    } catch (error) {
        next(error)
    } 
})

router.put('/:id', tokenCheck, async (req: ReqUser, res, next) => {
    try {
        let exerciseid = Number(req.params.id);
    let userid = req.user.id
    let body = req.body
    let exercises = await db.exercises.GetExercise(exerciseid, userid)

    if(Object.keys(exercises).length === 0) {
        res.sendStatus(404);
        return
    }
    let updatedRes = await db.exercises.UpdateExercise(exerciseid, userid, body.exercisename, body.exercisedescription, body.demolink, body.requiredequipment)
    res.json(updatedRes)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', tokenCheck, async (req: ReqUser, res, next) => {
    try {
        let exerciseid = Number(req.params.id);
    let userid = req.user.id;
    let deletedRes = await db.exercises.DeleteExercise(exerciseid, userid);
    res.json(deletedRes)
    } catch (error) {
        next(error)
    }
});

export default router;