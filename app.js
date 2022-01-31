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
    title: 'NUMANJI',
    // Methods of game
    generateSecretNumber() {
        this.secretNum = Math.floor(
            Math.random() * 
            (this.biggestNum - this.smallestNum + 1)
        ) + this.smallestNum
    },
    getGuess() {        
        let message = 
`~=~= ADVENTURER =~=~
ENTER A GUESS BETWEEN THE NUMBERS
${this.smallestNum} AND ${this.biggestNum}, JUST DON'T BLUNDER!`
        let guess = this.getNumFromUser(message)
        return guess
    },
    getNumFromUser(message, minNum = Number.NEGATIVE_INFINITY, maxNum = Number.POSITIVE_INFINITY) {
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
        // Main game
        let newGuess = null
        do {
            newGuess = this.getGuess()
            this.prevGuesses.push(newGuess)
            this.render(newGuess)
            if(newGuess !== this.secretNum) {
                this.updateRange(newGuess)
            }
        } while(newGuess !== this.secretNum)
        // Once number is guessed
        this.promptForNewGame()
        return
    },
    promptForNewGame() {
        let newGame = window.confirm('Play again?')
        if (newGame) {
            game.play()
        }
    },
    promptForNumanji() {
        let input
        do {
            input = window.prompt('CALL OUT ITS NAME!')
            input = input.toUpperCase()
        } while(input !== 'NUMANJI')
    },
    promptForRange() {
        this.smallestNum = this.getNumFromUser('Enter the smallest number NUMANJI should think of...')

        this.biggestNum = this.getNumFromUser('Enter the biggest number NUMANJI should think of...', this.smallestNum + 1)
    },
    promptGameStart() {
       // let message = 'Can YOU guess the number?\nPress OK to challenge your binary search abilities!'
        let message =
`~=~=~= NUMANJI =~=~=~
A GAME FOR THOSE WHO SEEK TO FIND
A RANDOM NUMBER PRE-DEFINED
~= ADVENTURERS BEWARE =~
DO NOT BEGIN UNLESS YOU INTEND TO FINISH!
THE EXCITING CONSEQUENCES OF
THE GAME WILL VANISH ONLY WHEN
A PLAYER HAS GUESSED NUMANJI 
AND CALLED OUT ITS NAME`
        let start = window.confirm(message)
        if(start) {
            game.play()
        }
    },
    render(guess) {
        if(guess === this.secretNum) {
            this.renderWin()
            this.promptForNumanji()

        } else {
            this.renderHint(guess)
        } 
    },
    renderHint(guess) {
        let hint
        if(guess > this.secretNum){
            hint = 
`THE CODE YOU WROTE DOES NOT LOOK D.R.Y.
~= YOU GUESSED A NUMBER WAY TOO HIGH =~`
        } else {
            hint =
`CLEAR YOUR CACHE, YOUR BROWSER IS SLOW
~= YOU GUESSED A NUMBER THAT IS LOW =~`
        }
        let prevGuessesString = this.prevGuesses.join(' ')
        window.alert(`${hint}\nPrevious guesses: ${prevGuessesString}`)   
    },
    updateRange(guess) {
        (guess > this.secretNum) ? this.biggestNum = guess : this.smallestNum = guess
    },
    renderWin() {
        let numberOfGuess = this.prevGuesses.length
        window.alert(`You have guessed NUMANJI in ${numberOfGuess} guesses...`)
    },
}

game.promptGameStart()