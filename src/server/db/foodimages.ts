import { Query } from './index';
import { MySQL_Res } from '../../../utilities';
import { FoodImages } from '../../../types';

//Get all journals with their corresponding authors
const GetFoodImages = async (userid: FoodImages['userid']) => Query(`SELECT * FROM FoodImages WHERE userid = ?`, [userid])
//Get Todays Exercises
const GetTodaysFoodImages = async (userid: FoodImages['userid']) => Query(`SELECT * FROM FoodImages WHERE userid = ? AND created >= NOW() - INTERVAL 1 DAY`, [userid])
//Get A Days Exercises
const GetADaysFoodImages = async (userid: FoodImages['userid'], created: FoodImages['created']) => Query(`SELECT * FROM FoodImages WHERE userid = ? AND created >= ? - INTERVAL 1 DAY AND created <= ? + INTERVAL 1 DAY`, [userid, created, created])
//Get a journal with it's corresponding author
const GetFoodImage = async (imageid: FoodImages['imageid'], userid: FoodImages['userid']) => Query(`SELECT * FROM FoodImages WHERE userid = ? AND imageid = ?`, [userid, imageid])
//Create a journal
const CreateFoodImage = async (userid: FoodImages['userid'], imagename: FoodImages['imagename'], image: FoodImages['image']) => Query(`INSERT INTO FoodImages (userid, imagename, image ) VALUES (?, ?, ?)`, [userid, imagename, image])
//Update a journal
const UpdateFoodImage = async (userid: FoodImages['userid'], imageid: FoodImages['imageid'], imagename: FoodImages['imagename'], image: FoodImages['image']) => Query(`UPDATE FoodImages SET ( imagename, image ) VALUES (?, ?) WHERE imageid = ? AND userid = ?`, [imagename, image, imageid, userid])
//Delete a journal
const DeleteFoodImage = async (userid: FoodImages['userid'], imageid: FoodImages['imageid']) => Query('DELETE FROM FoodImages WHERE imageid = ? and userid = ?', [imageid, userid])

export default {
    GetFoodImages,
    GetTodaysFoodImages,
    GetADaysFoodImages,
    GetFoodImage,
    CreateFoodImage,
    UpdateFoodImage,
    DeleteFoodImage
}