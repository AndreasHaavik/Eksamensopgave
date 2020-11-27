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

class login{
    constructor(userName, passWord){
        this.userName = userName;
        this.passWord = passWord;
    }
}

class match extends user {
    constructor(user, matchX, matchY){
        super(user)
        this.matchX = matchX;
        this.matchY = matchY;
    }
}

class image {
    constructor(imageType, imageSize, author, path,){
        this.imageType = imageType;
        this.imageSize = imageSize;
        this.author = author;
        this.path = path;
    }
}