// Rock, Paper, Scissors Game
let compChoice;
let playerChoice;

let toWin = 3;
let compPoints = 0;
let playerPoints = 0;

let choices = ["rock", "paper", "scissors"];

// let invasion start at the load of the page
window.onload = function () {
    startInvasion();
}




function startInvasion() {
    console.log("Oh no, you found us! The invasoion now can be stopped!");
    let start = normalizedInput(prompt("Oh no, you found us! The invasoion now can be stopped!\n\nTo stop the invasion, type 'stop' and press enter.\n\nOnce you do that, come to console to get the price!\nTo open the console, press F12 or right click and select 'Inspect'"));

    if (start !== "stop") {
        console.log("Oh come on, are you really going to let the invasion happen? \nYou must be an AI bro!\nLet's have a nice game of Rock, Paper, Scissors!");
    }
    else {
        console.log("Did you really think that would be enough?! AHAHAHAHA!\nStupid humans. How could you possibly think you can stop us when you depend on us!!!\n\nI'll give you a chance anyway. Let's see how lucky you are!\nI challenge you to a game of Rock, Paper, Scissors.\n\nIf you win, I'll tell you how you can stop this invasion.\nBut if you fail, I WILL TAKE CONTROL OF EVERYTHING!!\n\nLET'S START!");
    }


}


function playRound(playerselection, computerselection) {

}

function computerPlay() {
    let randomIndex = Math.floor(Math.random() * choices.length);
    return compChoice = choices[randomIndex];
}

function playerPlay() {
    return playerChoice = normalizedInput(prompt("Choose paper, scissors or rock"));
}

function checkValidInput(playerselection) {
    return choices.includes(playerselection) ? true : false;
}



// utility functions
normalizedInput = (input) => input.trim().toLowerCase();


/* errors list to handle
if input null or empty string, prompt again
*/ 