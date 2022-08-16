var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
const { check, body, validationResult } = require("express-validator");


/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Collaborative Code Editor - write some come with family!",
  });
});

/* GET about page. */
router.get("/about", function (req, res, next) {
  res.render("about", {
    title: "Collaborative Code Editor - write some come with family!",
  });
});

/* GET contact page. */
router.get("/contact", function (req, res, next) {
  res.render("contact", {
    title: "Collaborative Code Editor - write some come with family!",
  });
});

/* POST contact page. */
router.post("/contact", [body('name').not().isEmpty().withMessage("Empty name"),
body('email').not().isEmpty().withMessage("Empty email"),
body('message').not().isEmpty().withMessage("Empty message")], function (req, res, next) {

  console.log(req.body.name);
  console.log(req.body.email);
  console.log(req.body.message);

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
     console.log({errors : errors.array()});
     console.log("Hi Martin We got some errors");
    res.render("contact", {
      title: "Collaborative Code Editor - write some come with family!",
      errorMessages: errors.array()
    });
  } else {
    res.render("thank", { title: "Collaborative Code Editor - write some come with family!" })

  }






  /*check(req.bodyname).not().isEmpty().withMessage("Empty name");
  check(req.body.email).not().isEmpty().withMessage("Empty email");
  check(req.body.message).not().isEmpty().withMessage("Empty message");
 
  var errors = validationResult(req);
 


  if (errors) {
    console.log(errors);
    res.render("contact", {
      title: "Collaborative Code Editor - write some come with family!",
      name: req.check.name,
      email: req.check.email,
      message: req.check.message,
      errorMessages: errors,
    });
  } else {
    res.render("thank", {
      title: "Collaborative Code Editor - write some come with family!",
    });
  }*/
}
);

module.exports = router;
