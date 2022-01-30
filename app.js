/**
 GUESS THE NUMBER! (going hard with the functional programming!)
 ## Features
    
 - Allow the player to continually be prompted to enter their guess at the secret number until they guess correctly.
 - If the player has an incorrect guess, display an alert message that informs the player:
     - Whether their guess is too high or too low, and…
     - A list of all the previously guessed numbers (without showing the square brackets of an array).
 - If the player has guessed the secret number:
     - Display an alert message that congrats the player and informs them of how many guesses they took.
     - End the gameplay.
     - prompt for a new game.
 */

const game = {
    // Properties of game
    biggestNum: 100,
    prevGuesses: [],
    smallestNum: 1,
    secretNum: null,
    title: 'Guess the Number!',
    // Methods of game
    generateSecretNumber() {
        this.secretNum = Math.floor(
            Math.random() * 
            (this.biggestNum - this.smallestNum + 1)
        ) + this.smallestNum
    },
    getGuess() {        
        let message = `Enter a guess between ${this.smallestNum} and ${this.biggestNum}`
        let guess = this.getNumFromUser(message, this.smallestNum, this.biggestNum)
        return guess
    },
    getNumFromUser(message, minNum, maxNum) {
        let userInput = null
        do {
            userInput = window.prompt(message)
            userInput = parseInt(userInput) // convert input to number
        } while(this.isValidInput(userInput, minNum, maxNum) === false)
        return userInput
    },
    initializeGame() {
        this.prevGuesses = []
        this.promptForRange()
        this.generateSecretNumber()
    },
    isValidInput(input, minNum, maxNum) {
        let isInRange = (input >= minNum && input <= maxNum)
        let isNumber = Number.isInteger(input)
        return (isInRange && isNumber)
    },
    play() {
        this.initializeGame()
        // Main game loop
        let newGuess = null
        do {
            newGuess = this.getGuess()
            this.prevGuesses.push(newGuess)
            this.render(newGuess)
        } while(newGuess !== this.secretNum)
    },
    promptForNewGame() {
        let newGame = window.confirm('Play again?')
        if (newGame) {
            game.play()
        }
    },
    promptForRange() {
        this.smallestNum = this.getNumFromUser(
            'Enter the smallest number in the search range', 
            Number.NEGATIVE_INFINITY, 
            Number.POSITIVE_INFINITY
        )

        this.biggestNum = this.getNumFromUser(
            'Enter the biggest number in the search range', 
            this.smallestNum + 1, 
            Number.POSITIVE_INFINITY
        
        )
    },
    promptGameStart() {
        let message = 'Can YOU guess the number?\nPress OK to challenge your binary search abilities!'
        let start = window.confirm(message)
        if(start) {
            game.play()
        }
    },
    render(guess) {
        if(guess === this.secretNum) {
            this.winGame()
            this.promptForNewGame()
        } else {
            this.updateRange(guess)
            this.showHint(guess)
        }
    },
    showHint(guess) {
        let hint = (guess > this.secretNum) ? 'high' : 'low'
        let prevGuessesString = this.prevGuesses.join(' ')
        window.alert(`Your guess is too ${hint}\nPrevious guesses: ${prevGuessesString}`)    
    },
    updateRange(guess) {
        (guess > this.secretNum) ? this.biggestNum = guess : this.smallestNum = guess
    },
    winGame() {
        let numberOfGuess = this.prevGuesses.length
        window.alert(`Congrats! You guessed the number in ${numberOfGuess} guesses!`)
    },
}

game.promptGameStart()
