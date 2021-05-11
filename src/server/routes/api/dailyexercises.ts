import * as express from 'express';
import db from '../../db';
import { MySQL_Res } from '../../../../utilities';
import { ReqUser } from '../../../../types'
import { tokenCheck } from '../../middleware/auth.mw';

let router = express.Router()

router.get('/:date?', tokenCheck, async (req: ReqUser, res, next) => {
    try {
        console.log('Get exercises hit!')
        let created = String(req.params.date + '%')
        let userid = req.user.id;
        
        console.log(created)
    

      
        let allDailyExercises = await db.dailyexercises.GetDailyExercises(userid, created)
        console.log('Got Exercises')
        console.log(allDailyExercises)
        res.json(allDailyExercises)
    } catch (error) {
        next(error)
    } 
})




router.post('/', tokenCheck, async (req: ReqUser, res, next) => {
    try {
        let userid = req.user.id
    let body = req.body
    console.log(body)
    let thisDailyExercise = await db.dailyexercises.CreateDailyExercise(userid, body.exerciseid, body.completedsets, body.completedreps)
    res.json(thisDailyExercise)
    } catch (error) {
        next(error)
    } 
})

router.put('/:id', tokenCheck, async (req: ReqUser, res, next) => {
    try {
        let exerciseid = Number(req.params.exerciseid);
        let insertid = Number(req.params.insertid)
    let userid = req.user.id
    let body = req.body
    let dailyexercises = await db.dailyexercises.GetDailyExercise(exerciseid, userid, insertid)

    if(Object.keys(dailyexercises).length === 0) {
        res.sendStatus(404);
        return
    }
    let updatedRes = await db.dailyexercises.UpdateDailyExercise(exerciseid, userid, insertid, body.completedsets, body.completedreps)
    res.json(updatedRes)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', tokenCheck, async (req: ReqUser, res, next) => {
    try {
        let insertid = Number(req.params.insertid)
        let exerciseid = Number(req.params.exerciseid);
    let userid = req.user.id;
    let deletedRes = await db.dailyexercises.DeleteDailyExercise(exerciseid, userid, insertid);
    res.json(deletedRes)
    } catch (error) {
        next(error)
    }
});

export default router;