alert("Thanks to mimileni for writing 99% of the JavaScript code")

let currentScore = 0;
let highestScore = 0;
let currentTime = 40;
let interval;
let gameStarted = false;
let hearts = 3;
let pressed = false;
let ducksVisible = false
let audioLoaded = false;

let audio = new Audio("https://res.cloudinary.com/dw0ud8xnn/video/upload/q_auto/f_auto/v1776618591/mac-quack_mp3cut.net_zoxndu.mp3");

audio.oncanplaythrough = () => {
    audioLoaded = true;
}


function playSound2() {
    audio.cloneNode().play();
}

let audioLoaded2 = false;

let audio2 = new Audio("https://res.cloudinary.com/dw0ud8xnn/video/upload/q_auto/f_auto/v1776618982/faaah_mp3cut.net_miteic.mp3");

audio.oncanplaythrough = () => {
    audioLoaded2 = true;
}


function playSound() {
    audio2.cloneNode().play();
}



function reset(){
    // reset time to 5 seconds, current score to 0 for next game
    currentTime = 40;
    currentScore = 0;
    hearts = 3;
        document.getElementById("scoreDisplay").textContent = 0;
        document.getElementById("maxScoreDisplay").textContent = highestScore;
        document.getElementById("timer").textContent  = currentTime;
        
        let holes = document.querySelectorAll('.hole');
                document.getElementById("hearts").textContent = "❤️".repeat(hearts)
        
        
        // set all holes to empty again 😸
        holes.forEach(hole =>{
            hole.textContent = "";
        })
        
        clearInterval(interval)
}

function spawnDucks() {
    let holes = document.querySelectorAll('.hole');
    ducksVisible = false;
    
    holes.forEach(hole => {
      if (Math.random() < 0.35) {
        hole.innerHTML = '<span class="duck-coming">🦆</span>';
      } else {
        hole.textContent = '';
        }
    });
}

function reduceHeart() {
    hearts -= 1; 
    if(hearts < 0) {
        gameOver()
        return;
    }else if(hearts === 0){
        // lets say no hearts are there
          document.getElementById("hearts").textContent = "❤️ x 0"
      }else{
          document.getElementById("hearts").textContent = "❤️".repeat(hearts)
    }   
}

function tap(e) {
    if (!gameStarted) return;
    if (e.textContent.trim() !== "") {
        
        currentScore++;
        pressed = true;
        e.innerHTML = '<span class="feder">🪶</span><span class="feder2">🪶</span><span class="feder3">🪶</span><span class="feder4">🪶</span><span class="feder5">🪶</span><span class="feder6">🪶</span>';
        setTimeout(() => { e.innerHTML = ""; }, 200);
        playSound2(); 
        document.getElementById("scoreDisplay").textContent = currentScore;
    } else {
        reduceHeart();
        pressed = true;
        playSound();
        e.classList.add("flash");
        setTimeout(() => {
            e.classList.remove("flash");
        }, 440);
    }
}


function gameOver() {
    alert("Game Over, your score : " + String(currentScore));
        
        // we store highest score 🐼
        highestScore = Math.max(highestScore, currentScore);
        reset();
        gameStarted = false;
}


window.addEventListener('DOMContentLoaded', () => {
  let holes = document.querySelectorAll('.hole');
  
  let startButton = document.getElementById("start")
  let timer = document.getElementById("timer")
  
function updateField() {
    let missedDuck = false;
    document.querySelectorAll('.hole').forEach(hole => {
        if (hole.textContent === '🦆') {
            missedDuck = true;
        }
    });
    
    if(missedDuck) {
        reduceHeart();
        if (!gameStarted) return; 
    }
    
    // spawn the new ducks for the current second
    spawnDucks();
    
    // Update time and reset the tap tracker
    currentTime -= 1;
    pressed = false;
    timer.textContent = currentTime;
    
    if(currentTime <= 0) {
        gameOver();
    }
}
  
  // start the game, when start button is clicked (duh 😆)
  
startButton.onclick = () =>{
    if(!gameStarted){
        gameStarted = true;
        spawnDucks()
        interval = setInterval(updateField, 1000);           document.getElementById("start").textContent = "Restart";
    }else{
        gameStarted = true;
        reset()
        spawnDucks()
        interval = setInterval(updateField, 1000);
    }
      
}


});
