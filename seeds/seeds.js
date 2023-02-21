const Cards = require("../models/Cards.model");
const mongoose = require("mongoose");
const User = require("../models/User.model");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/project_2";

const players = [
  {
    name: "Andrew Wiggins",
    numberId: 1,
    nickname: "Wiggs",
    rating: 82,
    age: 27,
    rarity: "Commum",
    position: "Small Forward",
    team: "Golden state warriors",
    height: 6.7,
    ppg: 19.1,
    rpg: 4.5,
    apg: 2.3,
    shirtNumber: 22,
    per: 14.7,
    awards: [
      "1x All Star",
      "2022 NBA Champion",
      "2014-15 All-Rookie",
      "2014-15 ROY",
    ],
  },
  {
    name: "Jordan Poole",
    nickname: "Poole Part",
    numberId: 2,
    rating: 84,
    age: 23,
    rarity: "Commum",
    position: "Shooting guard",
    team: "Golden state warriors",
    height: 6.4,
    ppg: 15.4,
    rpg: 2.6,
    apg: 3.3,
    shirtNumber: 3,
    per: 13.7,
    awards: ["2022 NBA Champion"],
  },
  {
    name: "Klay Thompson",
    nickname: "Big Smokey",
    numberId: 3,
    rating: 86,
    age: 33,
    rarity: "Rare",
    position: "Shooting guard",
    team: "Golden state warriors",
    height: 6.6,
    ppg: 19.7,
    rpg: 3.5,
    apg: 2.3,
    shirtNumber: 11,
    per: 16.2,
    awards: [
      "5x All Star",
      "4x NBA Champion",
      "2x All-NBA",
      "2018-19 All-Defensive",
      "2011-12 All-Rookie",
      "2011-12 ROY",
    ],
  },
  {
    name: "Draymond Green",
    nickname: "Day-Day",
    numberId: 4,
    rating: 83,
    age: 32,
    rarity: "Ultra Rare",
    position: "Power Foward",
    team: "Golden state warriors",
    height: 6.6,
    ppg: 8.7,
    rpg: 7.0,
    shirtNumber: 23,
    per: 14.7,
    awards: [
      "4x All Star",
      "4x NBA Champion",
      "2x All-NBA",
      "7x All-Defensive",
      "2016-17 Def.POY",
    ],
  },
  {
    name:"Malik Beasley",
    nickname: "B-Easy",
    numberId: 5,
    rating: 76,
    age: 26,
    position: "Shooting Guard",
    team: "LA Lakers",
    rarity: "Commum",
    height: 6.4,
    ppg: 10.8,
    rpg: 2.6,
    apg: 1.3,
    shirtNumber: 5,
    per: 12.7,
    awards: [],
  },
  {
    name: "D'Angelo Russell",
    nickname: "DLo",
    numberId: 6,
    rating: 83,
    age: 26,
    position: "Point Guard",
    team: "LA Lakers",
    rarity: "Rare",
    height: 6.4,
    ppg: 17.7,
    rpg: 3.5,
    apg: 5.7,
    shirtNumber: 1,
    per: 16.5,
    awards: [],
  },
  {
    name: "Anthony Davis",
    nickname: "The Brow",
    numberId: 7,
    rating: 94,
    age: 29,
    position: "Power Forward",
    team: "LA Lakers",
    rarity: "Ultra Rare",
    height: 6.1,
    ppg: 23.9,
    rpg: 10.3,
    apg: 2.4,
    shirtNumber: 3,
    per: 27.0,
    awards: [
      "2020 NBA Champ",
      "2017 NBA All-Star Game MVP",
      "8x NBA All-Star",
      "4x All-NBA Team",
      "4x NBA All-Defensive Team",
      "2013 NBA All-Rookie Team",
    ],
  },
  {
    name: "Stephen Curry",
    nickname: "Chef Curry",
    numberId: 8,
    rating: 96,
    age: 34,
    position: "Point guard",
    team: "Golden state warriors",
    rarity: "Legendary",
    height: 6.2,
    ppg: 24.5,
    rpg: 4.7,
    apg: 6.5,
    shirtNumber: 30,
    per: 23.9,
    awards: [
      "9x All Star",
      "2x Scoring Champ",
      "4x NBA Champion",
      "8x All-NBA",
      "2X MVP",
      "NBA 75th Anniv. Team",
      "2121-22 Finals MVP",
    ],
  },
  {
    name: "Lebron James",
    nickname: "King James",
    numberId: 9,
    rating: 98,
    age: 38,
    position: "Forward",
    team: "LA Lakers",
    rarity: "Legendary",
    height: 6.9,
    ppg: 27.2,
    rpg: 7.5,
    apg: 7.3,
    shirtNumber: 6,
    per: 27.3,
    awards: [
      "4x NBA Champ",
      "4x NBA Finals MVP",
      "4x NBA MVP",
      "2003-2004 NBA Rookie of the Year",
      "3x NBA All-Star Game MVP",
      "19x NBA All-Star",
      "18x All-NBA Team",
      "6x NBA All-Defensive Team",
    ],
  },
];
const myUser = {
  username: "Jizzus",
  password: 123456,
  email: "miguel.angelo.jesus@hotmail.com",
  coins: 100,
  GOAT: "Lebron James",
};

async function seed() {
  try {
    //connect
    await mongoose.connect(MONGO_URI);
    let dbNBA = await Cards.create(warriors);
    /* await User.create(myUser); */
    console.log(`Created ${dbBooks.length} books on the DB`);

    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
}

seed();
