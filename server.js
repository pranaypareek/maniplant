
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/maniplant');
var moment = require('moment');
var User = require('./app/models/userSchema');

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
    //console.log('req body: ', req.body.refId);

    var friendsDetails = {
        name: req.body.friends[0].name,
        location: req.body.friends[0].location,
        skill1: req.body.friends[0].skill1,
        skill2: req.body.friends[0].skill2,
        email: req.body.friends[0].email
    }

    user.friends.push(friendsDetails);

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

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
