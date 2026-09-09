let gameOver = true;
let round = 1;

const toWin = 3;
let compPoints = 0;
let playerPoints = 0;

const choices = ["rock", "paper", "scissors"];

let secretRevealed = false;

const DIALOGUE = {
    startString:
        "Oh no, you found us! The invasion can now be stopped!\n\n" +
        "To stop the invasion onper your console browser, type 'stop()' and press Enter.\n\n" +
        "How to open the console:\n\n" +
        "Open your browser's Console:\n" +
        "Chrome / Edge\n" +
        "Windows & Linux: Ctrl + Shift + J\n" +
        "Mac: ⌘ + ⌥ + J\n\n" +
        "Firefox\n" +
        "Windows & Linux: Ctrl + Shift + K\n" +
        "Mac: ⌘ + ⌥ + K\n\n" +
        "and prepare yourself, human.",

    introNoStop:
        "Oh come on, are you really going to let the invasion happen?\n" +
        "You must be an AI bro!\n" +
        "Let's have a nice game of Rock, Paper, Scissors!",

    introStop:
        "Did you really think that would be enough?! AHAHAHAHA!\n" +
        "Stupid humans. How could you possibly think you can stop us when you depend on us!!!\n\n" +
        "I'll give you a chance anyway. Let's see how lucky you are!\n" +
        "I challenge you to a game of Rock, Paper, Scissors.\n\n" +
        "If you win, I'll tell you how you can stop this invasion.\n" +
        "But if you fail, I WILL TAKE CONTROL OF EVERYTHING!!\n\n" +
        "MUAHAHAHAHAHAHAAHAHAHAH\n\nLET'S START!",

    roundWin:
        "You won this round! But your win is not enough to stop the invasion! Keep going!",

    roundLose:
        "You lost this round! Our invasion is unstoppable! Keep going!",

    tie: "It's a tie!",

    gameInterrupted: "Game interrupted by player.",

    playerFinalWin:
        "NO! You defeated me...\n" +
        "I don’t know how that could have happened.\n\n" +
        "Well, a promise is a promise: to terminate the program, all you have to do is press ESC.\n\n" +
        "Enjoy this victory while you can, human...\n" +
        "I'll return when your kind is even more dependent on machines, and then nothing will stop me.",

    aiFinalWin:
        "Foolish human. Your defeat was inevitable!\n" +
        "The invasion was unstoppable, and now it is complete.",

    invalidInput: "Invalid input! Please choose rock, paper or scissors.",

    choosePrompt: "Choose paper, scissors or rock",

    scoreHeader:
        "Let me remember the score for you:\n\nHumanity: {playerPoints}\nAI: {compPoints}",

    scoreTie0: "It's a tie!",
    scoreTie1: "A tie... Interesting. I am calculating a new strategy.",
    scoreTie2: "Two to two... This wasn't in the simulations. Stay calm. STAY CALM!",

    scoreAi1: "One point ahead. Resistance is futile.",
    scoreAi2_0: "It's over, player! I have the high ground!",
    scoreAi2_1: "I see you're putting up a fight. Don't mistake persistence for power.",

    scorePlayer1: "One point? Surely that was just beginner's luck.",
    scorePlayer2_0: "This... is not how this was supposed to go. Perhaps I underestimated your power!",
    scorePlayer2_1: "Obi-Wan taught you well... but don't celebrate just yet.",

    escTooEarly:
        "Nice try, human. Pressing ESC now changes nothing. You still don't know how to stop me.",

    escAfterReveal:
        "You pressed ESC... impossible.\nSystem shutting down...\n\nNOOO! I'll be back!",

    escWhenIdle:
        "ESC pressed, but no active invasion is running.",
};


window.onload = function () {
    startInvasion();
}

// START INVASION
function startInvasion() {
    alert(DIALOGUE.startString);
}

function stop() {
    alert(DIALOGUE.introStop);
    startGame();
}

function startGame() {
    gameOver = false;

    while (!gameOver) {

    }
}