// app/models/user.js

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    //name: String
    //user id given by SpringRole for the user who makes the referral
    refId: String,
    //user name for the SpringRole user making the referral 
    refName: String,
    /* friends array populated with the list of SpringRole user's 
     * LinkedIn contacts with the top the skills as voted by the user
     */
    friends: [{
    	name: String,
    	location: String,
    	skill1: String,
    	skill2: String,
    	/*the friend contact is made aware for the resume by emailing
		 * on the following email ID
		 */
    	email: String
    }]
});

module.exports = mongoose.model('userSchema', userSchema);
