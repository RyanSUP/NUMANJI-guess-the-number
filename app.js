/**
 GUESS THE NUMBER!
 ## Features
    
 - Allow the player to continually be prompted to enter their guess at the secret number until they guess correctly.
 - If the player has an incorrect guess, display an alert message that informs the player:
     - Whether their guess is too high or too low, and…
     - A list of all the previously guessed numbers (without showing the square brackets of an array).
 - If the player has guessed the secret number:
     - Display an alert message that congrats the player and informs them of how many guesses they took.
     - End the gameplay.
 */

const game = {
    title: 'Guess the Number!',
    biggestNum: 100,
    smallestNum: 1,
    secretNum: null,
    prevGuesses: [],
    play() {
        this.secretNum = Math.floor(Math.random() * 
        (this.biggestNum - this.smallestNum + 1)) + this.smallestNum
    },
    getGuess() {
        let message = `Enter a guess between ${this.smallestNum} and ${this.biggestNum}`
        userInput = window.prompt(message)
        
        // 1) Prompt user for a number
        
        // 2) validate user input (this could be another function)
        // convert input to a number
        // while input is NaN or input number is NOT between smallestNum & biggestNum,
        // then continue asking for input.
        // Once an input is valid, return input.
        // ! window.prompt will return a string. Convert it to a number before returning it!

    },
}

