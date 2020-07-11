/*The codes below were largely influenced by tutorials from personal research and adapted to achieve my desired outcome, please refer to references in the README.md, thank you.:)*/

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

    alloverlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
        
            let soundControl = new SoundController();
            soundControl.playMusic();
        });
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.cardFlip(card);
        });
    });
}

//The Sound Control Zone
class SoundController {
    constructor() {
        this.bgMusic = new Audio('assets/sound/bgmusic.mp3');
        this.flipSound = new Audio('assets/sound/flipSound.mp3');
        this.matchedSound = new Audio('assets/sound/matched.mp3');
        this.winnerSound = new Audio('assets/sound/winner.mp3');
        this.gameOverSound = new Audio('assets/sound/gameOver.mp3');
        this.bgMusic.volume = 0.2;
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
        this.timer = document.getElementById('time-count')
        this.ticktok = document.getElementById('flips');
        this.soundControl = new SoundController();
    }
}
