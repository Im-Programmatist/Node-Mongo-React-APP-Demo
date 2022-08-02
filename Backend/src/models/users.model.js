import mongoose from "mongoose";
const { Schema } = mongoose;
import validator from 'validator';
import bcrypt  from "bcryptjs"

//By default, Mongoose adds an _id property to your schemas.
const schema = new Schema();
schema.path('_id'); // ObjectId { ... }

//Schema with inbuild validation 
const usersSchema = new Schema({
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
    username:  {
        type:String, // String is shorthand for {type: String}
        required:true,
        trim:true,
        minLength:5,
        maxLength:10
    },
    password:  {
        type:String, // String is shorthand for {type: String}
        required:true,
        trim:true,
        minLength:6,
        maxLength:12
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
});

//Define middleware before the model compile then only run it.
//Mongoose middleware - use to process data before store in database
usersSchema.pre("save", function(next) {

    const SALT_WORK_FACTOR = 10; //integer gives us control over what the computing cost of processing the data
    var userRecord = this;
    // only hash the password if it has been modified (or is new)
    if (!userRecord.isModified('password')) return next();
    
    // Make Hash password using bcrypt library - generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(userRecord.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            userRecord.password = hash;
            console.log("user Pasword: ", userRecord.password);
            next();
        });
    });

});

//Define middleware before the model compile then only run it.
usersSchema.post('save', function(doc) {
    console.log('%s has been saved', doc._id);
});
schema.pre('validate', function() {
    console.log('this gets printed first');
});
schema.post('validate', function() {
    console.log('this gets printed second');
});

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