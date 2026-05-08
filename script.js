const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
});

const colors = ["green", "red", "yellow", "blue"];

let gameSequence = [];
let playerSequence = [];

let score = 0;

let canClick = false;
let gameStarted = false;

let currentPlayer = "";

const buttons = document.querySelectorAll(".btn");

const scoreEl = document.getElementById("score");

const startBtn = document.getElementById("startBtn");

const restartGame = document.getElementById("restartGame");

const playerNameInput =
document.getElementById("playerName");

const rankingBody =
document.getElementById("rankingBody");

const resetRanking =
document.getElementById("resetRanking");

/* =========================================
   START
========================================= */

startBtn.addEventListener("click", () => {

    if(gameStarted) return;

    const playerName =
    playerNameInput.value.trim();

    if(playerName.length < 2){

        alert("Digite um nome válido");

        return;
    }

    currentPlayer = playerName;

    startGame();
});

/* =========================================
   NOVA PARTIDA
========================================= */

restartGame.addEventListener("click", () => {

    gameStarted = false;

    gameSequence = [];
    playerSequence = [];

    score = 0;

    scoreEl.textContent = score;

    startBtn.textContent = "▶ INICIAR";
});

/* =========================================
   LIMPAR RANKING
========================================= */

resetRanking.addEventListener("click", () => {

    rankingBody.innerHTML = "";
});

/* =========================================
   START GAME
========================================= */

function startGame(){

    gameStarted = true;

    gameSequence = [];
    playerSequence = [];

    score = 0;

    scoreEl.textContent = score;

    startBtn.textContent = "JOGANDO...";

    setTimeout(() => {

        nextRound();

    }, 700);
}

/* =========================================
   SOM
========================================= */

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

/* =========================================
   FLASH
========================================= */

function flash(color){

    const btn =
    document.querySelector(`.${color}`);

    btn.classList.add("active");

    playSound(color);

    setTimeout(() => {

        btn.classList.remove("active");

    }, 400);
}

/* =========================================
   NEXT ROUND
========================================= */

function nextRound(){

    playerSequence = [];

    canClick = false;

    const randomColor =
    colors[Math.floor(Math.random() * colors.length)];

    gameSequence.push(randomColor);

    score = gameSequence.length - 1;

    scoreEl.textContent = score;

    showSequence();
}

/* =========================================
   SHOW SEQUENCE
========================================= */

function showSequence(){

    let i = 0;

    const interval = setInterval(() => {

        flash(gameSequence[i]);

        i++;

        if(i >= gameSequence.length){

            clearInterval(interval);

            setTimeout(() => {

                canClick = true;

            }, 600);
        }

    }, 800);
}

/* =========================================
   PLAYER CLICK
========================================= */

buttons.forEach(btn => {

    btn.addEventListener("click", () => {

        if(!canClick) return;

        const color = btn.dataset.color;

        playerSequence.push(color);

        flash(color);

        checkMove(playerSequence.length - 1);
    });

});

/* =========================================
   CHECK
========================================= */

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

/* =========================================
   GAME OVER
========================================= */

function gameOver(){

    canClick = false;

    gameStarted = false;

    addToRanking(currentPlayer, score);

    createLoseScreen();

    gameSequence = [];
    playerSequence = [];

    startBtn.textContent = "▶ INICIAR";
}

/* =========================================
   RANKING
========================================= */

function addToRanking(name, points){

    const tr =
    document.createElement("tr");

    tr.innerHTML = `

        <td>${name}</td>
        <td>${points}</td>

    `;

    rankingBody.prepend(tr);
}

/* =========================================
   LOSE SCREEN
========================================= */

function createLoseScreen(){

    const old =
    document.querySelector(".lose-screen");

    if(old){
        old.remove();
    }

    const loseScreen =
    document.createElement("div");

    loseScreen.classList.add("lose-screen");

    loseScreen.innerHTML = `

        <div class="lose-card">

            <h2>Fim de jogo</h2>

            <p>Você alcançou</p>

            <div class="final-score">
                ${score}
            </div>

            <p>pontos</p>

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

        scoreEl.textContent = score;
    });
}