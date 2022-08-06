import mongoose from "mongoose";
const { Schema } = mongoose;
import validator from 'validator';

const contactSchema = new Schema({
    fname:  {
        type:String, // String is shorthand for {type: String}
        required:true,
        trim:true,
        minLength:2
    },
    lname:  {
        type:String, // String is shorthand for {type: String}
        required:true,
        trim:true,
        minLength:2
    },
    email:{
        type:String,
        unique:true,
        validate: (val)=>{
            if(!validator.isEmail(val)){
                throw new Error(`invalid email ${val}`);
            }
        }
    },
    subject:  {
        type:String, // String is shorthand for {type: String}
        required:true,
        trim:true,
        minLength:5,
        maxLength:15
    },
    contact_message:  {
        type:String, // String is shorthand for {type: String}
        required:true,
        trim:true,
        minLength:10,
        maxLength:300
    }  
});

//compile model from the schema
const Contact = mongoose.model('contact', contactSchema);
export { Contact };
