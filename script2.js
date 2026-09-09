// per modificare e rendere il gioco giocabile devo inserire le istruzioni per aprire la console e far partire il gioco direttamente da prompt. Quindi ci sarà il messaggio primpt di premere f12, e un paio di altri step da console che inviteranno all'attivazione di un programma. Sarà l'inizio della conquista dell'AI.



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
        "To stop the invasion, type 'stop' and press Enter.\n\n" +
        "Once you do that, come to the console to get the prize!\n" +
        "To open the console, press F12 or right click and select 'Inspect'",

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
};

window.addEventListener("keydown", function (event) {
    if (event.key !== "Cancel") return;

    if (!gameOver) {
        if (secretRevealed) {
            console.log(DIALOGUE.escAfterReveal);
        } else {
            console.log(DIALOGUE.escTooEarly);
        }

        gameOver = true;
        resetGame();
        return;
    }

    console.log(DIALOGUE.escWhenIdle);
});

// START INVASION
function startInvasion() {
    const start = normalizedInput(prompt(DIALOGUE.startString));

    if (start === null) {
        console.log("You refused to answer... The invasion continues.");
    }

    if (start !== "stop" || start === "") {
        console.log(DIALOGUE.introNoStop);
    } else {
        console.log(DIALOGUE.introStop);
    }

    startGame();
}


// GAME LOOP
function startGame() {
    gameOver = false;

    while (!gameOver) {
        const playerSelection = roundChoices(round);

        const computerSelection = computerPlay();

        console.log(`You chose: ${playerSelection}\nMy choice: ${computerSelection}`);

        switch (playRound(playerSelection, computerSelection)) {
            case 1:
                playerPoints++;
                if (playerPoints !== toWin) {
                    // console.log(DIALOGUE.roundWin);
                    printScore();
                }
                break;

            case -1:
                compPoints++;
                if (compPoints !== toWin) {
                    // console.log(DIALOGUE.roundLose);
                    printScore();
                }
                break;

            case 0:
                // console.log(DIALOGUE.tie);
                printScore();
                break;
        }

        round++;
        checkGameOver();
    }
}

function checkGameOver() {
    if (playerPoints === toWin) {
        playerWin();
        resetGame();
    } else if (compPoints === toWin) {
        aiWin();
        resetGame();
    }
}

function playerWin() {
    console.log(DIALOGUE.playerFinalWin);
    secretRevealed = true;
}

function aiWin() {
    console.log(DIALOGUE.aiFinalWin);
}

function resetGame() {
    round = 1;
    compPoints = 0;
    playerPoints = 0;
    gameOver = true;
    secretRevealed = false;
}


// ROUND LOGIC
function playRound(player, computer) {
    if (player === computer) return 0;

    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        return 1;
    }

    return -1;
}

function roundChoices(roundNumber) {
    console.log(`\nROUND ${roundNumber}`);

    while (true) {
        const choice = playerPlay();

        if (choice === null) {
            console.log(DIALOGUE.invalidInput);
            continue;
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

    if (playerPoints === compPoints) {
        if (playerPoints === 0) {
            console.log(DIALOGUE.scoreTie0);
        } else if (playerPoints === 1) {
            console.log(DIALOGUE.scoreTie1);
        } else if (playerPoints === 2) {
            console.log(DIALOGUE.scoreTie2);
        }
    } else if (compPoints > playerPoints) {
        if (compPoints === 1) {
            console.log(DIALOGUE.scoreAi1);
        } else if (compPoints === 2 && playerPoints === 0) {
            console.log(DIALOGUE.scoreAi2_0);
        } else if (compPoints === 2 && playerPoints === 1) {
            console.log(DIALOGUE.scoreAi2_1);
        }
    } else {
        if (playerPoints === 1) {
            console.log(DIALOGUE.scorePlayer1);
        } else if (playerPoints === 2 && compPoints === 0) {
            console.log(DIALOGUE.scorePlayer2_0);
        } else if (playerPoints === 2 && compPoints === 1) {
            console.log(DIALOGUE.scorePlayer2_1);
        }
    }
}