import mongoose from "mongoose";
const { Schema } = mongoose;
import { User } from "../models/users.model.js"

//const UserSchema = new mongoose.model('user', User); 
export const create = async(request) => {
    let queryResult = {};
    try{
        //Create Document
        // const userRecord = new User(request);
        // const result = await userRecord.insertMany([userRecord]);
        const result = await User.insertMany(request, {forceServerObjectId: true},{ordered:true});
        queryResult.message = 'user created successfully!';
        queryResult.status = 200;
        queryResult.result = result;
    }
    catch(err){
        queryResult.message = 'Error in creating user!';
        queryResult.error = err.message;
        queryResult.status = 401;
    }
    return queryResult;
}//END createOneDocument
