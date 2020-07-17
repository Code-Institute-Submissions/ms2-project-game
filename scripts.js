/*The codes below were largely influenced by tutorials from personal research and adapted to achieve my desired outcome, please refer to references in the README.md, thank you.:)*/

//The Sound Control Zone
class SoundController {
    constructor() {
        this.bgMusic = new Audio('assets/sound/bgmusic.mp3');
        this.flipSound = new Audio('assets/sound/flipSound.mp3');
        this.matchedSound = new Audio('assets/sound/matched.mp3');
        this.winnerSound = new Audio('assets/sound/winner.mp3');
        this.gameOverSound = new Audio('assets/sound/gameOver.mp3');
        this.bgMusic.volume = 0.1;
        this.bgMusic.loop = true;
    }
    playMusic() {
        this.bgMusic.play();
    }
    stopMusic() {
        this.bgMusic.pause();
        this.bgMusic.currentTime = 0;
    }
    flip() {
        this.flipSound.play();
    }
    matched() {
        this.matchedSound.play();
    }
    winner() {
        this.stopMusic();
        this.winnerSound.play();
    }
    gameOver() {
        this.stopMusic();
        this.gameOverSound.play();
    }
}

//For the Game Activities
class FindAMatch {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.countDown = totalTime;
        this.timer = document.getElementById('time-count');
        this.ticktok = document.getElementById('flips');
        this.soundControl = new SoundController();
    }
    
    //Starts Game when called
    playGame() {
        this.totalClicks = 0;
        this.countDown = this.totalTime;
        this.verifyCard = null;
        this.matchedCards = [];
        this.busy = true;

        //Delays game start time
        setTimeout(() => {
            this.soundControl.playMusic();
            this.cardsShuffle(this.cardsArray);
            this.timeCount = this.startCountdown();
            this.busy = false;
        }, 500)
        this.hideCards();
        this.timer.innerText = this.countDown;
        this.ticktok.innerText = this.totalClicks;
    }
    //Makes the card close after being flipped
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible');
        });
    }

    //Allows player to flip cards
    cardFlip(card) {
        if (this.allowedToFlip(card)) {
            this.soundControl.flip();
            this.totalClicks++;
            this.ticktok.innerText = this.totalClicks;
            card.classList.add('visible');

            if(this.verifyCard) {
                this.checkForCardMatch(card);
            } else {
                this.verifyCard = card;
            }
        }
    }
    //Checks if the cards match or not
    checkForCardMatch(card) {
        if(this.getCardType(card) === this.getCardType(this.verifyCard))
            this.cardMatch(card, this.verifyCard);
        else 
            this.cardNotmatch(card, this.verifyCard);

        this.verifyCard = null;
    }
    //Stores matched cards and called when they are a match
    cardMatch(card1, card2) {
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add('matched');
        card2.classList.add('matched');
        this.soundControl.matched();
        if(this.matchedCards.length === this.cardsArray.length)
            
        this.winner();
    }
    //Stores unmatched cards and called when they are not a match
     cardNotmatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove('visible');
            card2.classList.remove('visible');
            this.busy = false;
        }, 1000);
    }
    //Called when the value of a card is required
    getCardType(card) {
        return card.getElementsByClassName('card-value')[0].src;
    }

    //Starts Timer
    startCountdown() {
        return setInterval(() => {
            this.countDown--;
            this.timer.innerText = this.countDown;
            if(this.countDown === 0)
                this.gameOver();
        }, 1000);
    }
    //This is called when the game ends
    gameOver() {
        clearInterval(this.timeCount);
        this.soundControl.gameOver();
        document.getElementById('game-over-msg').classList.add('visible');
    }
    //This is called when the player finds all matching cards
    winner() {
        clearInterval(this.timeCount);
        this.soundControl.winner();
        document.getElementById('winner-msg').classList.add('visible');
        this.hideCards();
    }

    // Fisher-Yates Shuffle Algorithm ~ Allow for cards shuffle
    cardsShuffle() {
        for(let i = this.cardsArray.length - 1; i > 0; i--) {
            let randomInt = Math.floor(Math.random() * (i + 1));
            this.cardsArray[randomInt].style.order = i;
            this.cardsArray[i].style.order = randomInt;
        }
    }
    //This stops or allows a player to flip a card when there is an ongoing activity or not
    allowedToFlip(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.verifyCard;
    }
}

//Allows HTML page to load first
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

//To initialise game and overlays
function ready() {
    let alloverlays = Array.from(document.getElementsByClassName('overlay-msg'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new FindAMatch(30, cards);

    alloverlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.playGame();
        });
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.cardFlip(card);
        });
    });
}

