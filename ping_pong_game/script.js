// creating variables of elements using the query selector
var ball = document.getElementById("ball");
var rod1 = document.getElementById("rod1");
var rod2 = document.getElementById("rod2");
var rod1Score = document.getElementById("rod1Score");
var rod2Score = document.getElementById("rod2Score");

// for storing data in the local storage
const storeName = "Pleyer";
const storeScore = "MaxScore";
const rod1Name = "Player A";
const rod2Name = "Player B";

// creating variables for keeping track of score
let score1 = 0;
let score2 = 0;
let maxScore = 0;

let isMoving = false;
let windowHeight = window.innerHeight;
let windowWidth  = window.innerWidth;

// starting popup
alert("Use Enter to start and 'A' and 'D' keys to move");

// when any key is pressed
window.addEventListener("keypress", function(event) {
    let rodSpeed = 15;
    let ballXSpeed = 3;
    let ballYSpeed = 3;
    let rod = rod1.getBoundingClientRect();

    //if enter is pressed
    if(event.key==='Enter') {
        if(!isMoving) {
            isMoving = true;

            let ballX = ball.getBoundingClientRect().x;
            let ballY = ball.getBoundingClientRect().y;
            let ballZ = ball.getBoundingClientRect().width;

            let rod1Height = rod1.offsetHeight;
            let rod2Height = rod2.offsetHeight;
            let rod1Width = rod1.offsetWidth;
            let rod2Width = rod2.offsetWidth;

            startMoving = setInterval(function() {
                ballX += ballXSpeed;
                ballY += ballYSpeed;

                ball.style.left = ballX +"px";
                ball.style.top = ballY +"px";

                rod1X = rod1.getBoundingClientRect().x;
                rod2X = rod2.getBoundingClientRect().x;

            // if the ball touches the side boundary
                if(ballX+ballZ >=windowWidth || ballX<=0) {
                    // change in direction
                    ballXSpeed = -ballXSpeed;
                }

                let ballPos = ballX + ballZ / 2;

            // Checking for Rod 1
                if (ballY < rod1Height) {
                    // Changing ball direction in the opposite direction
                    ballYSpeed = -ballYSpeed; 
                    score1++;
                    rod1Score.innerHTML = score1;


                    // Checking if any of the rod losses
                    if ((ballPos < rod1X) || (ballPos > (rod1X + rod1Width))) {
                        winner("Player B", score2);
                    }
                }

            // Checking for Rod 2
                else if ((ballY + ballZ) >= (windowHeight - rod2Height)) {
                    // Changing ball direction in the opposite direction
                    ballYSpeed = -ballYSpeed;
                    score2++;
                    rod2Score.innerHTML = score2;

                    // Checking if any of the rod losses
                    if ((ballPos < rod2X) || (ballPos > (rod2X + rod2Width))) {
                        winner("Player A", score1);
                    }
                }

            }, 10)
        }
    }
    // if d is pressed
    else if(event.key==='d') {
        if(rod.x + rod.width <= windowWidth) {
            rod1.style.left = rod.x + rodSpeed +"px";
            rod2.style.left = rod.x + rodSpeed +"px";
        }
    }
    // if a is pressed 
    if(event.key==='a') {
        if(rod.x >= 0) {
            rod1.style.left = rod.x - rodSpeed +"px";
            rod2.style.left = rod.x - rodSpeed +"px";
        }
    }

})


// After Winning Display Score
function winner(rod, score) {
    console.log("rod name is " +rod + "Score is " + score)
    if (score > maxScore) {
        maxScore = score;
        localStorage.setItem(storeName, rod);
        localStorage.setItem(storeScore, maxScore);
    }
    clearInterval(startMoving);
    reset(rod);

    alert(rod +" wins with a score of " +score +". Max Score is: " +maxScore);

}

// reset the screen
function reset(rod) {
    score1 = 0;
    score2 = 0;
    rod1Score.innerHTML = score1;
    rod2Score.innerHTML = score2;
    isMoving = false;

    rod1.style.left = (window.innerWidth - rod1.offsetWidth) / 2 + 'px';
    rod2.style.left = (window.innerWidth - rod2.offsetWidth) / 2 + 'px';
    ball.style.left = (windowWidth - ball.offsetWidth) / 2 + 'px';

    // Whoever losses the game get's the ball next time
    if (rod === rod2Name) {
        ball.style.top = (rod1.offsetTop + rod1.offsetHeight) + 'px';
        ballSpeedYAxis = 3;
    } else if (rod === rod1Name) {
        ball.style.top = (rod2.offsetTop - rod2.offsetHeight) + 'px';
        ballSpeedYAxis = -3;
    }

}