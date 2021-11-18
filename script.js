// const finalResult ;
let player1 = {
    life: 100,
    won: 0
};
let player2 = {
    life: 100,
    won: 0
};
var gameActive = false;
// function Bullet1 () {};
// let bullet2 = {};

const match = {
    game: 0
}

const gameNo = document.querySelector(".gameNo");
const startButton = document.querySelector("#start-button");
const startAgain = document.querySelector("#start-again");
const scoreScreen = document.querySelector(".score-screen");
const gameScreen = document.querySelector(".game-screen");
const playerOne = document.querySelector(".player-1");
const playerTwo = document.querySelector(".player-2");
const p1Score = document.querySelector(".p1Score");
const p2Score = document.querySelector(".p2Score");
const winner = document.querySelector(".winner");


let count = 0;

function createBullet(bulletNo){
    if(bulletNo === "bullet-1"){
        count =+1;
        let bullet = document.createElement("DIV");
        bullet.setAttribute("class","bullet-1");
        bullet.setAttribute("id","id"+count);
        gameScreen.appendChild(bullet);
        return 0;
    }else{
        let bullet = document.createElement("DIV");
        bullet.setAttribute("class","bullet-2");
        gameScreen.appendChild(bullet);
        return 0;
    }
    
}

function moveBullet(bulletNo){
    if(bulletNo === "bullet-1"){
        let power = Math.floor((Math.random() * 5) + 1);
        let bullets = document.querySelectorAll(".bullet-1");
        let count = [];
        for(let i = 0; i < bullets.length; i++){
            count[i] = 0;
            let id = null;
            // clearInterval(id);
            id = setInterval(frame,1);
            function frame(){
                if(parseInt(window.getComputedStyle(bullets[i]).getPropertyValue("right")) <= 230){
                    clearInterval(id);
                    gameScreen.removeChild(bullets[i]);
                }else{
                    count[i]+=5;
                    bullets[i].style.left = 230 + count[i] + "px";
                }
            }
        }
    }else{
        let power = Math.floor((Math.random() * 5) + 1);
        let bullets = document.querySelectorAll(".bullet-2");
        let count = [];
        for(let i = 0; i < bullets.length; i++){
            count[i] = 0;
            let id = null;
            // clearInterval(id);
            id = setInterval(frame,1);
            function frame(){
                if(parseInt(window.getComputedStyle(bullets[i]).getPropertyValue("left")) <= 230){
                    clearInterval(id);
                    gameScreen.removeChild(bullets[i]);
                }else{
                    count[i]+=5;
                    bullets[i].style.right = 230 + count[i] + "px";
                }
            }
        }
    }    
}

function reduceLife(bulletNo){
    if(bulletNo === "bullet-1"){
        let power = Math.floor((Math.random() * 5) + 1);
        player2.life -= power;
        player2.life < 0 ? player2.life = 0 : player2.life = player2.life; 
        setTimeout(()=>playerTwo.innerHTML = player2.life + "%",700);
        // if(player2.life === 0){
        //     player1.won += 1;
        //     player2.life = 100;
        // }
    }else{
        let power = Math.floor((Math.random() * 5) + 1);
        player1.life -= power;
        player1.life < 0 ? player1.life = 0 : player1.life = player1.life; 
        setTimeout(()=>playerOne.innerHTML = player1.life + "%",700);
        // if(player1.life === 0){
        //     player2.won += 1;
        //     player1.life = 100;
        // }
    }
}

function updateScore(){
    if(player2.life === 0){
        gameActive = false;
        match.game += 1;
        gameNo.innerHTML = match.game;
        player1.won += 1;
        player2.life = 100;
        p1Score.innerHTML = player1.won;
        p2Score.innerHTML = player2.won;
        gameScreen.classList.add("d-none");
        scoreScreen.classList.remove("d-none");
    }
    if(player1.life === 0){
        gameActive = false;
        match.game += 1;
        gameNo.innerHTML = match.game;
        player2.won += 1;
        player1.life = 100;
        p1Score.innerHTML = player1.won;
        p2Score.innerHTML = player2.won;
        gameScreen.classList.add("d-none");
        scoreScreen.classList.remove("d-none");
    }
}

function anounceWinner(){
    if(player1.won ===3 || player2.won === 3){
        if(player1.won === 3){
            finalResult = "Player 1 won the match";
            winner.innerHTML = finalResult;
            startAgain.classList.remove("d-none");
            startButton.classList.add("d-none");
        }else if(player2.won === 3){
            finalResult = "Player 2 won the match";
            winner.innerHTML = finalResult;
            startAgain.classList.remove("d-none");
            startButton.classList.add("d-none");
        }   
    }
}

function keyPressed(e){
    if(gameActive === true){
        console.log("gameNo  " + match.game);
        if(e.key === "ArrowRight"){
            e.preventDefault();
            createBullet("bullet-1");
            moveBullet("bullet-1");
            reduceLife("bullet-1");
            updateScore();
            anounceWinner();        
        }
        if(e.key === "ArrowLeft"){
            e.preventDefault();
            createBullet("bullet-2");
            moveBullet("bullet-2");
            reduceLife("bullet-2");
            updateScore();
            anounceWinner();
        }
    }
}

const startGame = () => {
    gameActive = true;
    if(match.game < 6){
        scoreScreen.classList.add("d-none");
        gameScreen.classList.remove("d-none");
        playerOne.innerHTML = player1.life + "%";
        playerTwo.innerHTML = player2.life + "%";
        document.addEventListener("keydown",keyPressed);
    }else{
        document.location.reload(true);
    }
}

startButton.addEventListener('click',startGame);
startAgain.addEventListener('click',()=>{
    document.location.reload(true);
});
