import { Query } from './index';
import { MySQL_Res } from '../../../utilities';
import { Note } from '../../../types';

//Get all journals with their corresponding authors
const GetNotes = async (userid: Note['userid']) => Query(`SELECT * FROM Notes WHERE userid = ?`, [userid])
//Get Todays Exercises
const GetTodaysNotes = async (userid: Note['userid']) => Query(`SELECT * FROM Notes WHERE userid = ? AND created >= NOW() - INTERVAL 1 DAY`, [userid])
//Get A Days Exercises
const GetADaysNotes = async (userid: Note['userid'], created: Note['created']) => Query(`SELECT * FROM Notes WHERE userid = ? AND created >= ? - INTERVAL 1 DAY AND created <= ? + INTERVAL 1 DAY`, [userid, created, created])
//Get a journal with it's corresponding author
const GetNote = async (noteid: Note['noteid'], userid: Note['userid']) => Query(`SELECT * FROM Notes WHERE userid = ? AND noteid = ?`, [userid, noteid])
//Create a journal
const CreateNote = async (userid: Note['userid'], topic: Note['topic'], content: Note['content']) => Query(`INSERT INTO Notes (userid, topic, content ) VALUES (?, ?, ?)`, [userid, topic, content])
//Update a journal
const UpdateNote = async (userid: Note['userid'], noteid: Note['noteid'], topic: Note['topic'], content: Note['content']) => Query(`UPDATE Note SET ( topic, content ) VALUES (?, ?) WHERE noteid = ? AND userid = ?`, [topic, content, noteid, userid])
//Delete a journal
const DeleteNote = async (userid: Note['userid'], noteid: Note['noteid']) => Query('DELETE FROM Notes WHERE noteid = ? and userid = ?', [noteid, userid])

export default {
    GetNotes,
    GetTodaysNotes,
    GetADaysNotes,
    GetNote,
    CreateNote,
    UpdateNote,
    DeleteNote
}