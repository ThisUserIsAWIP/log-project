//universally defined types
import { Request } from 'express'

//types errors from mysql
export interface MySQL_Err {
    code?: string;
    errno?: number;
    sqlMessage?: string;
    sqlState?: string;
    index?: number;
    sql?: string;
}
//types success messages from mysql
export interface MySQL_Success {
    fieldCount?: number;
    affectedRows?: number;
    insertId?: number;
    serverStatus?: number;
    warningCount?: number;
    message?: string;
    protocol41?: boolean;
    changedRows?: number;
}
//interface for SQL login credentials
export interface db {
    host: string,
    port: number,
    user: string,
    password: string,
    database: string
}


//A combo typing that way I can just import one with an if/else statement
export type MySQL_Res = MySQL_Success & MySQL_Err;