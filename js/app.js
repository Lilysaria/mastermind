/*----- constants -----*/

/*----- app's state (variables) -----*/
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
                holes[currentHoleIndex].innerHTML = '';
                holes[currentHoleIndex].appendChild(coloredPeg);
                currentHoleIndex++;
                if (currentHoleIndex === holes.length) {
                    currentHoleIndex = 0;
                }
});
});


/*----- functions -----*/


//https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle