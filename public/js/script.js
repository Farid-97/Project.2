// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("project_2 JS imported successfully!");
});

// Get references to the button and information div
const revealButton = document.getElementById("revealButton");
const nextButton1 = document.getElementById("nextButton1");
const nextButton2 = document.getElementById("nextButton2");
const nextButton3 = document.getElementById("nextButton3");
const nextButton4 = document.getElementById("nextButton4");
const nextButton5 = document.getElementById("nextButton5");

const revealDiv1 = document.getElementById("reveal1");
const revealDiv2 = document.getElementById("reveal2");
const revealDiv3 = document.getElementById("reveal3");
const revealDiv4 = document.getElementById("reveal4");
const revealDiv5 = document.getElementById("reveal5");

// Add a click event listener to the button
revealButton.addEventListener("click", () => {
  // Make the information div visible
  revealDiv1.removeAttribute("hidden");
  // Hide the button
  revealButton.setAttribute("hidden", true);
  nextButton1.removeAttribute("hidden");
});

nextButton1.addEventListener("click", () => {
  revealDiv1.setAttribute("hidden", true);
  revealDiv2.removeAttribute("hidden");
});
nextButton2.addEventListener("click", () => {
  revealDiv2.setAttribute("hidden", true);
  revealDiv3.removeAttribute("hidden");
});
nextButton3.addEventListener("click", () => {
  revealDiv3.setAttribute("hidden", true);
  revealDiv4.removeAttribute("hidden");
});
nextButton4.addEventListener("click", () => {
  revealDiv4.setAttribute("hidden", true);
  revealDiv5.removeAttribute("hidden");
});
nextButton5.addEventListener("click", () => {
  revealDiv5.setAttribute("hidden", true);
  revealButton.removeAttribute("hidden");
});

const divPlayer1 = document.getElementsByClassName("player1");
/* const divPlayer2 = document.getElementsByClassName("player2");
const divPlayer3 = document.getElementsByClassName("player3");
const divPlayer4 = document.getElementsByClassName("player4");
const divPlayer5 = document.getElementsByClassName("player5");
const submitLineUp = document.getElementById("submitStartlineup"); */
const selection1 = document.getElementById("selection1");

selection1.addEventListener("click", () => {
  divPlayer1.classList.remove("defaultPic");
  divPlayer1.classList.add("ad");
});
