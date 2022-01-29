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
        // 1) Generate a secret number
        this.setSmallestNum()
        this.setBiggestNum()

        this.secretNum = Math.floor(Math.random() * 
        (this.biggestNum - this.smallestNum + 1)) + this.smallestNum

        // 2) Ask the user for a guess while guess is not the secret number
        // track all the guesses in an array
        let newGuess = null
        do {
            newGuess = this.getGuess()
            this.prevGuesses.push(newGuess)
            this.render(newGuess)
        } while(newGuess !== this.secretNum)

    },
    getGuess() {        
        let message = `Enter a guess between ${this.smallestNum} and ${this.biggestNum}`
        let guess = this.getNumFromUser(message, this.smallestNum, this.biggestNum)

        return guess
    },
    render(guess) {
        if(guess === this.secretNum) {
            let numberOfGuess = this.prevGuesses.length
            console.log(`Congrats! You guessed the number in ${numberOfGuess} guesses!`)
        } else {
            let hint = null
            if(guess > this.secretNum) {
                hint = 'high'
                this.biggestNum = guess
            } else {
                hint = 'low'
                this.smallestNum = guess
            }
            let prevGuessesString = this.prevGuesses.join(' ')
            console.log(`Your guess is too ${hint}`)
            console.log(`Previous guesses: ${prevGuessesString}`)
        }
    },
    isValidInput(input, min, max) {
        let isInRange = (input >= min && input <= max)
        let isNumber = Number.isInteger(input)
        return (isInRange && isNumber)
    },
    getNumFromUser(message, minNum, maxNum) {
        do {
            userInput = window.prompt(message)
            userInput = parseInt(userInput) // convert input to number
        } while(this.isValidInput(userInput, minNum, maxNum) === false)
        return userInput
    },
    setSmallestNum(x) {
        let message = 'Enter the smallest number'
        this.smallestNum = this.getNumFromUser(message, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)
    },
    setBiggestNum(x) {
        let message = 'Enter the biggest number'
        this.biggestNum = this.getNumFromUser(message, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)
    },
}






const testInputs = () => {
    let knownValidNumbers = []
    for(let i = game.smallestNum; i <= game.biggestNum; i++) {
        knownValidNumbers.push(i)
    }
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
        ...knownValidNumbers,
    ]

    let passed = []
    let failed = []

    for(let testCase of testCases) {
        let test = game.isValidInput(testCase, game.smallestNum, game.biggestNum)
        if(test) {
            passed.push(testCase)
        } else {
            failed.push(testCase)
        }

        // (test) ? passed.push(testCase) : failed.push(testCase)
        // Error - 'test cannot be accessed before it is defined' ??
    }

    console.log(' ================ PASSED ================ ')
    passed.forEach(passedTest => {
        console.log(passedTest)
    })

    console.log(' ================ FAILED ================ ')
    failed.forEach(failedTest => {
        console.log(failedTest)
    })

    if(knownValidNumbers.length === passed.length) {
        // I know the tests should push the numbers from knownValidNumbers to passed
        // in the same order as they are in knownValidNumbers
        let finalPass = true
        for(let i = 0; i < knownValidNumbers.length; i++) {
            if(knownValidNumbers[i] !== passed[i]) {
                console.log('Test failed. Invalid input found')
                console.log(`${passed[i]}`)
                finalPass = false
            }
        }
        if(finalPass) {
            console.log('================ PASSED ALL TESTS ================')
        } else {
            console.log('================ FAILED FINAL TEST ================')
        }
    }
}
