const router = require("express").Router();
const mongoose = require("mongoose");
const { updateMany } = require("../models/Cards.model");

/* allCollection
profile
start-line-up */

router.get("/allCollections", (req, res, next) => res.render("allCollection"));
router.get("/profile", (req, res, next) => res.render("profile"));
router.get("/startlineup", (req, res, next) => res.render("start-line-up"));

module.exports = router;
