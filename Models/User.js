const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    gender: String,
    age: {type: Number, required: true},
    interests: String, 
    address: String, 
    eMail: String,
    userName: String,
    passWord: {type: Number, required: true},
});

module.exports = mongoose.model('User', userSchema);



class User {
    constructor(firstName, lastName, gender, age, address, interests, eMail, userName, passWord,){
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age; 
        this.address = address;
        this.interests = interests;
        this.eMail = eMail;
        this.userName = userName;
        this.passWord = passWord;
    }
}

