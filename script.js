

// variables

// Question, All done, & Highscores titles
var newTitle = document.createElement("h2");

// Return to Start screen button
var returnBtn = document.createElement("button");

// Clear highscores button
var clearBtn = document.createElement("button");

// Container for question choice buttons, final score & initials form, and highscores
var choiceAndScoreDiv = document.createElement("div");

// Container for Correct/Incorrect notifications
var outcomeDiv = document.createElement("div");;

// Container for final score and highscores
var scoreDiv = document.createElement("div");

// Form where intials are entered for logging highscores
var initialsForm = document.createElement("form");

// Text box where user can input initials for highscore list
var initialsInput = document.createElement("input");

// Submit button for initials form
var initialsSubmit = document.createElement("button");

// View highscores link
var viewHighScores = document.getElementById("view-high-scores");

// Start quiz button
var startButton = document.getElementById("start-quiz-btn");

// Timer value
var timerSpan = document.getElementById("timer");

var headerElement = document.querySelector("header");

var mainElement = document.querySelector("main");

// Groups all start screen elements
var startScreen = document.getElementsByClassName("startScreen");

// Initial value for array of question choice buttons
var choiceBtnArr = [];

// Initial value for question counter variable
var j = 0;

// Returns amount of questions in question array (beginning with 0)
var choicesArrLength = questions[j].choices.length;

// Initial value of timer at start of quiz
var timer = questions.length * 15;

// Grabs highscores list from local storage and converts strings to object
var highScores = JSON.parse(localStorage.getItem("highScores"));

// Defines runTimer variable to be called on by stopTimer() to stop timer
var runTimer = "";



// set attributes

choiceAndScoreDiv.setAttribute("id", "choice-score");

outcomeDiv.setAttribute("id", "outcome");

scoreDiv.setAttribute("id", "score-div");

initialsForm.setAttribute("id", "initials-form");

initialsInput.setAttribute("type", "text");

initialsSubmit.setAttribute("type", "submit");

initialsSubmit.setAttribute("class", "btn btn-info");

returnBtn.setAttribute("id", "returnBtn");

returnBtn.setAttribute("class", "btn btn-info");

clearBtn.setAttribute("id", "clearBtn");

clearBtn.setAttribute("class", "btn btn-info");



// Text content

initialsSubmit.textContent = "Submit";

initialsForm.innerHTML = "Enter initials:";

returnBtn.textContent = "Return to Start";

clearBtn.textContent = "Clear Highscores";



// Global loops

// Generates question choice buttons on page load
for (i = 0; i < choicesArrLength; i++) {

    choiceBtnArr = document.createElement("button");

    choiceBtnArr.setAttribute("id", i);

    choiceBtnArr.setAttribute("class", "btn btn-info choice-btn");

    choiceAndScoreDiv.appendChild(choiceBtnArr);

};



// functions

// Triggers next question to be displayed following completion of previous question
function nextQuestion() {

    var next = true;

    while (next && j < questions.length) {

        newTitle.textContent = questions[j].title;

        for (k = 0; k < choicesArrLength; k++) {

            document.getElementById(k).textContent = questions[j].choices[k];

        };

        j++;

        next = false;

    };

}

// Shows highscores from local storage
function showHighScores() {

    highScores.sort(function(a, b) {

        return b.score - a.score;

    });

    localStorage.setItem("highScores", JSON.stringify(highScores));

    headerElement.textContent = "";

    newTitle.textContent = "Highscores";

    scoreDiv.textContent = "";

    for (var n = 0; n < highScores.length; n++) {

        var eachScoreDiv = document.createElement("div");

        eachScoreDiv.setAttribute("id", n);

        var user = highScores[n].user.toUpperCase();

        var eachHighScore = user + ": " + highScores[n].score;

        scoreDiv.append(eachScoreDiv);

        document.getElementById(n).append(eachHighScore);

    }

    choiceAndScoreDiv.append(returnBtn);

    choiceAndScoreDiv.append(clearBtn);

}

// Incrementally subtracts time from timer
function decreaseTime() {

    if (timer !== 0) {

            timer--;

            timerSpan.textContent = timer;

    } else {

        return;

    };

}

// Stops timer
function stopTimer() {

    clearInterval(runTimer);

}



// on click events

// Shows high scores page when View Highscores link is selected
viewHighScores.addEventListener("click", function(event) {

    event.preventDefault();

    if (highScores === null) {

        alert("No highscores on file. Please complete a quiz and submit your score in order to view the highscores list.");

    } else {
    
        mainElement.textContent = "";

        mainElement.append(newTitle);

        mainElement.append(choiceAndScoreDiv);

        choiceAndScoreDiv.textContent = "";

        choiceAndScoreDiv.append(scoreDiv);

        showHighScores();

    }

});

// Starts quiz and timer
startButton.addEventListener("click", function() {

    timerSpan.textContent = timer;

    runTimer = setInterval(decreaseTime, 1000);

    mainElement.textContent = "";

    mainElement.appendChild(newTitle);

    mainElement.appendChild(choiceAndScoreDiv);

    mainElement.appendChild(outcomeDiv);

    nextQuestion();

});

// Determines whether correct or incorrect answer is selected upon choice button click, subtracts additional time if incorrect, and displays "All Done" screen once last question is answered
mainElement.addEventListener("click", function(event) {

    if (event.target.classList.contains("choice-btn")) {

        if (event.target.textContent === questions[j - 1].answer) {

            outcomeDiv.innerHTML = "<hr> Correct!";

        } else {

            outcomeDiv.innerHTML = "<hr> Incorrect";

            if (timer >= 15) {

                timer = timer - 15;

            } else {

                timer = 0;

            }

        }

        setTimeout(function() {

            outcomeDiv.innerHTML = "";

        }, 1000);

        if (j < questions.length) {
            
            nextQuestion();

        } else {

            timerSpan.textContent = timer;

            stopTimer();

            choiceAndScoreDiv.textContent = "";

            newTitle.textContent = "All Done!";

            scoreDiv.textContent = "Your final score is " + timer + ".";

            choiceAndScoreDiv.appendChild(scoreDiv);

            choiceAndScoreDiv.appendChild(initialsForm);

            initialsForm.appendChild(initialsInput);

            initialsForm.appendChild(initialsSubmit);

        }

    };

});

// Checks that initials entered are non-numerical and 3 characters long & stores initials and score in highscores array
initialsSubmit.addEventListener("click", function(event) {

    event.preventDefault();

    var firstInitial = initialsInput.value.charAt(0);

    var secondInitial = initialsInput.value.charAt(1);

    var thirdInitial = initialsInput.value.charAt(2);

    if (isNaN(firstInitial) && isNaN(secondInitial) && isNaN(thirdInitial) && initialsInput.value.length === 3) {
    
        if (highScores === null) {

            highScores = [];

        };

        highScores.push({

            user: initialsInput.value.trim(),
            score: timer

        });

        choiceAndScoreDiv.removeChild(document.getElementById("initials-form"));

        showHighScores();

    } else {

        alert("Please enter exactly 3 letters and/or special characters.");

    }

});

// Displays start screen when "Return to Start" is clicked
returnBtn.addEventListener("click", function() {

    location.reload();

});

// Clears highscores from local storage when "Clear Highscores" button is clicked
clearBtn.addEventListener("click", function() {

    localStorage.clear();

    scoreDiv.innerHTML = "";

});