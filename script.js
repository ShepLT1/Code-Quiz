// For going from question to question, we are just changing the inner html of the question and the possible answers within the buttons



//Write function that replaces question title & choices with next question h2 & buttons, respectively. Do this by inputting value of title property of selected indice for h2 textContent & values of choices property for button textContent

// When start quiz button is clicked, remove start screen elements, display first question/buttons & start timer countdown

var startButton = document.getElementById("start-quiz-btn");

startButton.addEventListener("click", function() {

    var mainElement = document.body.children[1];

    var qTitle = document.createElement("h2");

    var choiceButton = [];

    mainElement.textContent = "";

    mainElement.appendChild(qTitle);

    for (i = 0; i < 4; i++) {

        choiceButton = document.createElement("button");

        choiceButton.setAttribute("id", "choice" + (i + 1));

        mainElement.appendChild(choiceButton);

    };

    // run function that replaces question title & choices with next question h2 & buttons, respectively

});

//When user clicks a button, add 1 to the counting variable, replace previous question textContent with textContent of new question associated with the next indice, and change boolean value to stop the loop until next button is clicked

//If user clicked correct answer, display "Correct!" underneath the buttons of new question

    //If wrong answer, display "Incorrect" underneath the buttons and subtract 15 seconds from the timer

//Once loop completes (i.e. last question is answered), stop timer, display time remaining on timer as final score, and display text input with submit button where user can enter initials

//On submit, If no or other than initals entered, alert that 2 digit initals are needed

    //If 2 digit initals entered, add key (iniials) & value (highscore) to local storage & return all high scores from local storage

    //give user a button to clear highscores from local storage or go back to start page




