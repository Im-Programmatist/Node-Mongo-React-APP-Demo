import { usersSchema } from "../models/users.model.js"

/*VIRTUAL*/
//use to compute something on request param which is not stored in mongodb and not present in document.
// THIS VIRTUQAL VALUES ATTACHED TO QUERY RESULT if we set virtual true in Schema, this values not actually present in mongodb doc 
//like if we have firstname and last name then we never make field full name to fill up on user end.
// Create a virtual property `fullName` with a getter and setter.
usersSchema.virtual('fullName').
    get(function() { 
        //this.full_name = `${this.fname} ${this.lname}`;
        return `${this.fname} ${this.lname}`; 
    }).
    set(function(v) {
        console.log("v",v);
        // `v` is the value being set, so use the value to set
        // `firstName` and `lastName`.
        const firstName = v.substring(0, v.indexOf(' '));
        const lastName = v.substring(v.indexOf(' ') + 1);
        const sirname = "Patil";
        this.set({ firstName, lastName, sirname });
    });
//Suppose you have a User model. Every user has an email, but you also want the email's domain. 
//For example, the domain portion of 'test@gmail.com' is 'gmail.com'.
// Create a virtual property `domain` that's computed from `email`.

usersSchema.virtual('domain').get(function() {
    console.log("virtual : ",this.email);
    return this.email.slice(this.email.indexOf('@') + 1);
});

// let doc = await User.create({ email: 'test@gmail.com' });
// // `domain` is now a property on User documents.
// doc.domain; // 'gmail.com'

// This is the important bit- Using a virtual lets me pass `{ password: 'xyz' }` without actually having it save.
// Instead it is caught by this setter which performs the hashing and saves the hash to the document's hash property.
// usersSchema.virtual('password').set(function(value) {
//     const salt = bcrypt.genSaltSync(10)
//     this.hashedPassword = bcrypt.hashSync(value, salt)
// })

//Define middleware before the model compile then only run it.
//Mongoose middleware - use to process data before store in database
usersSchema.pre('save', function(next) {
    console.log('this gets printed first');
    next();
});

usersSchema.pre("save", function(next) {

    const SALT_WORK_FACTOR = 10; //integer gives us control over what the computing cost of processing the data
    var userRecord = this;
    // only hash the password if it has been modified (or is new)
    if (!userRecord.isModified('hashedPassword')) return next();

    // Make Hash password using bcrypt library - generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(userRecord.hashedPassword, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            userRecord.hashedPassword = hash;
            console.log("user's generated hashed pasword: ", userRecord.hashedPassword);
            next();
        });
    });
});

//Define middleware before the model compile then only run it.
usersSchema.post('save', function(doc) {
    console.log('email domain - %s & full name -%s, has been saved', doc.domain,doc.fullName);
    // Vanilla JavaScript assignment triggers the setter
    //doc.fullName = 'Jean-Luc Picard';
});