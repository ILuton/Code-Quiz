const button = document.querySelector(".button");
const questionEL = document.querySelector(".question");
const choicesEl = document.querySelector(".quizIntro");
const mainEl = document.querySelector("main");
const answerOne = document.createElement("h3");
const answerTwo = document.createElement("h3");
const answerThree = document.createElement("h3");
const answerFour = document.createElement("h3");
const timerEL = document.querySelector(".timer");
const highScoresEl = document.querySelector(".highScores");
const quizIntroEl = document.querySelector(".quizIntro");
const fullScoreEl = document.querySelector(".fullScore");
let scoreEl = document.querySelector(".score");
let correctAnswer;

let score = 0;
let secondsLeft = 45;

//timer function

function setTimer() {
    
    let timerInterval = setInterval(function() {
        secondsLeft--;
        timerEL.textContent = (`Timer: ${secondsLeft} Seconds Left`);

        if (secondsLeft === 0) {
            clearInterval(timerInterval);

        }

        if (secondsLeft === 0) {

            answerOne.remove();
            answerTwo.remove();
            answerThree.remove();
            answerFour.remove();
        
            questionEL.textContent = ("GameOver")
        }
    }, 1000)
}

//array of questions for question set one


    function firstQuestion() {
        questionEL.textContent = ("Where should a JavaScript link be placed in yout html?")
        answerOne.textContent = ("In the body </body> before the closing tag");
        answerTwo.textContent = ("In the Head <head> with our CSS");
        answerThree.textContent = ("In the footer <footer>");
        answerFour.textContent = ("Anywhere is fine");
        choicesEl.textContent = ("");
        correctAnswer = answerOne;

    }

//function question set two


    function secondQuestion() {
        questionEL.textContent = ("Which of these is a correct JavaScript comment?")
        answerOne.textContent = ("// This is a comment");
        answerTwo.textContent = ("! This is a comment");
        answerThree.textContent = ("* This is a comment");
        answerFour.textContent = ("' This is a comment'");
        choicesEl.textContent = ("");
        correctAnswer = answerOne;
    }

//function question set 3

    function thirdQuestion() {
        questionEL.textContent = ("Which operator is used to assign a value to a variable?")
        answerOne.textContent = ('+');
        answerTwo.textContent = ("=");
        answerThree.textContent = ("==");
        answerFour.textContent = ("===");
        choicesEl.textContent = ("");
        correctAnswer = answerTwo;
    }

// function question set 4


    function fourthQuestion() {
        questionEL.textContent = ("Which built in JavaScript method will remove the last element from an Array?")
        answerOne.textContent = ('push()');
        answerTwo.textContent = ("slice()");
        answerThree.textContent = ("pop()");
        answerFour.textContent = ("cut()");
        choicesEl.textContent = ("");
        correctAnswer = answerThree;
        
    }



// function to add h3 questions to main tag
function fullQuestion() {
    mainEl.appendChild(answerOne);
    mainEl.appendChild(answerTwo);
    mainEl.appendChild(answerThree);
    mainEl.appendChild(answerFour);
}


//function to reset h3 background-color

function colorReset () {
    answerOne.style.backgroundColor = "white";
    answerTwo.style.backgroundColor = "white";
    answerThree.style.backgroundColor = "white";
    answerFour.style.backgroundColor = "white";

}

//function to add 25points to score if correct answer is selected 

function scorePoints() {

    score += 10;
    scoreEl.textContent = score;

}

//function to remove 10 points

function wrongAnswer() {

    score -= 5;
    scoreEl.textContent = score;
    secondsLeft -= 5; 
}

//function to add event lister to all h3 tags

function answerLister () {
    answerOne.addEventListener("click", function () {

        if (correctAnswer === answerOne) {
            answerOne.style.backgroundColor = "green";
            scorePoints();
            setTimeout(() => {  fourthQuestion()}, 1000); 
            setTimeout(() => {  colorReset()}, 1000); 
        } else {
            answerOne.style.backgroundColor = "red";
            wrongAnswer();
        };
    });
    

    answerTwo.addEventListener("click", function () {

        if (correctAnswer === answerOne ) {
            answerTwo.style.backgroundColor = "green";
            scorePoints();
            setTimeout(() => { colorReset()}, 1000);
            answerOne.remove();
            answerTwo.remove();
            answerThree.remove();
            answerFour.remove();
        
            questionEL.textContent = ("GameOver")
        } else {
            answerTwo.style.backgroundColor = "red";
            wrongAnswer();
        }; 
    }); 

    answerThree.addEventListener("click", function () {

        if (correctAnswer === answerThree) {
            answerThree.style.backgroundColor = "green";
            scorePoints();
            setTimeout(() => { thirdQuestion()}, 1000);
            setTimeout(() => { colorReset()}, 1000);
        } else {
            answerThree.style.backgroundColor = "red";
            wrongAnswer();
        };

    
    });

    answerFour.addEventListener("click", function () {

        if (correctAnswer === answerTwo) {
            answerThree.style.backgroundColor = "green";
            scorePoints();
            setTimeout(() => { secondQuestion()}, 1000);
            setTimeout(() => { colorReset()}, 1000);
        } else {
            answerThree.style.backgroundColor = "red";
            wrongAnswer();
        };

    
    });



};

// function to check if answer selected matches right answer



button.addEventListener("click", function() {

    fullQuestion();
    firstQuestion();
    answerLister();
    button.remove();
    setTimer();
})

highScoresEl.addEventListener("click", function() {

    questionEL.textContent = ("High Scores")
    button.remove();
    quizIntroEl.remove();
    fullScoreEl.remove();

});
