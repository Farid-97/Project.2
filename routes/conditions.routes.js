const router = require("express").Router();
const mongoose = require("mongoose");
const { updateMany } = require("../models/Cards.model");
const User = require('../models/User.model');
const Cards = require("../models/Cards.model");
/* const reveal = require('../script') */
/* allCollection
profile
start-line-up */
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/allCollections", async (req, res, next) =>{
try {
const sort = { numberId: 1 };
const cardsCollection = await Cards.find().sort(sort);

    res.render("allCollection",{cardsCollection})
} catch (error) {
    
}

} );

router.get("/start-line-up/:id", async (req, res, next) => {
  try {
    let players = await Cards.find();
    let id = req.params.id;
    let user = await User.findById(id);
    /* res.send({players, user}) */
    res.render("start-line-up", {players, user})
  } catch (error) {
    
  }
  });
router.post("/start-line-up/:id/edit", async (req, res, next) => {
  try {
    let id = req.params.id
    let {player1, player2, player3, player4, player5} = req.body;
    let user = await User.findById(id);
    let pOne = await Cards.findById(player1)
    let pTwo = await Cards.findById(player2)
    let pThree = await Cards.findById(player3)
    let pFourth = await Cards.findById(player4)
    let pFifth = await Cards.findById(player5)
    await User.findByIdAndUpdate(id, {startlineup: []})
    await User.findByIdAndUpdate(id, { $push: { startlineup: pOne._id} })
    await User.findByIdAndUpdate(id, { $push: { startlineup: pTwo._id} })
    await User.findByIdAndUpdate(id, { $push: {startlineup: pThree._id}})
    await User.findByIdAndUpdate(id, { $push: {startlineup: pFourth._id}})
    await User.findByIdAndUpdate(id, { $push: {startlineup: pFifth._id}})
    res.redirect(`/${user._id}/profile`)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.get("/nbacards", async (req, res, next) => {
  try {
    const package = [];
    const sort = { numberId: 1 };
    const lottery = await Cards.find().sort(sort);
    /* res.send(lottery); */
    /* for (let i = 0; i < 2; )  */res.render("nbacards", { lottery });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/* router.post("/nbacards", async (req, res, next) => {
    
}) */

module.exports = router;
