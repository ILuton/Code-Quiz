const button = document.querySelector(".button");
const questionEL = document.querySelector(".question");
const choicesEl = document.querySelector(".quizIntro");
const mainEl = document.querySelector("main");
const timerEL = document.querySelector(".timer");
const highScoresEl = document.querySelector(".highScores");
const quizIntroEl = document.querySelector(".quizIntro");
const fullScoreEl = document.querySelector(".fullScore");
const highScoreSubmit = document.getElementById("highSubmit")
const nameEl = document.getElementById("fname");
let answersDelete = document.getElementsByTagName("h3");
let questionIndex = 0;
let answers = document.querySelector(".answers")
let scoreEl = document.querySelector(".score");
let correctAnswer;

let score = 0;
let secondsLeft = 45;


//event listener to start quiz when start is clicked
button.addEventListener("click", startQuiz)


// function to pass to event listener 
function startQuiz () {
    setTimer()
    button.remove();
    quizIntroEl.remove();
    showQuestion();
    scoreStore();

    highScoresEl.style.visibility = "hidden";
}

// eventlistener to see if high scores is clicked


highScoresEl.addEventListener("click", function() {

    questionEL.textContent = ("High Scores")
    button.remove();
    quizIntroEl.remove();
    fullScoreEl.remove();

    let highscoreName = document.createElement("h3");
    mainEl.appendChild(highscoreName);
    highscoreName.textContent =  localStorage.getItem("name")
    

});

//timer function to start countdown after start is clicked includes if statemoent for when timer hits 0 seconds

function setTimer() {
    
    let timerInterval = setInterval(function() {
        secondsLeft--;
        timerEL.textContent = (`Timer: ${secondsLeft} Seconds Left`);

        if (secondsLeft === 0) {
            clearInterval(timerInterval);

        }

        // show game over after timer hits 0 seconds

        if (secondsLeft < 0) {

            questionEL.textContent = ("GameOver")
            clearPage();
            scoreStore();
            highScoresEl.style.visibility = "visible";
            timeLeft = clearInterval(timerInterval);
            scoreSubmit();
            

        }

        if (questionEL.textContent === "Enter Name to Save Score" ) {
            timeLeft = clearInterval(timerInterval);
        }
    }, 1000)
}


//array of questions 

const questions = [
    {
        question: "Where should a JavaScript link be placed in yout html?",
        options: [
            {text: "In the body </body> before the closing tag"},
            {text: "In the Head <head> with our CSS"},
            {text:"In the footer <footer>"},
            {text:"Anywhere is fine"},
        ],
        answer: "In the body </body> before the closing tag"


    },
//question set two
    {
        question: "Which of these is a correct JavaScript comment?",
        options: [
            {text: "// This is a comment"},
            {text: "! This is a comment"},
            {text: "! This is a comment"},
            {text: "' This is a comment'"}
        ],
        answer: "// This is a comment"
    },

//question set 3
    {
        question: "Which operator is used to assign a value to a variable?",
        options: [
            {text: "+"},
            {text: "=",},
            {text: "=="},
            {text: "==="}
        ],
        answer: "="
    },

// question set 4
    {
        question: "Which built in JavaScript method will remove the last element from an Array?",
        options: [
            {text: "push()"},
            {text: "slice()"},
            {text: "pop()", },
            {text: "cut()", }
        ],
        answer: "pop()"
    },

    // question set 5
    {
        question: "which way is the correct way to call a function?",
        options: [
            {text: "function.call();"},
            {text: "call.function;"},
            {text: "function;", },
            {text: "function();", }
        ],
        answer: "function();"
    }
        
]


//function to get questions
function showQuestion () {
    pickQuestion(questions[questionIndex])
}

//function to get questions

function pickQuestion (question) {
    questionEL.textContent = question.question;
    questionEL.style.textAlign = "center";
    
    question.options.forEach(answer => {
        let answerHolder = document.createElement("h3");
        answerHolder.textContent = answer.text;
        if (answerHolder.textContent === question.answer) 
            {answerHolder.classList.add("correct")};
        mainEl.appendChild(answerHolder);
        answerHolder.addEventListener("click", isCorrect)
    });
}

//function to see if clicked target has the correctanswer class added to it then call next question
function isCorrect(e) {
    let answerPicked = e.target

    let correctAnswer = document.querySelector(".correct");
    
    if (answerPicked === correctAnswer) {
        scorePoints();
        correctAnswer.style.backgroundColor = "green";
        setTimeout(() => { correctAnswer.style.backgroundColor = "white";}, 1000);
        clearPage();
        nextQuestion();

    } else {
        e.target.style.backgroundColor = "red";
        setTimeout(() => { e.target.style.backgroundColor = "white";}, 1000);
        wrongAnswer();
    }

}

//function to loop through array of questions and pull next out of index
function nextQuestion () {
    
    if (questionIndex < 4) {
    questionIndex = questionIndex + 1;
    showQuestion(questions[questionIndex])
    } else {
        questionEL.textContent = "Enter Name to Save Score";
        scoreStore();
        highScoresEl.style.visibility = "visible";
        scoreSubmit();
    }
}

//function to remove added h3's 
function clearPage () {

    for (let index = 0; index <= 3; index++) {
    mainEl.removeChild(mainEl.lastElementChild);
    }

}

//function to add 10points to score if correct answer is selected 

function scorePoints() {

    score += 10;
    scoreEl.textContent = score;
    scoreEl.style.backgroundColor = "green";
    setTimeout(() => { scoreEl.style.backgroundColor = "White";}, 1000);

}

//function to remove 5 points if wrong answer is picked and deducted 5 seconds from clock

function wrongAnswer() {

    score -= 5;
    scoreEl.textContent = score;
    scoreEl.style.backgroundColor = "red";
    setTimeout(() => { scoreEl.style.backgroundColor = "White";}, 1000);
    secondsLeft -= 5; 
    timerEL.style.backgroundColor = "red";
    setTimeout(() => { timerEL.style.backgroundColor = "rgb(172, 172, 172)";}, 1000);
}

//function to save name and score to local storage
function scoreStore () {

    highScoreSubmit.addEventListener("click", function () {


        scoreEl = score;

        let storeALL = nameEl.value + "             " + scoreEl;

        let firstName = "name";

        window.localStorage.setItem(firstName, storeALL);

    })
    
}

//function to show high score text box to insert name into 
function scoreSubmit () {
    highScoreSubmit.id = "#highSubmitVisible";
}
