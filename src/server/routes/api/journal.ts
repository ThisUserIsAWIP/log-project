import * as express from 'express';
import db from '../../db';
import { MySQL_Res } from '../../../../utilities';
import { ReqUser } from '../../../../types'
import { tokenCheck } from '../../middleware/auth.mw';

let router = express.Router()

router.get('/:id?', tokenCheck, async (req: ReqUser, res, next) => {
    try {
        let userid = req.user.id;
    let journalid = Number(req.params.id);

    if (!isNaN(journalid)) {
        let thisJournal = await db.journal.GetJournal(journalid, userid)
        res.json(thisJournal)
    } else {
        let allJournals = await db.journal.GetJournals(userid)
        res.json(allJournals)
    }   
    } catch (error) {
        next(error)
    } 
})

router.post('/', tokenCheck, async (req: ReqUser, res, next) => {
    try {
        let userid = req.user.id
    let body = req.body
    let thisJournal = await db.journal.CreateJournal(userid, body.title, body.content)
    res.json(thisJournal)
    } catch (error) {
        next(error)
    } 
})

router.put('/:id', tokenCheck, async (req: ReqUser, res, next) => {
    try {
        let journalid = Number(req.params.id);
    let userid = req.user.id
    let body = req.body
    let journal = await db.journal.GetJournal(journalid, userid)

    if(Object.keys(journal).length === 0) {
        res.sendStatus(404);
        return
    }
    let updatedRes = await db.journal.UpdateJournal(journalid, userid, body.title, body.content)
    res.json(updatedRes)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', tokenCheck, async (req: ReqUser, res, next) => {
    try {
        let journalid = Number(req.params.id);
    let userid = req.user.id;
    let deletedRes = await db.journal.DeleteJournal(journalid, userid);
    res.json(deletedRes)
    } catch (error) {
        next(error)
    }
});

export default router;