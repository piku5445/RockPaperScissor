

let score = JSON.parse(localStorage.getItem('score')) || {
    win: 0,
    lose: 0,
    tie: 0
};

updateScoreElement();
let isAutoPlaying=false
let intervalId;
function autoPlay(){ 
    if(!isAutoPlaying){
       intervalId= setInterval(function(){
            const playerMove=pickComputerMove()
            playGame(playerMove)
    
        },1000);
        isAutoPlaying=true
    }
    else{
        clearInterval(intervalId)
        isAutoPlaying=false
    }
    
    
}

function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';

    if (playerMove === 'Scissors') {
        if (computerMove === 'Scissors') {
            result = 'Tie';
        } else if (computerMove === 'Rock') {
            result = 'Computer Wins';
        } else if (computerMove === 'Paper') {
            result = 'Player Wins';
        }
    } else if (playerMove === 'Rock') {
        if (computerMove === 'Rock') {
            result = 'Tie';
        } else if (computerMove === 'Paper') {
            result = 'Computer Wins';
        } else if (computerMove === 'Scissors') {
            result = 'Player Wins';
        }
    } else if (playerMove === 'Paper') {
        if (computerMove === 'Paper') {
            result = 'Tie';
        } else if (computerMove === 'Scissors') {
            result = 'Computer Wins';
        } else if (computerMove === 'Rock') {
            result = 'Player Wins';
        }
    }

    if (result === 'Player Wins') {
        score.win++;
    } else if (result === 'Computer Wins') {
        score.lose++;
    } else if (result === 'Tie') {
        score.tie++;
    }

    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement();

    document.querySelector('.jsResult').innerHTML = result;
    document.querySelector('.jsMove').innerHTML = `you 
        <img src="${playerMove}-emoji.png" alt="error" class="move-icon">
        <img src="${computerMove}-emoji.png" class="move-icon" alt="error"> 
        Computer`;
}

function updateScoreElement() {
    document.querySelector('.score').innerHTML = `Wins: ${score.win}, Losses: ${score.lose}, Ties: ${score.tie}`;
}

function resetScore() {
    score.win = 0;
    score.lose = 0;
    score.tie = 0;
    localStorage.removeItem('score');
    updateScoreElement();
}

function pickComputerMove() {
    const randomNumber = Math.random();
    if (randomNumber < 1 / 3) {
        return 'Rock';
    } else if (randomNumber < 2 / 3) {
        return 'Paper';
    } else {
        return 'Scissors';
    }
}