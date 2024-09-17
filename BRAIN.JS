// Get references to DOM elements
const choices = document.querySelectorAll(".choice");
const userScoreRef = document.querySelector("#user-score");
const compScoreRef = document.querySelector("#comp-score");
const msgRef = document.querySelector("#msg");

let userScore = 0;
let compScore = 0;
let roundCount = 0;
const maxRounds = 20; // Maximum number of rounds

// Function to generate a random computer choice
function getComputerChoice() {
    const choicesArray = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choicesArray[randomIndex];
}

// Function to handle a draw
function drawGame() {
    msgRef.innerText = "It's a draw!";
}

// Function to play a round of the game
function playGame(userChoice) {
    // If rounds exceed the limit, stop the game
    if (roundCount >= maxRounds) {
        declareFinalWinner();
        return;
    }

    const compChoice = getComputerChoice();
    
    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWins = true;

        // Define losing conditions for the user
        if ((userChoice === 'rock' && compChoice === 'paper') ||
            (userChoice === 'paper' && compChoice === 'scissors') ||
            (userChoice === 'scissors' && compChoice === 'rock')) {
            userWins = false;
        }

        showWinner(userWins, userChoice, compChoice);
    }

    // Increment the round count
    roundCount++;

    // Check if the game has reached the maximum number of rounds
    if (roundCount >= maxRounds) {
        declareFinalWinner();
    }
}

// Function to display the winner and update scores
function showWinner(userWins, userChoice, compChoice) {
    if (userWins) {
        userScore++;
        userScoreRef.innerText = userScore;
        msgRef.innerText = `You win! You chose ${userChoice}, computer chose ${compChoice}.`;
    } else {
        compScore++;
        compScoreRef.innerText = compScore;
        msgRef.innerText = `You lose! You chose ${userChoice}, computer chose ${compChoice}.`;
    }
}

// Function to declare the final winner after 20 rounds
function declareFinalWinner() {
    let finalMessage;

    if (userScore > compScore) {
        finalMessage = `Game Over! You win the game with a score of ${userScore} to ${compScore}.`;
    } else if (compScore > userScore) {
        finalMessage = `Game Over! Computer wins the game with a score of ${compScore} to ${userScore}.`;
    } else {
        finalMessage = `Game Over! It's a draw with both scores at ${userScore}.`;
    }

    msgRef.innerText = finalMessage;

    // Disable further game play after 20 rounds
    choices.forEach(choice => {
        choice.removeEventListener("click", handleUserChoice);
    });
}

// Function to handle user choice and start a round
function handleUserChoice(event) {
    const userChoice = event.target.parentElement.getAttribute("id");
    playGame(userChoice);
}

// Add event listeners to each choice (rock, paper, scissors)
choices.forEach(choice => {
    choice.addEventListener("click", handleUserChoice);
});
