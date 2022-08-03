import mongoose from "mongoose";
import { User } from "../models/users.model.js";
//const UserSchema = new mongoose.model('User', User); 
export const create = async(request) => {
    let queryResult = {};
    try{
        const userRecord = new User(request);
        console.log("user record - ",userRecord.domain, userRecord.fullName);
        const docResult = await userRecord.save();
        //const result = await userRecord.insertMany([userRecord]);
        //const result = await User.insertMany(request, {forceServerObjectId: true},{ordered:true});
        queryResult.message = 'user created successfully!';
        queryResult.status = 200;
        queryResult.result = docResult;
    }
    catch(err){
        queryResult.message = 'Error in creating user!';
        queryResult.error = err.message;
        queryResult.status = 401;
    }

    return queryResult;

}//END createOneDocument
