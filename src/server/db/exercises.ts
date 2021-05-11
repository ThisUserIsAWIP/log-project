import { Query } from './index';
import { MySQL_Res } from '../../../utilities';
import { Exercise } from '../../../types';

//Get all Exercises with their corresponding authors
const GetExercises = async (userid: Exercise['userid']) => Query(`SELECT * FROM Exercises WHERE userid = ?`, [userid])
//Get the full database of exercises
const GetAllExercises = async () => Query(`SELECT * FROM Exercises`)
//Get Todays Exercises
const GetTodaysExercises = async (userid: Exercise['userid']) => Query(`SELECT * FROM Exercises WHERE userid = ? AND created >= NOW() - INTERVAL 1 DAY`, [userid])
//Get A days added exercises
const GetADaysExercises = async (userid: Exercise['userid'], created: Exercise['created']) => Query(`SELECT * FROM Exercises WHERE userid = ? AND created >= ? - INTERVAL 1 DAY AND created <= ? + INTERVAL 1 DAY`, [userid, created, created])
//Get a Exercise with it's corresponding author
const GetExercise = async (exerciseid: Exercise['exerciseid'], userid: Exercise['userid']) => Query(`SELECT * FROM Exercises WHERE userid = ? AND exerciseid = ?`, [userid, exerciseid])
//Create a Exercise
const CreateExercise = async (userid: Exercise['userid'], exercisename: Exercise['exercisename'], exercisedescription: Exercise['exercisedescription'], requiredequipment: Exercise['requiredequipment'], demolink: Exercise['demolink']) => Query(`INSERT INTO Exercises (userid, exercisename, exercisedescription, requiredequipment, demolink ) VALUES (?, ?, ?, ?, ?)`, [userid, exercisename, exercisedescription, requiredequipment, demolink])
//Update a Exercise
const UpdateExercise = async (userid: Exercise['userid'], exerciseid: Exercise['exerciseid'], exercisename: Exercise['exercisename'], exercisedescription: Exercise['exercisedescription'], requiredequipment: Exercise['requiredequipment'], demolink: Exercise['demolink']) => Query(`UPDATE Exercises SET ( exercisename, exercisedescription, requiredequipment, demolink ) VALUES (?, ?, ?, ?) WHERE exerciseid = ? AND userid = ?`, [exercisename, exercisedescription, requiredequipment, demolink, exerciseid, userid])
//Delete a Exercise
const DeleteExercise = async (userid: Exercise['userid'], exerciseid: Exercise['exerciseid']) => Query('DELETE FROM Exercises WHERE exerciseid = ? and userid = ?', [exerciseid, userid])

export default {
    GetExercises,
    GetTodaysExercises,
    GetADaysExercises,
    GetAllExercises,
    GetExercise,
    CreateExercise,
    UpdateExercise,
    DeleteExercise
}