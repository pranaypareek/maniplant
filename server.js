/* API DOCS
    ========================================================================
    /user GET: returns list of users
    /user POST: creates a new user with 
    {
      refId,
      refName,
      friends: [
      {
        name,
        location,
        skill1,
        skill2,
        email
      }]
    }
    ========================================================================  
    /user/:user_id GET: returns the properties of the specifed user id

    IMPORTANT ONE:==========================================================
      /user/:user_id POST: updates the friends array with the friends json
                        object
      Takes in {
          "__v": 0,
          "_id": "54c39c183c8a36112de7c98a",
          "refId": "qwe125",
          "refName": "vame",
          "friends": (NOT A FRIENDS ARRAY, JUST A FRIENDS OBJECT)
              {
                  "name": "zxcvb127",
                  "location": "india",
                  "skill1": "E",
                  "skill2": "G#",
                  "email": "q.w@z.com",
                  "_id": "54c3a6a1bfaf7daf379998c2"
              }
          }

          

    ========================================================================
    /user/:user_id DELETE: deletes user

    ========================================================================  
    /user/:user_id PUT: CAN update user if required later with required
                        fields

    ========================================================================   
    COOLEST API ROUTE: 
    /users/:user_id/skills?
    link=https://in.linkedin.com/pub/vamshi-reddy/54/215/aa2
    GET: runs a python script which scrapes the given link page for linked in skills

    Sends a json with skills array with all the skills for the linkedIn profile!                    
*/

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/maniplant');
var moment = require('moment');
var User = require('./app/models/userSchema');
var shell = require('shelljs');
var fs = require('fs');

//bodyParser() lets us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // setting port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log(moment().format() + ' Middleware initiated');
    console.log(moment().format() + 'url: ' + req.url);
    next(); // to move to the next routes and not get stuck here
});

// GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({
        message: 'Hello response from the api'
    });
});


router.route('/users')

// create a user (accessed at POST http://localhost:8080/api/users)
.post(function(req, res) {

    var user = new User(); // create a new instance of the user model
    user.refId = req.body.refId;
    user.refName = req.body.refName; // set the users name (comes from the request)
    user.friends = [];
    //console.log('req body: ', req.body.refId);

    console.log('USER: ', user);
    // save the user and check for errors
    user.save(function(err) {
        if (err)
            res.send(err);

        res.json({
            message: 'User created!'
        });
    });

})

// get all the users (accessed at GET http://localhost:8080/api/users)
.get(function(req, res) {
    User.find(function(err, users) {
        console.log('get req');
        if (err)
            res.send(err);

        res.json(users);
    });
});

// /users ends here

router.route('/users/:user_id')

// get the user with that id (accessed at GET http://localhost:8080/api/users/:user_id)
.get(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
})

.post(function(req, res) {
    console.log("inside post for updating friends list");
    var id = req.params.id;
    var friends = {
        name: req.body.friends.name,
        location: req.body.friends.location,
        skill1: req.body.friends.skill1,
        skill2: req.body.friends.skill2,
        email: req.body.friends.email
    };
    var options = {
        $upsert: true
    }
    var query = {
        _id: req.params.user_id
    }
    console.log('inserting friend for ' + req.params.user_id +
        ' friend object in the req', friends);
    User.findByIdAndUpdate(req.refId, {
        $push: {
            "friends": friends
        }
    }, {
        safe: true,
        upsert: true
    }, function(err, result) {
        if (err) {
            console.log(err);
        }
        res.json({
            message: 'friend inserted!'
        });
    });
})

// update the user with this id (accessed at PUT http://localhost:8080/api/users/:user_id)
.put(function(req, res) {

        // use our user model to find the user we want
        User.findById(req.params.user_id, function(err, user) {

            if (err)
                res.send(err);

            user.name = req.body.name; // update the users info

            // save the user
            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json({
                    message: 'User updated!'
                });
            });

        })
    })
    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({
                message: 'Successfully deleted'
            });
        });
    });

router.route('/users/:user_id/skills')

.get(function(req, res) {
  var linkedinLink = req.query.link;
  shell.exec('python skills.py ' + linkedinLink, function(err, result){
    var skills = [];
      fs.readFile('workfile', 'ascii', function(err, data){
        console.log('workfile data: ', typeof data);
        skills = data.split(",");
        console.log('split array', skills);
        shell.echo('hello world!');
        res.json({
          skills: skills
        });
      });
  });
})


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);