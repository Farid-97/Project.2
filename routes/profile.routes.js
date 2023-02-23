const router = require("express").Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { updateMany } = require("../models/Cards.model");
const User = require("../models/User.model");
const Cards = require("../models/Cards.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.post("/editPersonalProfile/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, GOAT, password } = req.body;
    let response = await User.findOne({ username: `${username}` });
    let responseUser = await User.findById(id);
    let responseAll = await User.find();
    /* res.send(response) */
    let check = false;
    for (let i = 0; i < responseAll.length; i ++){
        if(response.username === responseAll[i].username && response.username != responseUser.username){
            check = true;
        }
    }
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,}$/;
    if (!username || !password || !GOAT) {
      res.render("editPersonalProfile", {
        errorMessage: "Please input all the fields",
      });
    } else if (!regex.test(password)) {
      res.render("editPersonalProfile", {
        errorMessage:
          "Your password needs to be 4 characters long and include lowercase letters and uppercase letters",
      });
    } 
    else if( GOAT != 'Michael Jordan' && GOAT != 'Lebron James'){
        res.render("editPersonalProfile", {
            errorMessage:
              "You must choose between the only 2 GOAT's that exists, Michael Jordan or Lebron James 🏀",
          });
    }
    else if (response.username === responseUser.username) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        await User.findByIdAndUpdate(id, {
            username,
            GOAT,
            password: hashedPassword,
        });
        res.redirect(`/${id}/profile`);
    } 
    
    else if(check){
      res.redirect(`/${id}/profile`);        
        res.render("editPersonalProfile", {
            errorMessage:
              "Username already registered",
          });
    } 
      else{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        await User.findByIdAndUpdate(id, {
            username,
            GOAT,
            password: hashedPassword,
        });
        res.redirect(`/${id}/profile`);
    }
    

    
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/editPersonalProfile/:id", async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);
    res.render("editPersonalProfile", user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/start-line-up/:id/delete", async (req, res, next) => {
  try {
    const id = req.params.id;
    await User.findByIdAndUpdate(id, { startlineup: [] });
    res.redirect(`/${id}/profile`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/start-line-up/:id", async (req, res, next) => {
  try {
    let players = await Cards.find();
    let id = req.params.id;
    let user = await User.findById(id);
    /* res.send(user) */
    /* res.send({players, user}) */
    res.render("start-line-up", { players, user });
  } catch (error) {}
});
router.post("/start-line-up/:id/edit", async (req, res, next) => {
  try {
    let id = req.params.id;
    let { player1, player2, player3, player4, player5 } = req.body;
    let user = await User.findById(id);
    let pOne = await Cards.findById(player1);
    let pTwo = await Cards.findById(player2);
    let pThree = await Cards.findById(player3);
    let pFourth = await Cards.findById(player4);
    let pFifth = await Cards.findById(player5);
    await User.findByIdAndUpdate(id, { startlineup: [] });
    await User.findByIdAndUpdate(id, { $push: { startlineup: pOne._id } });
    await User.findByIdAndUpdate(id, { $push: { startlineup: pTwo._id } });
    await User.findByIdAndUpdate(id, { $push: { startlineup: pThree._id } });
    await User.findByIdAndUpdate(id, { $push: { startlineup: pFourth._id } });
    await User.findByIdAndUpdate(id, { $push: { startlineup: pFifth._id } });
    res.redirect(`/${user._id}/profile`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id/profile", async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id).populate("startlineup");
    /* res.send(user) */
    let existStartlineup = user.startlineup;
    console.log(existStartlineup);
    res.render("secondProfile", { user, existStartlineup });
  } catch (error) {
    console.log(error);
    next(error);
  }
});
/* router.get("/profile/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    let user = await User.findById(id);
    res.render("profile", { user });
  } catch (error) {}
}); */

module.exports = router;
