import mongoose from "mongoose";
import { User } from "../models/users.model.js";
//const UserSchema = new mongoose.model('User', User); 
export const create = async(request) => {
    let queryResult = {};
    try{
        if(request.hashedPassword !== request.re_pass){
            queryResult.message = 'password not match';
            queryResult.status = 401;
            return queryResult
        } 
        delete request.re_pass;
        delete request.signup;
        const userRecord = new User(request);
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
