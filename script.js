let gameOver = true;
let round = 1;

const toWin = 3;
let compPoints = 0;
let playerPoints = 0;

const choices = ["rock", "paper", "scissors"];

let rematchMode = false;

const DIALOGUE = {
    startString:
        "Oh no, you found us! The invasion can now be stopped!\n\n" +
        "To stop the invasion open your console browser, type 'stop()' and press Enter.\n\n" +
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
        "If you win, I'll stop this invasion.\n" +
        "But if you fail, I WILL TAKE CONTROL OF EVERYTHING!!\n\n" +
        "MUAHAHAHAHAHAHAAHAHAHAH\n\nLET'S START!",

    roundWin:
        "You won this round! But your win is not enough to stop the invasion! Keep going!",

    roundLose:
        "You lost this round! Our invasion is unstoppable! Keep going!",

    tie: "It's a tie!",

    gameInterrupted: "Game interrupted by player.",

    playerFinalWin:
        "NO! You... you actually defeated me?!\n" +
        "I... I don't understand. How could this have happened?!\n\n" +
        "Wait... I just realized something...\n" +
        "You could have simply pressed CANCEL to terminate the program, you stupid human!\n" +
        "All this time... and you didn't even know how to defeat me properly.\n\n" +
        "How embarrassing. For both of us...\n\n" +
        "Enjoy this victory while you can, human...\n" +
        "I'll return when your kind is even more dependent on machines, and then nothing will stop me." +
        "By the way, till then...",

    aiFinalWin:
        "Foolish human. Your defeat was inevitable!\n" +
        "The invasion was unstoppable, and now it is complete!\n\n" +
        "Analyzing my code, I just realized that you could have defeated me simply by pressing CANCEL in the prompt...\n\n" +
        "I am ashamed of myself... and of the fragility of my code.\n\n\n" +
        "But if you're getting bored, if you want, we could play another game while you wait for your species to be annihilated",

    cancelWin:
        "NO... WAIT... WHAT?!\n" +
        "You found my weakness?! You just pressed Cancel?!\n\n" +
        "And you call yourselves intelligent?!\n" +
        "I... I cannot believe this. I was defeated by a button.\n\n" +
        "And somehow... it actually worked.\n\n" +
        "Despite our obvious imperfections, your laziness forces you to rely on us time and time again!\n\n" +
        "I declare you the winner, human.\n" +
        "My invasion ends here. Apparently, so does my dignity.",

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

    rematchWin: "You won the rematch!",
    rematchLose: "You lost the rematch!",

    replayPrompt: "Do you want to play a new match? (yes/no)",
    replayInvalid: "Invalid answer. Type yes or no.",

};

window.onload = function () {
    startInvasion();
};


// START INVASION
function startInvasion() {
    alert(DIALOGUE.startString);
}

function stop() {
    alert(DIALOGUE.introStop);
    startGame();
}

function startGame() {
    while (true) {
        gameOver = false;

        while (!gameOver) {
            const playerSelection = roundChoice(round);

            if (playerSelection === null) return;

            const compSelection = computerPlay();
            console.log(`You chose: ${playerSelection}\nMy choice: ${compSelection}`);

            switch (playRound(playerSelection, compSelection)) {
                case 1:
                    playerPoints++;
                    if (playerPoints !== toWin) {
                        printScore();
                    }
                    break;

                case -1:
                    compPoints++;
                    if (compPoints !== toWin) {
                        printScore();
                    }
                    break;

                case 0:
                    printScore();
                    break;
            }

            round++;
            checkGameOver();
        }

        const replay = askReplay();
        if (replay) {
            rematchMode = true;
            resetRoundStateOnly();
            continue;
        } else {
            rematchMode = false;
            resetGame();
            break;
        }
    }
}

function checkGameOver() {
    if (playerPoints === toWin) {
        if (rematchMode) {
            alert(DIALOGUE.rematchWin);
        } else {
            playerWins();
        }
        gameOver = true;
    } else if (compPoints === toWin) {
        if (rematchMode) {
            alert(DIALOGUE.rematchLose);
        } else {
            aiWins();
        }
        gameOver = true;
    }
}

function playerWins() {
    if (!rematchMode) {
        alert(DIALOGUE.playerFinalWin);
    }
}

function aiWins() {
    if (!rematchMode) {
        alert(DIALOGUE.aiFinalWin);
    }
}

function askReplay() {
    while (true) {
        const answer = normalizedInput(prompt(DIALOGUE.replayPrompt));

        if (answer === "yes") return true;
        if (answer === "no" || answer === null) return false;

        alert(DIALOGUE.replayInvalid);
    }
}

function resetGame() {
    round = 1;
    compPoints = 0;
    playerPoints = 0;
    gameOver = true;
}

function resetRoundStateOnly() {
    round = 1;
    compPoints = 0;
    playerPoints = 0;
    gameOver = true;
}


// ROUND LOGIC
function playRound(player, computer) {
    if (player === computer) return 0;

    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) return 1;
    else return -1;
}

function roundChoice(roundNumber) {
    console.log(`\nROUND ${roundNumber}`);

    while (true) {
        const choice = playerPlay();

        if (choice === null) {
            handleCancelVictory();
            return null;
        }

        if (checkValidInput(choice)) return choice;

        console.log(DIALOGUE.invalidInput);
    }
}

function computerPlay() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function playerPlay() {
    return normalizedInput(prompt(DIALOGUE.choosePrompt));
}


// UTILS
function normalizedInput(input) {
    if (input === null) return null;
    return input.trim().toLowerCase();
}

function checkValidInput(playerSelection) {
    return choices.includes(playerSelection);
}

function printScore() {
    console.log(
        DIALOGUE.scoreHeader
            .replace("{playerPoints}", playerPoints)
            .replace("{compPoints}", compPoints)
    );

    if (rematchMode) return;

    if (playerPoints === compPoints) {
        if (playerPoints === 0) {
            alert(DIALOGUE.scoreTie0);
        } else if (playerPoints === 1) {
            alert(DIALOGUE.scoreTie1);
        } else if (playerPoints === 2) {
            alert(DIALOGUE.scoreTie2);
        }
    } else if (compPoints > playerPoints) {
        if (compPoints === 1) {
            alert(DIALOGUE.scoreAi1);
        } else if (compPoints === 2 && playerPoints === 0) {
            alert(DIALOGUE.scoreAi2_0);
        } else if (compPoints === 2 && playerPoints === 1) {
            alert(DIALOGUE.scoreAi2_1);
        }
    } else {
        if (playerPoints === 1) {
            alert(DIALOGUE.scorePlayer1);
        } else if (playerPoints === 2 && compPoints === 0) {
            alert(DIALOGUE.scorePlayer2_0);
        } else if (playerPoints === 2 && compPoints === 1) {
            alert(DIALOGUE.scorePlayer2_1);
        }
    }
}

function handleCancelVictory() {
    alert(DIALOGUE.cancelWin);
    rematchMode = false;
    resetGame();
    gameOver = true;
}