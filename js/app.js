/*----- constants -----*/

/*----- app's state (variables) -----*/
document.addEventListener('DOMContentLoaded', function() {
let secretCode = generateSecretCode();
console.log("generated secret code:", secretCode);
let currentHoleIndex = 0;
let checkRowNumber = 0;
/*----- cached element references -----*/

const holes = document.querySelectorAll('.gameboard .hole'); 
const pegs = document.querySelectorAll('.peg');
/*----- event listeners -----*/
    pegs.forEach((peg) => {
            peg.addEventListener('click', function() {
               
                    const color = peg.getAttribute('data-color'); 
                    holes[currentHoleIndex].setAttribute('data-color', color); 
                    holes[currentHoleIndex].style.backgroundColor = color;
                    currentHoleIndex++;
        
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
        //this takes from row.start
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
/*----- functions -----*/
document.getElementById('checkButton').addEventListener('click', function() {
   
 
    console.log("guesses:",checkRow(rowsCheck[checkRowNumber])); 
    evaluateGuesses(checkRow(rowsCheck[checkRowNumber]), secretCode);
    checkRowNumber++
});


function generateSecretCode() {
    const colors = ['green', 'yellow','purple','teal','red', 'blue'];
    let code = [];

    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * colors.length);
            code.push(colors[randomIndex]);
    }
    return code;
}

//this function checks gueeses from the secret code!
function evaluateGuesses(guesses, secretCode) {
    // Compare guesses with the secret code
    let correctPosition = 0; //this variable checks if one of the colors matches exact to the secret code. If it is it increases count by 1(on the peggers). it is set to 0 because it hasnt been triggeredd yet
    let correctColor = 0;
    let usedIndices = [];

    guesses.forEach((guess, index) => {
        if (guess === secretCode[index]) {
            correctPosition++;
        } else if (secretCode.includes(guess) && !usedIndices.includes(secretCode.indexOf(guess))) {
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
        }
    }
//function to update peggers
function updatePeggers(correctPosition,correctColor) {
    const allPeggers= document.querySelectorAll('.peggers')
    const peggers = allPeggers[checkRowNumber].children
    console.log(peggers)
    let correctPositionCounter = 0;
    let correctColorCounter = 0;

    for (let i = 0; i < peggers.length; i++) {
        if (correctPositionCounter < correctPosition) {
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