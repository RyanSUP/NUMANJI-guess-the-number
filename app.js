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
 */

const game = {
    title: 'Guess the Number!',
    biggestNum: 100,
    smallestNum: 1,
    secretNum: null,
    prevGuesses: [],
    play() {
        this.promptForRange()
        this.generateSecretNumber()
        let newGuess = null
        do {
            newGuess = this.getGuess()
            this.prevGuesses.push(newGuess)
            this.render(newGuess)
        } while(newGuess !== this.secretNum)
    },
    promptForRange() {
        this.smallestNum = this.getNumFromUser(
            'Enter the smallest number', 
            Number.NEGATIVE_INFINITY, 
            Number.POSITIVE_INFINITY
        )

        this.biggestNum = this.getNumFromUser(
            'Enter the biggest number', 
            Number.NEGATIVE_INFINITY, 
            Number.POSITIVE_INFINITY
        
        )
    },
    generateSecretNumber() {
        this.secretNum = Math.floor(Math.random() * 
        (this.biggestNum - this.smallestNum + 1)) + this.smallestNum
    },
    getGuess() {        
        let message = `Enter a guess between ${this.smallestNum} and ${this.biggestNum}`
        let guess = this.getNumFromUser(message, this.smallestNum, this.biggestNum)
        return guess
    },
    render(guess) {
        if(guess === this.secretNum) {
            this.winGame()
        } else {
            this.updateRange(guess)
            this.showHint(guess)
        }
    },
    updateRange(guess) {
        (guess > this.secretNum) ? this.biggestNum = guess : this.smallestNum = guess
    },
    showHint(guess) {
        let hint = (guess > this.secretNum) ? 'high' : 'low'
        let prevGuessesString = this.prevGuesses.join(' ')
        window.alert(`Your guess is too ${hint}\nPrevious guesses: ${prevGuessesString}`)    
    },
    winGame() {
        let numberOfGuess = this.prevGuesses.length
        window.alert(`Congrats! You guessed the number in ${numberOfGuess} guesses!`)
    },
    isValidInput(input, min, max) {
        let isInRange = (input >= min && input <= max)
        let isNumber = Number.isInteger(input)
        return (isInRange && isNumber)
    },
    getNumFromUser(message, minNum, maxNum) {
        let userInput = null
        do {
            userInput = window.prompt(message)
            userInput = parseInt(userInput) // convert input to number
        } while(this.isValidInput(userInput, minNum, maxNum) === false)
        return userInput
    },
}





function testInputs(minValidNum, maxValidNum) {
    // The numbers in validNumbers should be the only valid inputs
    let validInputs = []
    for(let i = minValidNum; i <= maxValidNum; i++) {
        validInputs.push(i)
    }

    // Try to break it.
    // window.prompt returns a user input string.
    // I'm only expecting strings (black swan -- expect the unexpected!) 
    let testCases = [ 
        undefined, 
        null, 
        NaN, 
        Infinity, 
        false,
        true,
        {}, 
        [],
        game.biggestNum + 1,
        game.smallestNum - 1,
        'big horse neck',
        '',
        '2',
        'null',
         1.2,
        ...validInputs,
    ]

    let passed = [] // this should end up being an exact duplicate of validInputs
    let failed = []


    // run the tests
    for(let testCase of testCases) {
        let result = game.isValidInput(testCase, minValidNum, maxValidNum)
        if(result) {
            passed.push(testCase)
        } else {
            failed.push(testCase)
        }

        //(result) ? passed.push(testCase) : failed.push(testCase)
        // Error - 'cannot access result before initalization' ??
    }

    // validInputs and the passed arrays should have the same elements in the same order
    // in the same order as they are in validInputs
    if(validInputs.length === passed.length) {
        let finalPass = true
        for(let i = 0; i < validInputs.length; i++) {
            if(validInputs[i] !== passed[i]) {
                console.log('Test failed. Invalid input found')
                console.log(`${passed[i]}`)
                finalPass = false
            }
        }
        if(finalPass) {
            console.log('================ PASSED ALL TESTS ================')
        } else {
            console.log('================ FAILED TESTS ================')
        }
    }
}
