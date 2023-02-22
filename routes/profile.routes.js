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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.findByIdAndUpdate(id, { username, GOAT, password: hashedPassword });

    res.redirect(`/${id}/profile`);
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
router.get("/profile/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    let user = await User.findById(id);
    res.render("profile", { user });
  } catch (error) {}
});

module.exports = router;
