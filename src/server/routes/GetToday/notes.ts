import * as express from 'express';
import db from '../../db';
import { MySQL_Res } from '../../../../utilities';
import { ReqUser } from '../../../../types'
import { tokenCheck } from '../../middleware/auth.mw';

let router = express.Router()

router.get('/:id?', tokenCheck, async (req: ReqUser, res, next) => {
    try {
        let userid = req.user.id;
    let noteid = Number(req.params.id);

   

    if (!isNaN(noteid)) {
        let thisNote = await db.notes.GetNote(noteid, userid)
        res.json(thisNote)
    } else {
        let allNotes = await db.notes.GetTodaysNotes(userid)
        console.log('hit get')
        res.json(allNotes)
        console.log(allNotes)
    }   
    } catch (error) {
        next(error)
    } 
})

router.post('/', tokenCheck, async (req: ReqUser, res, next) => {
    try {
        let userid = req.user.id
    let body = req.body
    let thisNote = await db.notes.CreateNote(userid, body.topic, body.content)
    res.json(thisNote)
    } catch (error) {
        next(error)
    } 
})

router.put('/:id', tokenCheck, async (req: ReqUser, res, next) => {
    try {
        let noteid = Number(req.params.id);
    let userid = req.user.id
    let body = req.body
    let notes = await db.notes.GetNote(noteid, userid)

    if(Object.keys(notes).length === 0) {
        res.sendStatus(404);
        return
    }
    let updatedRes = await db.notes.UpdateNote(noteid, userid, body.topic, body.content)
    res.json(updatedRes)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', tokenCheck, async (req: ReqUser, res, next) => {
    try {
        let noteid = Number(req.params.id);
    let userid = req.user.id;
    let deletedRes = await db.notes.DeleteNote(noteid, userid);
    res.json(deletedRes)
    } catch (error) {
        next(error)
    }
});

export default router;