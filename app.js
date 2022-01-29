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
        // 1) Prompt user for a number
        let message = `Enter a guess between ${this.smallestNum} and ${this.biggestNum}`
        let userInput = null
        do {
            userInput = window.prompt(message)
            userInput = parseInt(userInput) // convert to number
        } while(this.validateUserInput(userInput) === false)
        return userInput
    },
    validateUserInput(input) {
        let inputIsNumber = (typeof input === 'number')
        let inputIsInRange = (input >= this.smallestNum && input <= this.biggestNum)
        return (inputIsNumber && inputIsInRange) ? input : false
    },
}


const testValidateUserInput = () => {
    let knownValidNumbers = []
    for(let i = game.smallestNum; i <= game.biggestNum; i++) {
        knownValidNumbers.push(i)
    }
    let testCases = [ 
        undefined, 
        null, 
        NaN, 
        Infinity, 
        {}, 
        [], 
        game.biggestNum + 1,
        game.smallestNum - 1,
        "bob",
        "2",
        "0",
        ...knownValidNumbers,
    ]

    let passed = []
    let failed = []

    for(let testCase of testCases) {
        let test = game.validateUserInput(testCase)
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
}
