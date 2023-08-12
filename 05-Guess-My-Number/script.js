// Step 1: Implement secretnumber, initial score, initial highscore, initial message

let score = 20,
  highscore = 0;
let secretNumber = Math.floor(Math.random() * 20 + 1);

const againBtn = document.querySelector(".again");
const checkBtn = document.querySelector(".check");

// Step 2: Implement check functionality

const displayMessage = (message) => {
  document.querySelector(".message").textContent = message;
};

const displayScore = () => {
  document.querySelector(".score").textContent = score;
};

const displayHighscore = () => {
  document.querySelector(".highscore").textContent = highscore;
};

checkBtn.addEventListener("click", () => {
  const guess = Number(document.querySelector(".guess").value);
  if (guess === secretNumber) {
    highscore = score > highscore ? score : highscore;
    displayHighscore();
    displayMessage("🎉 Correct Number!");
    document.querySelector(".number").textContent = secretNumber;
    document.querySelector(".number").style.width = "30rem";
    document.querySelector("body").style.backgroundColor = "#60b347";
  } else {
    if (score > 1) {
      score--;
      displayScore();
      displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
    } else {
      score = 0;
      displayScore();
      displayMessage("💥 You lost the game!");
    }
  }
});

againBtn.addEventListener("click", () => {
  score = 20;
  secretNumber = Math.floor(Math.random() * 20 + 1);
  document.querySelector(".number").textContent = "?";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector("body").style.backgroundColor = "#222";
  displayMessage("Start guessing...");
  document.querySelector(".guess").value = "";
});
