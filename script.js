const words = ["javascript", "python", "html", "css", "react", "node", "express"];
let selectedWord = "";
let guessedLetters = [];
let wrongGuesses = 0;
let maxAttempts = 6;

const hangmanStages = [
    `
    ------
    |    |
    |    
    |    
    |    
    |    
    |
    ------
    `,
    `
    ------
    |    |
    |    O
    |    
    |    
    |    
    |
    ------
    `,
    `
    ------
    |    |
    |    O
    |    |
    |    
    |    
    |
    ------
    `,
    `
    ------
    |    |
    |    O
    |   /|
    |    
    |    
    |
    ------
    `,
    `
    ------
    |    |
    |    O
    |   /|\\
    |    
    |    
    |
    ------
    `,
    `
    ------
    |    |
    |    O
    |   /|\\
    |   / 
    |    
    |
    ------
    `,
    `
    ------
    |    |
    |    O
    |   /|\\
    |   / \\
    |    
    |
    ------
    `
];

function startNewGame() {
    guessedLetters = [];
    wrongGuesses = 0;
    document.getElementById("feedback").innerHTML = "";
    document.getElementById("letter-input").value = "";
    document.getElementById("attempts").innerText = maxAttempts;
    
    // Seleção aleatória da palavra
    selectedWord = words[Math.floor(Math.random() * words.length)];
    
    // Exibição inicial da palavra
    displayWord();
}

function displayWord() {
    let wordDisplay = selectedWord.split('').map(letter => (guessedLetters.includes(letter) ? letter : '_')).join(' ');
    document.getElementById("word-display").innerText = wordDisplay;
    
    // Verifica se o jogador venceu
    if (!wordDisplay.includes('_')) {
        document.getElementById("feedback").innerHTML = "<span style='color: green;'>Você venceu!</span>";
    }
}

function checkLetter() {
    const letterInput = document.getElementById("letter-input");
    const letter = letterInput.value.toLowerCase();
    
    if (letter && letter.length === 1 && !guessedLetters.includes(letter)) {
        guessedLetters.push(letter);

        if (selectedWord.includes(letter)) {
            displayWord();
        } else {
            wrongGuesses++;
            document.getElementById("attempts").innerText = maxAttempts - wrongGuesses;
            updateHangmanImage();
        }

        // Verifica se o jogador perdeu
        if (wrongGuesses === maxAttempts) {
            document.getElementById("feedback").innerHTML = "<span style='color: red;'>Você perdeu! A palavra era: " + selectedWord + "</span>";
        }

        letterInput.value = "";
    }
}

function updateHangmanImage() {
    document.getElementById("hangman").innerText = hangmanStages[wrongGuesses];
}

startNewGame();
