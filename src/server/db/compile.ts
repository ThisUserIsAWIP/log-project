import { Query } from './index';
import { MySQL_Res } from '../../../utilities';
import { Entries } from '../../../types';

//Get all Entries with their corresponding authors
const GetAllThisUsersData = async (userid: Entries['userid']) => Query(`SELECT u.id, u.username, u.bio, u.email, j.title, j.content, j.journalid, fi.imageid, fi.imagename, fi.image, wi.waterid, wi.water, de.exerciseid AS dailyexerciseid, de.insertid, de.completedsets, de.completedreps, e.exerciseid, e.exercisename, e.exercisedescription, e.demolink, e.requiredequipment, n.noteid, n.topic, n.content
FROM User u
INNER JOIN FoodImages fi
ON u.id = fi.userid
INNER JOIN WaterInput wi
on u.id = wi.userid
INNER JOIN DailyExercises de
on u.id = de.userid
INNER JOIN Exercises e
on u.id = e.userid
INNER JOIN Journal j
on u.id = j.userid
INNER JOIN Notes n
on u.id = n.userid
WHERE u.id = ?`, [userid])


export default {
    GetAllThisUsersData
}