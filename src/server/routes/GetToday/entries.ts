import * as express from 'express';
import db from '../../db';
import { MySQL_Res } from '../../../../utilities';
import { ReqUser } from '../../../../types'
import { tokenCheck } from '../../middleware/auth.mw';

let router = express.Router()

router.get('/:id?', tokenCheck, async (req: ReqUser, res, next) => {
    try {
        let userid = req.user.id;
    let entryid = Number(req.params.id);

    if (!isNaN(entryid)) {
        let thisEntry = await db.entries.GetEntry(entryid, userid)
        res.json(thisEntry)
    } else {
        let allEntries = await db.entries.GetTodaysEntries(userid)
        res.json(allEntries)
    }   
    } catch (error) {
        next(error)
    } 
})

router.post('/', tokenCheck, async (req: ReqUser, res, next) => {
    try {
        let userid = req.user.id
    let body = req.body
    let thisEntry = await db.entries.CreateEntry(userid, body.date, body.notes, body.journal, body.water, body.todaysworkout, body.entry)
    res.json(thisEntry)
    } catch (error) {
        next(error)
    } 
})

router.put('/:id', tokenCheck, async (req: ReqUser, res, next) => {
    try {
        let entryid = Number(req.params.id);
    let userid = req.user.id
    let body = req.body
    let entries = await db.entries.GetEntry(entryid, userid)

    if(Object.keys(entries).length === 0) {
        res.sendStatus(404);
        return
    }
    let updatedRes = await db.entries.UpdateEntry(entryid, userid, body.date, body.notes, body.journal, body.water, body.todaysworkout, body.entry)
    res.json(updatedRes)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', tokenCheck, async (req: ReqUser, res, next) => {
    try {
        let entryid = Number(req.params.id);
    let userid = req.user.id;
    let deletedRes = await db.entries.DeleteEntry(entryid, userid);
    res.json(deletedRes)
    } catch (error) {
        next(error)
    }
});

export default router;