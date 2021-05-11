import { Query } from './index';
import { MySQL_Res } from '../../../utilities';
import { DailyExercise } from '../../../types';

//Get all journals with their corresponding authors
const GetDailyExercises = async (userid: DailyExercise['userid'], created: DailyExercise['created']) => Query(`SELECT de.created, de.exerciseid, de.insertid, e.exercisename, de.completedsets, de.completedreps, e.exercisedescription, e.requiredequipment, e.demolink 
FROM DailyExercises de 
JOIN Exercises e 
ON de.exerciseid = e.exerciseid 
WHERE de.userid = ?
AND de.created LIKE ?`, [userid, created])
//Get dates where you have exercises
const GetDailyExercisesDates = async (userid: DailyExercise['userid']) => Query(`SELECT DATE_FORMAT(de.created,"%Y-%m-%d") as date_string, de.created, de.exerciseid, e.exercisename, de.completedsets, de.completedreps, e.exercisedescription, e.requiredequipment, e.demolink 
FROM DailyExercises de 
JOIN Exercises e 
ON de.exerciseid = e.exerciseid 
WHERE de.userid = ?
GROUP BY date_string;`, [userid])
//Get daily exercises from last 24 hours
const GetTodaysDailyExercises = async (userid: DailyExercise['userid']) => Query(`SELECT de.exerciseid, e.exercisename, de.completedsets, de.completedreps, e.exercisedescription, de.created, e.requiredequipment, e.demolink 
FROM DailyExercises de 
JOIN Exercises e 
ON de.exerciseid = e.exerciseid 
WHERE de.userid = ?
AND de.created >= NOW() - INTERVAL 1 DAY`, [userid])
//get a days entries
const GetADaysDailyExercises = async (userid: DailyExercise['userid'], created: DailyExercise['created']) => Query(`SELECT de.exerciseid, e.exercisename, de.completedsets, de.completedreps, e.exercisedescription, de.created, e.requiredequipment, e.demolink 
FROM DailyExercises de 
JOIN Exercises e 
ON de.exerciseid = e.exerciseid 
WHERE de.userid = ?
AND de.created >= ? - INTERVAL 1 DAY AND de.created <= ? + INTERVAL 1 DAY`, [userid, created, created])

//Get a journal with it's corresponding author
const GetDailyExercise = async (insertid: DailyExercise['insertid'], userid: DailyExercise['userid'], exerciseid: DailyExercise['exerciseid']) => Query(`SELECT * FROM DailyExercises WHERE userid = ? AND insertid = ? AND exerciseid = ?`, [userid, insertid, exerciseid])
//Create a journal
const CreateDailyExercise = async (userid: DailyExercise['userid'], exerciseid: DailyExercise['exerciseid'], completedsets: DailyExercise['completedsets'], completedreps: DailyExercise['completedreps']) => Query(`INSERT INTO DailyExercises (userid, exerciseid, completedsets, completedreps ) VALUES (?, ?, ?, ?)`, [userid, exerciseid, completedsets, completedreps])
//Update a journal
const UpdateDailyExercise = async (userid: DailyExercise['userid'], insertid: DailyExercise['insertid'], exerciseid: DailyExercise['exerciseid'], completedsets: DailyExercise['completedsets'], completedreps: DailyExercise['completedreps']) => Query(`UPDATE DailyExercise SET ( completedsets, completed reps ) VALUES (?, ?) WHERE insertid = ? AND userid = ? AND exerciseid = ?`, [completedsets, completedreps, insertid, userid, exerciseid])
//Delete a journal
const DeleteDailyExercise = async (userid: DailyExercise['userid'], insertid: DailyExercise['insertid'], exerciseid: DailyExercise['exerciseid']) => Query('DELETE FROM DailyExercise WHERE insertid = ? and userid = ? and exerciseid = ?', [insertid, userid, exerciseid])

export default {
    GetDailyExercises,
    GetDailyExercisesDates,
    GetADaysDailyExercises,
    GetTodaysDailyExercises,
    GetDailyExercise,
    CreateDailyExercise,
    UpdateDailyExercise,
    DeleteDailyExercise
}