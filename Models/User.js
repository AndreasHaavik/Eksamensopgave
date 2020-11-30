class user {
    constructor(firstName, lastName, gender, age, interest, location, eMail, userName, passWord,picture){
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age; 
        this.interest = interest;
        this.location = location;
        this.eMail = eMail;
        this.userName = userName;
        this.passWord = passWord;
        this.picture = picture;

    }
}

class match extends user {
    constructor(user, matchX, matchY){
        super(user)
        this.matchX = matchX;
        this.matchY = matchY;
    }
}

