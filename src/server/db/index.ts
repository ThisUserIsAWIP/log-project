import * as mysql from 'mysql';
import compile from './compile';
import users from './users';
import journal from './journal';
import notes from './notes';
import water from './water';
import foodimages from './foodimages';
import exercises from './exercises';
import dailyexercises from './dailyexercises';
import entries from './entries'
import { MySQL_Res, db } from '../../../utilities';
import config from '../config';
//connect to mysql
export const Connection = mysql.createPool(config.db);

//Query function to interact w/ database
export const Query = <T = any>(query: string, values?:Array<string | number>) => {
    const SQLstring = mysql.format(query, values)
    return new Promise<T>((resolve, reject) => {
        Connection.query(SQLstring, (err, results) => {
        if(err) return reject(err);
        return resolve(results);
        });
    });
}

export default {
    users,
    journal,
    notes,
    water,
    foodimages,
    exercises,
    entries,
    dailyexercises,
    compile
}