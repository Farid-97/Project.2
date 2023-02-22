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

router.get("/allCollection/:id", async (req, res, next) =>{
try {
const sort = { rating: 1 };
const cardsCollection = await Cards.find().sort(sort);
const user = await User.findById(req.params.id)
    res.render("allCollectionLogged",{cardsCollection, user})
} catch (error) {
    console.log(error)
    next(error)
}

} );
router.get("/allCollection", async (req, res, next) =>{
try {
const sort = { rating: 1 };
const cardsCollection = await Cards.find().sort(sort);
    res.render("allCollection",{cardsCollection})
} catch (error) {
    console.log(error)
    next(error)
}

} );



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
