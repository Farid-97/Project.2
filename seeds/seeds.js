const Cards = require("../models/Cards.model");
const mongoose = require("mongoose");
const User = require("../models/User.model");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb+srv://db2023:QWERTY2023@cluster0.mvx1sc1.mongodb.net/cards?retryWrites=true&w=majority";

const players = [
  {
    name: "Andrew Wiggins",
    numberId: 1,
    nickname: "Wiggs",
    rating: 80,
    imageCard:'https://2kdb.net/storage/players/23/andrew_wiggins_4091.jpg',
    imageLineup:'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203952.png',
    age: 27,
    rarity: "Commum",
    position: "Small Forward",
    team: "Golden state warriors",
    height: 6.7,
    ppg: 19.1,
    rpg: 4.5,
    apg: 2.3,
    stp: 0 ,
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
    imageCard:'https://2kdb.net/storage/players/23/jordan_poole_7847.jpg',
    imageLineup:'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1629673.png',
    rating: 79,
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
    imageCard:'https://2kdb.net/storage/players/23/klay_thompson_61111.jpg',
    imageLineup:'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/202691.png',
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
    imageCard:'https://2kdb.net/storage/players/23/draymond_green_2488.jpg',
    imageLineup:'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203110.png',
    rating: 81,
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
    imageCard:'https://2kdb.net/storage/players/23/malik_beasley_7223.jpg',
    imageLineup:'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1627736.png',
    rating: 72,
    age: 26,
    position: "Shooting Guard",
    team: "Minnesota Timberwolves",
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
    imageCard:'https://2kdb.net/storage/players/23/d_angelo_russell_4461.jpg',
    imageLineup:'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1626156.png',
    numberId: 6,
    rating: 79,
    age: 26,
    position: "Point Guard",
    team: "Minnesota Timberwolves",
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
    rating: 97,
    imageCard:'https://2kdb.net/storage/players/23/anthony_davis_61318.jpg',
    imageLineup:'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/203076.png',
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
    imageLineup:'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/201939.png',
    numberId: 8,
    rating: 97,
    age: 34,
    imageCard:'https://2kdb.net/storage/players/23/stephen_curry_61827.jpg',
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
    imageCard:'https://2kdb.net/storage/players/23/lebron_james_62158.jpg',
    imageLineup:'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/2544.png',
    rating: 99,
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
  {
    name: "Michael Jordan",
    nickname: " His Airness",
    numberId: 12,
    rating: 99,
    imageCard:'https://2kdb.net/storage/players/23/michael_jordan_61032.jpg',
    imageLineup:'https://www.basketball-reference.com/req/202106291/images/players/jordami01.jpg',
    age: 60,
    position: "Shooting guard",
    team: "Michael jordan",
    rarity: "Legendary",
    height: 6.6,
    ppg: 30.1,
    rpg: 6.2,
    apg: 5.3,
    stp: 0,
    shirtNumber: 23,
    per: 27.9,
    awards: [
      "6x NBA Champ",
      "10x scoring champ",
      "14x NBA All-Star",
      "11x All-NBA Team",
      "9x NBA All-Defensive Team",
      "5x MVP",
      "1987-1988 Defensive.POY",
      "NBA 75th Anniv. Team"
    ],
  },
  {
    name: "Scottie Pippen",
    nickname: "Pip",
    imageLineup:'/images/scottie-pippen.png',
    numberId: 11,
    rating: 97,
    age: 57,
    imageCard:'https://2kdb.net/storage/players/23/scottie_pippen_61955.jpg',
    position: "Small Foward",
    team: "Chicago bulls",
    rarity: "Legendary",
    height: 6.8,
    ppg: 16.1,
    rpg: 6.4,
    apg: 5.2,
    shirtNumber: 33,
    per: 18.6,
    awards: [
      "7x All Star",
      "6x NBA Champion",
      "7x All-NBA",
      "NBA 75th Anniv. Team",
      "2121-22 Finals MVP",
      "10x All-Defensive"
    ],
  },
  {
    name: "Dennis Rodman",
    nickname: "The worn",
    numberId: 10,
    imageCard:'https://2kdb.net/storage/players/23/dennis_rodman_61490.jpg',
    imageLineup:'https://www.basketball-reference.com/req/202106291/images/players/rodmade01.jpg',
    rating: 94,
    age: 61,
    position: "Forward",
    team: "Chicago Bulls",
    rarity: "Legendary",
    height: 6.9,
    ppg: 7.3,
    rpg: 13.1,
    apg: 1.8,
    shirtNumber: 91,
    per: 14.6,
    awards: [
      "5x NBA Champ",
      "2x NBA All-Star",
      "2x Def.POY",
      "2x All-NBA Team",
      "8x NBA All-Defensive Team",
    ],
  },
  {
    name: "Kevin Durant",
    nickname: "Easy Money Sniper",
    numberId: 13,
    imageCard:'https://2kdb.net/storage/players/23/kevin_durant_62161.jpg',
    imageLineup:'https://www.basketball-reference.com/req/202106291/images/players/duranke01.jpg',
    rating: 98,
    age: 34,
    position: "Forward",
    team: "Brooklyn Nets",
    rarity: "Legendary",
    height: 6.10,
    ppg: 27.3,
    rpg: 7.1,
    apg: 4.3,
    shirtNumber: 7,
    per: 25.3,
    awards: ["13x All Star",
'4x Scoring Champ',
'2x NBA Champ',
'10x All-NBA',
'2007-08 ROY',
'2x AS MVP',
'2013-14 MVP',
'2x Finals MVP',
    ],
  },
  {
    name: "Giannis Antetokounmpo",
    nickname: "The Greek Freak",
    numberId: 14,
    imageCard:'https://2kdb.net/storage/players/23/giannis_antetokounmpo_61687.jpg',
    imageLineup:'https://www.basketball-reference.com/req/202106291/images/players/antetgi01.jpg',
    rating: 96,
    age: 28,
    position: " Power Forward",
    team: "Milwaukee Bucks",
    rarity: "Ultra rare",
    height: 7.0,
    ppg: 22.5,
    rpg: 9.6,
    apg: 4.7,
    shirtNumber: 34,
    per: 24.8,
    awards: [
      '2021 NBA Champ',
      '6x All-NBA',
      '2013-14 All-Rookie',
      '5x All-Defensive',
      '2016-17 Most Improved',
      '2x MVP',
      '2019-20 Def. POY',
      '2020-21 AS MVP',
      '2020-21 Finals MVP',
    ],
  },
  {
    name: "Ja Morant",
    nickname: "He as given you the liberty the chose cool one.",
    numberId: 15,
    imageCard:'https://2kdb.net/storage/players/23/ja_morant_61247.jpg',
    imageLineup:'https://www.basketball-reference.com/req/202106291/images/players/moranja01.jpg',
    rating: 95,
    age: 23,
    position: "Point Guard",
    team: "Memphis Grizzlies",
    rarity: "Rare",
    height: 6.3,
    ppg: 22.4,
    rpg: 4.8,
    apg:7.4,
    shirtNumber: 12,
    per: 14.6,
    awards: [
      "2x All Star",
     '2021-22 All-NBA',
      '2019-20 ROY',
      '2019-20 All-Rookie',
      "2021-22 Most Improved",
    ],
  },
  {
    name: "Luka Dončić",
    nickname: "Luka Magic",
    numberId: 10,
    imageCard:'https://2kdb.net/storage/players/23/luka_doncic_61765.jpg',
    imageLineup:'https://www.basketball-reference.com/req/202106291/images/players/doncilu01.jpg',
    rating: 96,
    age: 23,
    position: " Point Guard",
    team: "Dallas Mavericks",
    rarity: "Rare",
    height: 6.7,
    ppg: 27.5,
    rpg: 8.6    ,
    apg: 8.0,
    shirtNumber: 77,
    per: 25.3,
    awards: [
      "4x All Star",
      '3x All-NBA',
      '2018-19 All-Rookie',
      '2018-19 ROY',
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
    await mongoose.connect(MONGO_URI);
    await Cards.create(players);
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
}

seed();
