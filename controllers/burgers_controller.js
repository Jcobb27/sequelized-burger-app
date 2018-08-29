var express = require("express");

var router = express.Router();

// Requiring our Burger model
var db = require("../models");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  db.Burger.findAll({}).then(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  })
});

router.post("/api/burgers", function(req, res) {
  db.Burger.create({
    burger_name: req.body.burger_name,
    devoured: 0
  }).then(function(dbBurger) {
    // We have access to the new todo as an argument inside of the callback function
    res.redirect("/");
  })
    .catch(function(err) {
    // Whenever a validation or flag fails, an error is thrown
    // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });
});

router.put("/api/burgers/:id", function(req, res) {
  db.Burger.update({
    devoured: req.body.devoured
  }, {
    where: {
      id: req.body.id
    }
  }).then(function(dbBurger) {
    res.json(dbBurger);
  })
    .catch(function(err) {
    // Whenever a validation or flag fails, an error is thrown
    // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });
});
  


// Export routes for server.js to use.
module.exports = router;
