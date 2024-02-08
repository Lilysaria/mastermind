/*----- constants -----*/

/*----- app's state (variables) -----*/
document.addEventListener('DOMContentLoaded', function() {
let secretCode = generateSecretCode();
let currentHoleIndex = 0;
/*----- cached element references -----*/

let holes = document.querySelectorAll('.gameboard .hole'); //excluded the secret code holes
let pegs = document.querySelectorAll('.peg');
/*----- event listeners -----*/
    pegs.forEach((peg) => {
            peg.addEventListener('click', function() {
                if (currentHoleIndex < 4) { 
                    let color = peg.getAttribute('data-color'); 
                    holes[currentHoleIndex].setAttribute('data-color', color); 
                    holes[currentHoleIndex].style.backgroundColor = color;
                    currentHoleIndex++;
                }
            });
        });


/*----- functions -----*/
function generateSecretCode() {
    const colors = ['green', 'yellow','purple','teal','red', 'blue'];
    let code = [];

    for (let i = 0; i < 4; i++) {
        code.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    return code;
}
//this function checks gueeses from the secret code!
document.getElementById('checkButton').addEventListener('click', function() {
    let guesses = [];
    for (let i = 0; i < 4; i++) { 
        let color = holes[i].getAttribute('data-color'); 
        guesses.push(color);
    }
    console.log("Guesses:", guesses); /
    evaluateGuesses(guesses, secretCode);
});


function evaluateGuesses(guesses, secretCode) {
    // Compare guesses with the secret code
    for (let i = 0; i < guesses.length; i++) {
        if (guesses[i] === secretCode[i]) {
            console.log(`Hole ${i+1}: Correct color and position`);
        } else if (secretCode.includes(guesses[i])) {
            console.log(`Hole ${i+1}: Correct color, wrong position`);
        } else {
            console.log(`Hole ${i+1}: Incorrect color`);
        }
    }
}
});
//generate key holes
//function will compare the current state of rows and compare it to the secret code
// remember the function should be called after each move
 
//https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle