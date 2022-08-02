import mongoose from "mongoose";
const { Schema } = mongoose;
import validator from 'validator';
import bcrypt  from "bcryptjs"

//By default, Mongoose adds an _id property to your schemas.
const schema = new Schema();
schema.path('_id'); // ObjectId { ... }
//To include virtuals in res.json(), you need to set the toJSON schema option to { virtuals: true }.
const opts = { toJSON: { virtuals: true } };
//Schema with inbuild validation 
export const usersSchema = new Schema({
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
    // full_name:  {
    //     type:String, // String is shorthand for {type: String}
    //     required:true,
    //     trim:true,
    //     minLength:2
    // },
    username:  {
        type:String, // String is shorthand for {type: String}
        required:true,
        trim:true,
        minLength:5,
        maxLength:10
    },
    hashedPassword:  {
        type:String, // String is shorthand for {type: String}
        required:true,
        trim:true,
        minLength:6,
        maxLength:70
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
    address: {
        city: {
            type:String,
            trim:true,
            minLength:2
        },
        state: {
            type:String,
            trim:true,
            minLength:2
        },
        country: {
            type:String,
            trim:true,
            minLength:2
        }
    },
    age:{
        type:Number,
        min:18,
        max:99,
        //This is custom validation
        validate:(val)=>{
            if(val <= 17)
                throw new Error(`minimum age to register is 18`);
        }
    },
    contact:{
        type:Number,
        min:10,
        max:12
    }
//});
},opts);

usersSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

//make collection schema and name it as Users(we have to pass sibngular name it will create plural un mongodb)
//module.exports = mongoose.model(User, usersSchema);
//compile model from the schema
export const User = mongoose.model('User', usersSchema);