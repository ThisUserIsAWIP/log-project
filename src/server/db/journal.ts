import { Query } from './index';
import { MySQL_Res } from '../../../utilities';
import { Journal } from '../../../types';

//Get all journals with their corresponding authors
const GetJournals = async (userid: Journal['userid']) => Query(`SELECT * FROM Journal WHERE userid = ?`, [userid])
//Get Todays journals
const GetTodaysJournals = async (userid: Journal['userid']) => Query(`SELECT * FROM Journal WHERE userid = ? AND created >= NOW() - INTERVAL 1 DAY`, [userid])
//Get A Days journals
const GetADaysJournals = async (userid: Journal['userid'], created: Journal['created']) => Query(`SELECT * FROM Journal WHERE userid = ? AND created >= ? - INTERVAL 1 DAY AND created <= ? + INTERVAL 1 DAY`, [userid, created, created])
//Get a journal with it's corresponding author
const GetJournal = async (journalid: Journal['journalid'], userid: Journal['userid']) => Query(`SELECT * FROM Journal WHERE userid = ? AND journalid = ?`, [userid, journalid])
//Create a journal
const CreateJournal = async (userid: Journal['userid'], title: Journal['title'], content: Journal['content']) => Query(`INSERT INTO Journal (userid, title, content ) VALUES (?, ?, ?)`, [userid, title, content])
//Update a journal
const UpdateJournal = async (userid: Journal['userid'], journalid: Journal['journalid'], title: Journal['title'], content: Journal['content']) => Query(`UPDATE Journal SET ( title, content ) VALUES (?, ?) WHERE journalid = ? AND userid = ?`, [title, content, journalid, userid])
//Delete a journal
const DeleteJournal = async (userid: Journal['userid'], journalid: Journal['journalid']) => Query('DELETE FROM Journal WHERE journalid = ? and userid = ?', [journalid, userid])

export default {
    GetJournals,
    GetTodaysJournals,
    GetADaysJournals,
    GetJournal,
    CreateJournal,
    UpdateJournal,
    DeleteJournal
}