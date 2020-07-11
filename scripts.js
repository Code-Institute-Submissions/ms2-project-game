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
        });
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.cardFlip(card);
        });
    });
}