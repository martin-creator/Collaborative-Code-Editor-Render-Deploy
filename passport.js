var passport = require('passport');
//const user = require('./models/user');
var LocalStrategy = require('passport-local').Strategy;
var GitHubStrategy = require('passport-github2').Strategy;

passport.serializeUser(function(user,done ){
    done(null, user._id);
});



passport.deserializeUser(function(id, done){
    User.findOne({_id: id}, function(err, user){
        done(err, user);
    })
});


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    //passReqToCallback : true
}, 
function(username, password, done){
    User.findOne({email:username}, function(err, user){
        if (err) return done(err);
        if(!user){
            return done(null, false, {
               message : 'Incorrect username or password' 
            });
        }
        if(!user.validPassword(password)){
            return done(null, false, {
                message : 'Incorrect username or password' 
            })
        }
        return done(null, user)
    })
})
);


passport.use(new GitHubStrategy({
    clientID: '***',
    clientSecret: '***',
    callbackURL: "***",
  },

  /*function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
        console.log(user);
        console.log("This is the user profile after authentication");
        console.log(profile);
        user.name = profile.name
        user.email = profile.emails[0].value;
        user.githubId = github.id; 
      return done(err, user);
    });
  }
));*/
  
   function(accessToken, refreshToken, profile, done) {
    User.findOne({ githubId: profile.id }, function (err, user) {
        if(err) return done(err);

        if(user){
            return done(null, user);
        }else{
            User.findOne({email: profile.emails[0].value}, function(err, user){
                if(user){
                    user.githubId = profile.id
                    return user.save(function(err){
                        if (err) return done(null, false, {message: "Can't save user info"});
                        return done(null, user);
                    })
                }

                var user = new User();
                user.name = profile.displayName;
                user.email = profile.emails[0].value;
                user.githubId = profile.id;
                user.save(function(err){
                    if (err) return done(null, false, {message: "Can't save user info"});
                    return done(null, user);
                });
            })
        }
    });
  }
));


