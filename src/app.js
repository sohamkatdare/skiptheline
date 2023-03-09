import {read, writeFileXLSX} from 'xlsx'
const express = require("express"),
      bodyparser = require("body-parser"),
      mongoose = require('mongoose'),
      session = require('express-session'),
      passport = require('passport'),
      passportLocalMongoose = require('passport-local-mongoose');

let loggedIn = false;
let currentUsername = "";
let loginError = false;
const app = express();

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(session({
    secret: "neel is 2 foot 17",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const userSchema = new mongoose.Schema({
    fName: String,
    lName: String,
    idNum: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.post("/register/", (req, res) => {
    const fName = req.body.fName;
    const lName = req.body.lName;
    const idNum = req.body.idNum;

    User.findOne({idNum: idNum}, (err, foundUser) => {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                res.redirect("/login/");
            } else {
                User.register({fName: fName, lName: lName, active: false}, idName, (req, res) => {
                    if (!err) {
                        passport.authenticate("local")(req, res, () => {
                            res.redirect('back');
                        });
                    } else {
                        res.redirect("/register/")
                    }
                });
            }
        }
    });
});

app.post("/login/", (req, res) => {
    user = new User({
        fName: fName,
        lName: lName,
        idNum: idNum
    });
    
    req.login(user, (err) => {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, () => {
                res.redirect("back")
            });
        }
    });         
});

app.post("/deli/", (req, res) => {
    
});