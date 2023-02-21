const express = require("express");
const router = express.Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default - 10 rounds)
/* const saltRounds = 10; */

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

// GET /auth/signup
router.get('/signup', (req, res, next) => res.render('auth/signup'))

router.post('/signup', async (req, res, next) => {
    try {
        let {username, email, password, goat} = req.body
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,}$/
        if(!username || !password || !email || !goat){
            res.render('auth/signup', {errorMessage: 'Please input all the fields'})
        } else if(!regex.test(password)){
            res.render('auth/signup', {errorMessage: 'Your password needs to be 4 characters long and include lowercase letters and uppercase letters'})
        } else {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            await User.create({username, email, password: hashedPassword, GOAT: goat, coins: 100, cardsCollected: 0})
            res.redirect('/')
        }


    } catch (error) {
        //catch mongoose errors
        
        if(error instanceof mongoose.Error.ValidationError){
            res.render('auth/signup', {errorMessage: error.message})
        } else if(error.code === 11000){
            res.render('auth/signup',{
                errorMessage: 'Email already registered',
            })
        }
        
        console.log(error)
        next(error)
    }
})

router.get('/login', isLoggedOut, (req, res, next) => res.render('auth/login'))


router.post('/login', async (req, res, next) => {
    try {
        let {username, password} = req.body
        if(!password || !username){
            res.render('auth/login', {errorMessage: 'Please input all the fields'})
        }
        let user = await User.findOne({username})

        if (!user){
            res.render('auth/login', {errorMessage: "Account doesn't exist"}) 
        } else if(bcrypt.compareSync(password, user.password)) {
            req.session.user = user;
            res.redirect('/profile')
        } else {
            res.render('auth/login', {errorMessage: 'Wrong credentials'});
        }
    }   
    catch(error){
        console.log(error)
        next(error)
    }
})

router.get('/profile', (req, res, next) => res.render('profile'))

router.get('/profile', isLoggedIn,  (req, res, next) => {
    let user = req.session.user;
    res.render('profile', user)
})
router.get('/logout', (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            next(err);
        } else {
            res.redirect('/');
        }
    })});

/* router.post ('/logout', (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            next(err);
        } else {
            res.redirect('/');
        }
    })
}) */

module.exports = router;
