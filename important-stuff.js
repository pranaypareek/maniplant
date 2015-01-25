// app/models/user.js

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    refId: String,
    refName: String,
    friends: [{name, skill1, skill2, email}]
    ]
});

db.user.find({""})
module.exports = mongoose.model('userSchema', userSchema);

{
	refId: "qwe123",
	refName: "vamc",
	friends: [
		{
			name: "pr",
			location: "india",
			skill1: "scala",
			skill2: "python",
			email: "q.w@z.com"
		}
	]
}

//or
db.users.find({$or:[{"friends.skill1":"scala"},{"friends.skill2":"scala"}]}).pretty()

//or and selected projection
db.users.find({$or:[{"friends.skill1":"scala"},{"friends.skill2":"scala"}]},
	{"refId":1,"refName":1,"friends.name":1, "friends.email":1}).pretty()

//updating doc and pushing into array
db.userschemas.update({"refId":"qwe123"}, {$push: {friends: 
	{name: "zxcvb", location: "india", skill1: "E", skill2: "G#", email: "q.w@z.com" }}})





//////////////////////////////

//objects to populate:

{
	refId: "qwe123",
	refName: "vamc",
	friends: [
		{
			name: "pr",
			location: "india",
			skill1: "scala",
			skill2: "python",
			email: "q.w@z.com"
		}
	]
}{
	refId: "qwe124",
	refName: "vamc",
	friends: [
		{
			name: "pr",
			location: "india",
			skill1: "c",
			skill2: "r",
			email: "q.w@z.com"
		}
	]
}{
	refId: "qwe125",
	refName: "vamc",
	friends: [
		{
			name: "pr",
			location: "india",
			skill1: "aws",
			skill2: "xen",
			email: "q.w@z.com"
		}
	]
}

{
	refId: "qwe127",
	refName: "vamg",
	friends: [
		{
			name: "pr",
			location: "india",
			skill1: "D",
			skill2: "F#",
			email: "q.w@z.com",
			skills: ["c", "cpp", "python"]
		}
	]
}