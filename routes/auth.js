var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
const { check, body, validationResult } = require("express-validator");
var passport = require('passport');



/*  GET login page. */
router.get('/login', function (req, res, next) {
    res.render('login', { title: 'Login your account' });

});

/*  POST login page. */
router.post('/login', passport.authenticate('local', {successRedirect:'/',  failureRedirect: '/login'}
), function (req, res, next) {
    //console(req.session.messages)
    //console.log("Hello Martin, you are great!")
    //res.redirect('/');
});


/* GET register page. */
router.get('/register', function (req, res, next) {
    res.render('register', { title: 'Register a new account' });
})


/* Post register page. */
router.post('/register', [
    body('name').not().isEmpty().withMessage("Empty name"),
    body('email').not().isEmpty().withMessage("Empty email"),
    body('password').not().isEmpty().withMessage("Empty password"),
    body('confirmPassword').custom((value, { req }) => value === req.body.password).not().isEmpty().withMessage("Passwords don't match")],
    function (req, res, next) {
        // newpassword = req.body.password
        //console.log(req.body);
        //console.log(req.body.name);
        //console.log(req.body.email);
        //console.log(req.body.password);
        //console.log(req.body.confirmPassword);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log({ errors: errors.array() });
            console.log("Hi Martin We got some errors");
            res.render('register', {
                name: req.body.name,
                email: req.body.email,
                errorMessages: errors.array()
            })
        } else {
            var user = new User();
            user.name = req.body.name;
            user.email = req.body.email;
            user.setPassword(req.body.password);
            user.save(function (err) {
                if (err) {
                    res.render('register', {
                        errorMessages: err
                    })
                } else {
                    res.redirect('/login');
                }
            })

        }

    })


module.exports = router;