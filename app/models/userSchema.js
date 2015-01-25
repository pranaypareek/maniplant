// app/models/user.js

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    //name: String
    //user id given by SpringRole for the user who makes the referral
    refId: String,
    //user name for the SpringRole user making the referral 
    refName: String,
    //access token to facilitate messaging with linkedIn
    refToken: String,
    /* friends array populated with the list of SpringRole user's 
     * LinkedIn contacts with the top the skills as voted by the user
     */
    friends: [{
        empName: String,
        empId: String,
        location: String,
        skill1: String,
        skill2: String,
    }]
});

module.exports = mongoose.model('userSchema', userSchema);

//example:
/*
  {
    refId: "qwe12@34#1",
    refName: "vkrar",
    refToken: "qwertyuiopoiuytrewq",
    friends: [
      {
        empName: "qwe123",
        empId: "qwe123sId",
        location: "Melbourne",
        skill1: "python",
        skill2: "node"
      }
    ]
  }

*/
