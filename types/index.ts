import { Request } from 'express';
export interface User {
    id: number,
    username: string,
    email: string,
    password: string,
    bio: string,
    created: string
};
// journal is the basic feature most journaling apps offer, a place to write a journal entry
export interface Journal {
    userid: User['id'],
    journalid: number,
    title: string,
    content: string,
    created: string
};
// notes go above today's journal entry they are on a topic, and can have a text content
// Can be used in class, at work, etc. It will offer a clear chronological order of the growth of your project, or learning experience
export interface Note {
    userid: User['id'],
    noteid: number,
    topic: string,
    content: string,
    created: string
};
// exercises is a list of exercises you've added to your list
// implement a global "get" to create my own DB of user created exercises
// advanced?: like function to order best exercises
export interface Exercise {
    userid: User['id'],
    exerciseid: number,
    exercisename: string,
    exercisedescription: string,
    requiredequipment: string
    created: string
};

// Will compile to "TodaysWorkout" variable in order to be passed into entry
export interface DailyExercise {
    userid: User['id'],
    exerciseid: Exercise['exerciseid'],
    completedexerciseid: number,
    completedsets: number,
    completedreps: number,
    created: string
};

export interface WaterInput {
    userid: User['id'],
    waterid: number,
    water: number,
    created: string
};


//potentially too advanced, commented out until further thought
// export interface FoodInput {
// userid: User['id'],
// food: string, 
// calories: number,

// created: string
// };

//potentially redundant?
// CREATE TABLE BasicInputHistory (
// userid: User['id'],
// basicid: number, 
// // calories: number,
// water: number,
// todaysexercises: string,
// created: datetime default current_timestamp
// );

export interface FoodImages {
    userid: User['id'],
    imageid: number,
    imagename: string,
    image: string,
    created: string
};

export interface Entries {
    userid: User['id'],
    date: string,
    entryid: number,
    notes: string,
    journal: string,
    water: number,
    todaysworkout: string,
    entry: string,
    created: string
};

export interface ReqUser extends Request {
    user?: Payload
}

export interface Payload extends User {
    role?: number
};