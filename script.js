const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

/* MENU */
if(menuBtn){

  menuBtn.addEventListener("click", () => {

    sidebar.classList.toggle("active");

  });

}

/* =========================
   CONFIG
========================= */

const colors = ["green", "red", "yellow", "blue"];

let gameSequence = [];
let playerSequence = [];
let score = 0;
let canClick = false;
let gameStarted = false;

const scoreEl = document.getElementById("score");
const startBtn = document.getElementById("startBtn");
const buttons = document.querySelectorAll(".btn");

/* =========================
   START GAME
========================= */

if(startBtn){

  startBtn.addEventListener("click", () => {

    if(gameStarted) return;

    gameStarted = true;

    gameSequence = [];
    playerSequence = [];
    score = 0;

    if(scoreEl){
      scoreEl.textContent = score;
    }

    startBtn.innerText = "JOGANDO...";

    setTimeout(() => {

      nextRound();

    }, 700);

  });

}

/* =========================
   SOM
========================= */

function playSound(color){

  const sounds = {

    green:
    "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",

    red:
    "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",

    yellow:
    "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",

    blue:
    "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
  };

  const audio = new Audio(sounds[color]);

  audio.volume = 0.35;

  audio.play();
}

/* =========================
   FLASH
========================= */

function flash(color){

  const btn =
  document.querySelector(`.${color}`);

  if(!btn) return;

  btn.classList.add("active");

  playSound(color);

  setTimeout(() => {

    btn.classList.remove("active");

  }, 550);
}

/* =========================
   NEXT ROUND
========================= */

function nextRound(){

  playerSequence = [];

  canClick = false;

  const randomColor =
  colors[Math.floor(Math.random() * colors.length)];

  gameSequence.push(randomColor);

  score = gameSequence.length - 1;

  if(scoreEl){
    scoreEl.textContent = score;
  }

  showSequence();
}

/* =========================
   SHOW SEQUENCE
========================= */

function showSequence(){

  let i = 0;

  const interval = setInterval(() => {

    flash(gameSequence[i]);

    i++;

    if(i >= gameSequence.length){

      clearInterval(interval);

      setTimeout(() => {

        canClick = true;

      }, 700);
    }

  }, 850);
}

/* =========================
   PLAYER CLICK
========================= */

buttons.forEach(btn => {

  btn.addEventListener("click", () => {

    if(!canClick) return;

    const color = btn.dataset.color;

    playerSequence.push(color);

    flash(color);

    checkMove(playerSequence.length - 1);
  });

});

/* =========================
   CHECK
========================= */

function checkMove(index){

  if(playerSequence[index] !== gameSequence[index]){

    gameOver();

    return;
  }

  if(playerSequence.length === gameSequence.length){

    canClick = false;

    setTimeout(() => {

      nextRound();

    }, 1000);
  }
}

/* =========================
   GAME OVER
========================= */

function gameOver(){

  canClick = false;
  gameStarted = false;

  createLoseScreen();

  gameSequence = [];
  playerSequence = [];

  if(startBtn){
    startBtn.innerText = "JOGAR NOVAMENTE";
  }
}

/* =========================
   TELA DE DERROTA
========================= */

function createLoseScreen(){

  const oldScreen =
  document.querySelector(".lose-screen");

  if(oldScreen){
    oldScreen.remove();
  }

  const loseScreen =
  document.createElement("div");

  loseScreen.classList.add("lose-screen");

  loseScreen.innerHTML = `

    <div class="lose-card">

      <h2>Fim de jogo</h2>

      <p class="lose-text">
        Você alcançou
      </p>

      <div class="final-score">
        ${score}
      </div>

      <p class="lose-sub">
        pontos
      </p>

      <button class="restart-btn">
        Jogar novamente
      </button>

    </div>

  `;

  document.body.appendChild(loseScreen);

  const restartBtn =
  loseScreen.querySelector(".restart-btn");

  restartBtn.addEventListener("click", () => {

    loseScreen.remove();

    score = 0;

    if(scoreEl){
      scoreEl.textContent = score;
    }

    if(startBtn){
      startBtn.innerText = "JOGANDO...";
    }

    gameStarted = true;

    setTimeout(() => {

      nextRound();

    }, 600);

  });

}