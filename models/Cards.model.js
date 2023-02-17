const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const cardsSchema = new Schema(
  {
    name: String,
    nickname: String,
    image: String,
    rating: Number,
    age: Number,
    position: String,
    team: String,
    height: Number,
    ppg: Number,
    rpg: Number,
    apg: Number,
    bpg: Number,
    spg: Number,
    per: Number,
    awards: [String],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Cards = model("Cards", cardsSchema);

module.exports = Cards;
