// For going from question to question, we are just changing the inner html of the question and the possible answers within the buttons

var startButton = document.getElementById("start-quiz-btn");

var mainElement = document.querySelector("main");

var newTitle = document.createElement("h2");

var choiceBtnArr = [];

var j = 0;

var choicesArrLength = questions[j].choices.length;

var timer = 1;

var run = "";

var choiceBtn = "";

var lineBreak = document.createElement("br");

var choiceAndScoreDiv = document.createElement("div");

var outcomeDiv = document.createElement("div");;

var scoreDiv = document.createElement("div");

var initialsForm = document.createElement("form");

var initialsInput = document.createElement("input");

var initialsSubmit = document.createElement("button");

var highScores = JSON.parse(localStorage.getItem("highScores"));

//Write function that replaces question title & choices with next question h2 & buttons, respectively. Do this by inputting value of title property of selected indice for h2 textContent & values of choices property for button textContent

function nextQuestion() {

    run = true;

    while (run && j < questions.length) {

        newTitle.textContent = questions[j].title;

        for (k = 0; k < choicesArrLength; k++) {

            document.getElementById(k).textContent = questions[j].choices[k];

        };

        j++;

        run = false;

    };

}

// When start quiz button is clicked, remove start screen elements, display first question/buttons & start timer countdown

startButton.addEventListener("click", function() {

    mainElement.textContent = "";

    mainElement.appendChild(newTitle);

    choiceAndScoreDiv.setAttribute("id", "choice-score");

    mainElement.appendChild(choiceAndScoreDiv);

    for (i = 0; i < choicesArrLength; i++) {

        choiceBtnArr = document.createElement("button");

        choiceBtnArr.setAttribute("id", i);

        choiceBtnArr.setAttribute("class", "choice-btn");

        choiceAndScoreDiv.appendChild(choiceBtnArr);

    };

    outcomeDiv.setAttribute("id", "outcome");

    mainElement.appendChild(outcomeDiv);

    nextQuestion();

    // run function that replaces question title & choices with next question h2 & buttons, respectively

});

//When user clicks a button, add 1 to the counting variable, replace previous question textContent with textContent of new question associated with the next indice, and change boolean value to stop the loop until next button is clicked

mainElement.addEventListener("click", function(event) {

    if (event.target.classList.contains("choice-btn")) {

        if (event.target.textContent === questions[j - 1].answer) {

            outcomeDiv.innerHTML = "<hr> Correct!";

        } else {

            outcomeDiv.innerHTML = "<hr> Incorrect";

        }

        setTimeout(function() {

            outcomeDiv.innerHTML = "";

        }, 1000);

        if (j < questions.length) {
            
            nextQuestion();

        } else {

            for (m = 0; m < i; m++) {

                choiceBtn = document.getElementById(m);

                choiceBtn.parentElement.removeChild(choiceBtn);

            }

            // Turn following repetitive code into functions & group variables, setAttributes, appendChild, etc. into sections to look cleaner

            newTitle.textContent = "All Done!";

            scoreDiv.setAttribute("id", "score-div");

            initialsForm.setAttribute("id", "initials-form");

            initialsInput.setAttribute("type", "text");

            initialsSubmit.setAttribute("type", "submit");

            scoreDiv.textContent = "Your final score is " + timer + ".";

            initialsSubmit.textContent = "Submit";

            choiceAndScoreDiv.appendChild(scoreDiv);

            choiceAndScoreDiv.appendChild(initialsForm);

            initialsForm.innerHTML = "Enter initials: ";

            initialsForm.appendChild(initialsInput);

            initialsForm.appendChild(initialsSubmit);

        }

    };

});

initialsSubmit.addEventListener("click", function(event) {

    event.preventDefault();

    if (highScores === null) {

        highScores = [];

    };

    highScores.push({

        user: initialsInput.value.trim(),
        score: timer

    });

    localStorage.setItem("highScores", JSON.stringify(highScores));

    newTitle.textContent = "Highscores";

    scoreDiv.textContent = "";

    choiceAndScoreDiv.removeChild(document.getElementById("initials-form"));

    console.log(highScores);

    for (var n = 0; n < highScores.length; n++) {

        var eachScoreDiv = document.createElement("div");

        eachScoreDiv.setAttribute("id", n);

        var eachHighScore = highScores[n].user + ": " + highScores[n].score;

        scoreDiv.append(eachScoreDiv);

        document.getElementById(n).append(eachHighScore);

    }

});

//If user clicked correct answer, display "Correct!" underneath the buttons of new question

    //If wrong answer, display "Incorrect" underneath the buttons and subtract 15 seconds from the timer

//Once loop completes (i.e. last question is answered), stop timer, display time remaining on timer as final score, and display text input with submit button where user can enter initials

//On submit, If no or other than initals entered, alert that 2 digit initals are needed

    //If 2 digit initals entered, add key (iniials) & value (highscore) to local storage & return all high scores from local storage

    //give user a button to clear highscores from local storage or go back to start page




