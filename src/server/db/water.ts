import { Query } from './index';
import { MySQL_Res } from '../../../utilities';
import { WaterInput } from '../../../types';

//Get all journals with their corresponding authors
const GetWaterInputs = async (userid: WaterInput['userid'], created: WaterInput['created']) => Query(`SELECT * FROM WaterInput WHERE userid = ? AND created LIKE ?`, [userid, created])
//Get A Days Water Input
const GetADaysWaterInputs = async (userid: WaterInput['userid'], created: WaterInput['created']) => Query(`SELECT * FROM WaterInput WHERE userid = ? AND created >= ? - INTERVAL 1 DAY AND created <= ? + INTERVAL 1 DAY`, [userid, created, created])
//Get Todays Water Input
const GetTodaysWaterInputs = async (userid: WaterInput['userid']) => Query(`SELECT * FROM WaterInput WHERE userid = ? AND created >= NOW() - INTERVAL 1 DAY`, [userid])
//Get a journal with it's corresponding author
const GetWaterInput = async (waterid: WaterInput['waterid'], userid: WaterInput['userid']) => Query(`SELECT * FROM WaterInput WHERE userid = ? AND waterid = ?`, [userid, waterid])
//Create a journal
const CreateWaterInput = async (userid: WaterInput['userid'], water: WaterInput['water']) => Query(`INSERT INTO WaterInput (userid, water) VALUES (?, ?)`, [userid, water])
//Update a journal
const UpdateWaterInput = async (userid: WaterInput['userid'], waterid: WaterInput['waterid'], water: WaterInput['water']) => Query(`UPDATE WaterInput SET ( water, content ) VALUES (?) WHERE waterid = ? AND userid = ?`, [water, waterid, userid])
//Delete a journal
const DeleteWaterInput = async (userid: WaterInput['userid'], waterid: WaterInput['waterid']) => Query('DELETE FROM WaterInput WHERE waterid = ? and userid = ?', [waterid, userid])

export default {
    GetWaterInputs,
    GetTodaysWaterInputs,
    GetADaysWaterInputs,
    GetWaterInput,
    CreateWaterInput,
    UpdateWaterInput,
    DeleteWaterInput
}