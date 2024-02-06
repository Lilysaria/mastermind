/*----- constants -----*/

/*----- app's state (variables) -----*/
document.addEventListener('DOMContentLoaded', function() {
let secretCode = generateSecretCode();
let currentHoleIndex = 0;
/*----- cached element references -----*/
let holes = document.querySelectorAll('.hole');
let pegs = document.querySelectorAll('.peg');
/*----- event listeners -----*/
    pegs.forEach((peg, index) =>{
            peg.addEventListener('click', () => {
                console.log("peg clicked!");
                let coloredPeg = document.createElement('div');
                coloredPeg.className = 'colored-peg';
                //coloredPeg represents the peg going in the hole
                coloredPeg.style.backgroundColor = getComputedStyle(peg).backgroundColor;
                //getComputedStyle retrieves the color of the clicked peg
                holes[currentHoleIndex].innerHTML = '';
                holes[currentHoleIndex].appendChild(coloredPeg);
                //after handling the click, below code tell it to move to the next hole
                currentHoleIndex++;
                if (currentHoleIndex === holes.length) {
                    currentHoleIndex = 0;
                }
});
});
});

/*----- functions -----*/
function generateSecretCode() {
    const colors = ['green', 'yellow','purple','teal','red', 'blue'];
    let secretCode = [];

    for (let i = 0; i < 4; i++) {
        let randomColor = colors[Math.floor(Math.random() * colors.length)]
        secretCode.push(randomColor);
    }
    return secretCode;
}

//https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle