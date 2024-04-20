// Iteration 1: Declare variables required for this game
const gameBody = document.getElementById("game-body");
let lives = 4;
let time = 60;
let zombiID = 0;
let zombi;
let width = 100;

// Iteration 1.2: Add shotgun sound
let gunSound = new Audio("./assets/shotgun.wav");
gameBody.onclick = () => {
  gunSound.pause();
  gunSound.currentTime = 0;
  gunSound.play();
};

// Iteration 1.3: Add background sound
let backgroundMusic = new Audio("./assets/bgm.mp3");
backgroundMusic.play();
backgroundMusic.loop = true;

// Iteration 2: Write a function to make a zombie
function generateZombi() {
  let num = randomNumber(1, 7);
  gameBody.innerHTML += `<img src="./assets/zombie-${num}.png" class='zombie-image' id='zombiID${zombiID}'>`;
  zombi = document.getElementById(`zombiID${zombiID}`);
  let second = randomNumber(2, 6);
  zombi.style.animationDuration = `${second}s`;
  zombi.style.transform = `translateX(${randomNumber(20, 80)}vw)`;
  zombi.onclick = () => destroyZombi(zombi);
}

// Iteration 3: Write a function to check if the player missed a zombie
function escapeZombi(zombi) {
  if (zombi.getBoundingClientRect().top <= 0) {
    lives--;
    width -= 25;
    document.getElementById("lives").style.width = `${width}%`;
    destroyZombi(zombi);
  }
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function destroyZombi(zombi) {
  zombi.style.display = "none";
  zombiID++;
  generateZombi();
}

// Iteration 5: Creating timer
setInterval(timer, 1000);

function timer() {
  if (time < 0 || lives <= 0) {
    location.href = lives <= 0 ? "game-over.html" : "win.html";
  } else {
    time--;
    let timerElement = document.getElementById("timer");
    timerElement.innerHTML = time;
    escapeZombi(zombi);
  }
}

// Iteration 6: Write a code to start the game by calling the first zombie
generateZombi();

// Iteration 7: Write the helper function to get random integer 
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }