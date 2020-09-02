const container = document.querySelector('.board');
const scoreBoard = document.querySelector('.score');
const btnStart = document.querySelector('.btnStart');


let lasthideout = false;
let gameOver = false;
let score;

btnStart.addEventListener('click', startGame);
function restartGame(){
    if(gameOver = true){
        gameOver = false;
    }return startGame();
}
function startGame(){
    btnStart.style.display = 'none';
    makeGameBoard();
    startBadGuys();
    score = 0;
    scoring(); 
}


function startBadGuys(){
    let hideout = randomUp();
    let temp = Math.floor(Math.random()*4)+1;
    let tempClass =temp > 1 ? 'up': 'up2' ;
    hideout.classList.add(tempClass);
    const time =Math.round(Math.random()*(1500-250)+250);
    setTimeout(function(){
        hideout.classList.remove(tempClass);
        if(!gameOver)startBadGuys();
    },time);
    
}
function randomUp(){
    const hideouts = document.querySelectorAll('.hideout');
    const idx = Math.floor(Math.random()*hideouts.length);
    if(hideouts[idx].badGuyId === lasthideout){
        return randomUp();
    }
    lasthideout = hideouts[idx].badGuyId;
    return hideouts[idx];
    
}

function makeGameBoard(){
    let hideOutsCreated = 8;
    container.innerHTML = " ";
    for(let x =0; x < hideOutsCreated;x++){
        let div = document.createElement('div');
        div.classList.add('hideout');
        div.badGuyId = x;
        let badGuy = document.createElement('div');
        badGuy.classList.add('badGuy');
        badGuy.onclick = myShot;
        div.appendChild(badGuy);
        let friend = document.createElement('div');
        friend.classList.add('friend');
        friend.onclick = myShot2;
        div.appendChild(friend);
        let bricks = document.createElement('div');
        bricks.classList.add('bricks');
        div.appendChild(bricks);
        container.appendChild(div);
    }
}
function scoring(){
    scoreBoard.innerHTML = score;
    const message = score >= 10 ? 'Congratulations, You Have Won' : "Oh No We've All Lost.";
    if(score >= 10 || score < 0){
        gameOver = true;
        const gameOverScreen = document.createElement('div');
        gameOverScreen.classList.add('gameOverScreen');
        const gameOverText = document.createElement('h3');
        gameOverText.classList.add('gameOverText');
        gameOverText.innerHTML = message;
        gameOverScreen.appendChild(gameOverText);
        const restart = document.createElement('button');
        restart.classList.add('restart');
        restart.innerHTML= 'restart';
        restart.addEventListener('click', restartGame);
        gameOverScreen.appendChild(restart);
        container.appendChild(gameOverScreen);
       
    }
}


function myShot(e){
    console.log('hit');
    score++;
    this.parentNode.classList.remove('up');
    scoring();
}

function myShot2(){
    console.log('wrong one');
    score = score -5;
    this.parentNode.classList.remove('up2');
    scoring();
}

