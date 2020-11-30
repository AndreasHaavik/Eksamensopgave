class user {
    constructor(firstName, lastName, gender, age, interest, location, eMail){
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age; 
        this.interest = interest;
        this.location = location;
        this.eMail = eMail;   
    }
}

class match extends user {
    constructor(user, matchX, matchY){
        super(user)
        this.matchX = matchX;
        this.matchY = matchY;
    }
}

