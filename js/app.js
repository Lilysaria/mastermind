/*----- constants -----*/

/*----- app's state (variables) -----*/
//first generates secret code
document.addEventListener('DOMContentLoaded', function() {
let secretCode = generateSecretCode();
console.log("generated secret code:", secretCode);
let currentHoleIndex = 0;
let checkRowNumber = 0;
/*----- cached element references -----*/

const holes = document.querySelectorAll('.gameboard .hole'); 
const pegs = document.querySelectorAll('.peg');
const howToPlayButton = document.getElementById('howToPlayButton');
const howToPlayModal = document.getElementById('howToPlayModal');
const closeModalButton = document.getElementById('closeModalButton');
/*----- event listeners -----*/
    pegs.forEach((peg) => {   //adds event that gets colored peg and moves it to the hole
            peg.addEventListener('click', function() {
               
                    const color = peg.getAttribute('data-color'); 
                    holes[currentHoleIndex].setAttribute('data-color', color); 
                    holes[currentHoleIndex].style.backgroundColor = color;
                    currentHoleIndex++; //moves to the next hole
        
            });
        });
        //this function checks each row and stops each row to check
        function checkRow(row){
            let guesses = [];
            for (let i = row.start; i < row.end; i++) { 
                const color = holes[i].getAttribute('data-color'); 
                guesses.push(color);
            }
            return guesses
        }
        //this takes from row.start. James helped to create this object
const rowsCheck = {
        '0': {start: 0, end: 4},
        '1': {start: 4, end: 8},
        '2':{start: 8, end: 12},
        '3': {start: 12, end: 16},
        '4': {start: 16, end:20},
        '5': {start: 20, end:24},
        '6': {start: 24, end:28},
        '7': {start: 28, end:32},
        '8': {start: 32, end:36},
        '9': {start: 36, end:40},
        }

        howToPlayButton.addEventListener('click', function() {
            howToPlayModal.classList.remove('hidden');
            howToPlayModal.classList.add('show');
        });
        
        closeModalButton.addEventListener('click', function() {
            howToPlayModal.classList.add('hidden');
            howToPlayModal.classList.remove('show');
        });
        
/*----- functions -----*/
document.getElementById('checkButton').addEventListener('click', function() {
   
 
    console.log("guesses:",checkRow(rowsCheck[checkRowNumber])); 
    evaluateGuesses(checkRow(rowsCheck[checkRowNumber]), secretCode);
    checkRowNumber++
});

//code to generate the secret code from an array
function generateSecretCode() {
    const colors = ['#5d3fd3', '#1e90ff', '#ff77ff', '#9370db', '#00bfff', '#f0e68c'];
    let code = [];

    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * colors.length);
            code.push(colors[randomIndex]);
    }
    return code;
}

//this function starts the evaluation of the guess
function evaluateGuesses(guesses, secretCode) {
    // Compare guesses with the secret code
    let correctPosition = 0; //this variable checks if one of the colors matches exact to the secret code. If it is it increases count by 1(on the peggers). it is set to 0 because it hasnt been triggeredd
    let correctColor = 0;
    let usedIndices = []; //prevents double counting

    guesses.forEach((guess, index) => {   //for each guess iterates through the guesses array
        if (guess === secretCode[index]) {  //checks if the current guess is exactly equal to the element in secret code at the same index, if so the guess is in the correct position and color
            correctPosition++;
        } else if (secretCode.includes(guess) && !usedIndices.includes(secretCode.indexOf(guess))) {  //checks if guessed color exists anywhere in secretCode returns true if it is false if not
            correctColor++
            usedIndices.push(secretCode.indexOf (guess));
            
        }
    });
updatePeggers(correctPosition, correctColor);
youWin(correctPosition); //after evaluateGuesses
    }   //function declaration for checking if correctPosition(this makes) === 4
    function youWin (correctPosition) {
        if (correctPosition === 4) {
        console.log('you win'); 
        revealSecretCode();
        }
    }
    
    function revealSecretCode() {
        const secretCodeHoles = document.querySelectorAll('.secret-code .hole');
        for (let i = 0; i < secretCode.length; i++) {
            secretCodeHoles[i].style.backgroundColor = secretCode[i];
        }
    }
//function to update peggers
function updatePeggers(correctPosition,correctColor) {
    const allPeggers= document.querySelectorAll('.peggers')
    const peggers = allPeggers[checkRowNumber].children
    console.log(peggers)
    let correctPositionCounter = 0; //keeps track of how many peggers are red
    let correctColorCounter = 0;

    for (let i = 0; i < peggers.length; i++) {
        if (correctPositionCounter < correctPosition) { //if the correctPositionCounter is less than the correctPosition value (the number of guesses that are exactly right), the function colors a peg red to indicate a correct guess
            peggers[i].style.background = 'red';
            correctPositionCounter++; 
        } else if 
        (correctColorCounter < correctColor) {
            peggers[i].style.background = 'white';
            correctColorCounter++;
        }
    }
}
    });

/*pseudocode for checking if all peggers are red
if any rowCheck 

check if "any" div.peggers are all red maybe using the some () 
     allPeggers.addEventListener('click')
               const ifAllAreRed = updatePeggers.peggers.correctPositionCounter('red'); 
               console.log()
                   
    */
    



//function to check if any of the peggers are all red indicating a win!
/*MODEL?
const gameState = {
    secretCode: generateSecretCode(),
    guesses: [], 
    win: false 

    CONTROLLER: (function)

    VIEW:
    function updateViewWinCondition() {
    if (gameState.win) {
        // Display win message
        alert("congratulations, you've won!");
    */
 






//generate key holes
//function will compare the current state of rows and compare it to the secret code
// remember the function should be called after each move
 

/* sources and helpful information
~ https://git.generalassemb.ly/SEI-CC/sei-1-22-wc/blob/main/Unit_1/project-1/guide-to-building-a-browser-game.md
~ https://www.taniarascia.com/javascript-mvc-todo-app/
~ https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
~ https://www.codecademy.com/article/mvc
~ https://en.wikipedia.org/wiki/Mastermind_(board_game)
~ https://www.archimedes-lab.org/mastermind.html
~ https://codepen.io/yaylenny/pen/pJMepR borrowed some css from this one for the peggers class
~ https://git.generalassemb.ly/SEI-CC/sei-1-22-wc/blob/main/Unit_1/project-1/project-1-requirements.md
~ possible sources: https://www.youtube.com/watch?v=Z1Q75v-Pi3g&ab_channel=SteamCode
*/

/* thoughts so far
I think my code lacks a clear separation of concerns and data centric approach that makes up mvc
methods i've used i still need to read on: 
Element.style.backgroundColor 
Math.random
math.floor
Array.prototype.includes 
Array.prototype.push


const model = {
          secretCode: []
    guesses: []
            feedback: []

*/
