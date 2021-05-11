import * as express from 'express';
import db from '../../db';
import { MySQL_Res } from '../../../../utilities';
import { ReqUser } from '../../../../types'
import { tokenCheck } from '../../middleware/auth.mw';

let router = express.Router()

router.get('/:date?', tokenCheck, async (req: ReqUser, res, next) => {
    try {
        let userid = req.user.id;
    let waterid = Number(req.params.id);
    let created = String(req.params.date + '%')
   
        let allWaters = await db.water.GetWaterInputs(userid, created)
        console.log('getWaterHit')
        console.log(allWaters)
        res.json(allWaters)
       
    } catch (error) {
        next(error)
    } 
})

router.post('/', tokenCheck, async (req: ReqUser, res, next) => {
    try {
        let userid = req.user.id
    let body = req.body
    let thisWaterInput = await db.water.CreateWaterInput(userid, body.water)
    res.json(thisWaterInput)
    } catch (error) {
        next(error)
    } 
})

router.put('/:id', tokenCheck, async (req: ReqUser, res, next) => {
    try {
        let waterid = Number(req.params.id);
    let userid = req.user.id
    let body = req.body
    let water = await db.water.GetWaterInput(waterid, userid)

    if(Object.keys(water).length === 0) {
        res.sendStatus(404);
        return
    }
    let updatedRes = await db.water.UpdateWaterInput(waterid, userid, body.water)
    res.json(updatedRes)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', tokenCheck, async (req: ReqUser, res, next) => {
    try {
        let waterid = Number(req.params.id);
    let userid = req.user.id;
    let deletedRes = await db.water.DeleteWaterInput(waterid, userid);
    res.json(deletedRes)
    } catch (error) {
        next(error)
    }
});

export default router;