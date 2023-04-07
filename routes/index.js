var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
const { check, body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
var config = require('../config')
let transporter = nodemailer.createTransport(config.mailer)




/* GET home page. */
router.get("/", function (req, res, next) {
  //res.locals.passt = 'Gourav'
  // console.log(res.locals);
  res.render("index", {
    title: "Collaborative Code Editor",
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
body('message').not().isEmpty().withMessage("Empty message")],
  function (req, res, next) {

    //console.log(req.body.name);
    //console.log(req.body.email);
    // console.log(req.body.message);

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      //console.log({errors : errors.array()});
      //console.log("Hi Martin We got some errors");
      return res.render("contact", {
        title: "Collaborative Code Editor - write some come with family!",
        errorMessages: errors.array()
      });
    } else {

      var mailOptions = {
        from: 'africaneaglecode<no-reply@gmail.com>',
        to: 'martinlubowa@outlook.com',
        subject: 'You got a new message from visitor😁',
        text: req.body.message


      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return console.log(error);
        }

        res.render("thank", { title: "Collaborative Code Editor - write some come with family!" })

      })
      res.render("thank", { title: "Collaborative Code Editor - write some come with family!" })

    }
  }
);



module.exports = router;
