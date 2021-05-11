import { Query } from './index';
import { MySQL_Res } from '../../../utilities';
import { Entries } from '../../../types';

//Get all Entries with their corresponding authors
const GetEntries = async (userid: Entries['userid']) => Query(`SELECT * FROM Entries WHERE userid = ?`, [userid])
//Get all of today's Entries
const GetTodaysEntries = async (userid: Entries['userid']) => Query(`SELECT * FROM Entries WHERE userid = ? AND created >= NOW() - INTERVAL 1 DAY`, [userid])
//Get a Entry with it's corresponding author
const GetEntry = async (entryid: Entries['entryid'], userid: Entries['userid']) => Query(`SELECT * FROM Entries WHERE userid = ? AND entryid = ?`, [userid, entryid])
//Create a Entry
const CreateEntry = async (userid: Entries['userid'], date: Entries['date'], notes: Entries['notes'], journal: Entries['journal'], water: Entries['water'], todaysworkout: Entries['todaysworkout'], entry: Entries['entry']) => Query(`INSERT INTO Entry (userid, date, notes, journal, water, todaysworkout, entry ) VALUES (?, ?, ?, ?, ?, ?, ?)`, [userid, date, notes, journal, water, todaysworkout, entry])
//Update a Entry
const UpdateEntry = async (userid: Entries['userid'], entryid: Entries['entryid'], date: Entries['date'], notes: Entries['notes'], journal: Entries['journal'], water: Entries['water'], todaysworkout: Entries['todaysworkout'], entry: Entries['entry']) => Query(`UPDATE Entry SET ( date, notes, journal, water, todaysworkout, entry ) VALUES (?, ?, ?, ?, ?, ?) WHERE entryid = ? AND userid = ?`, [date, notes, journal, water, todaysworkout, entry, entryid, userid])
//Delete a Entry
const DeleteEntry = async (userid: Entries['userid'], entryid: Entries['entryid']) => Query('DELETE FROM Entry WHERE entryid = ? and userid = ?', [entryid, userid])

export default {
    GetEntries,
    GetTodaysEntries,
    GetEntry,
    CreateEntry,
    UpdateEntry,
    DeleteEntry
}