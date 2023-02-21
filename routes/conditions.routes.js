const router = require("express").Router();
const mongoose = require("mongoose");
const { updateMany } = require("../models/Cards.model");
const Cards = require("../models/Cards.model");
/* const reveal = require('../script') */
/* allCollection
profile
start-line-up */
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/allCollections", (req, res, next) => res.render("allCollection"));

router.get("/start-line-up", (req, res, next) => res.render("start-line-up"));

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
