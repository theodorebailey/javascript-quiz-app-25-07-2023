

const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answer-btn");
const nextBtn = document.getElementById("next-btn");

// console.log(questionElement);
// console.log(answerBtn);
// console.log(nextBtn);

const questions = [
    {
        question: "Which is largest animal in the world?",
        answers: [
            {
                text: "Shark", correct: false
            },
            {
                text: "Whale", correct: true
            },
            {
                text: "Elephant", correct: false
            },
            {
                text: "Giraffe", correct: false
            },
        ]
    },
    {
        question: "What is the smallest country in the world?",
        answers: [
            {
                text: "Vatican City", correct: true
            },
            {
                text: "Nepal", correct: true
            },
            {
                text: "Lithuania", correct: false
            },
            {
                text: "Burkino Faso", correct: false
            },
        ]
    },
    {
        question: "Which is largest desert in the world?",
        answers: [
            {
                text: "Gobi", correct: false
            },
            {
                text: "Sahara", correct: true
            },
            {
                text: "Kalahari", correct: false
            },
            {
                text: "Antartica", correct: true
            },
        ]
    },
    {
        question: "What is the smallest continent in the world?",
        answers: [
            {
                text: "Asia", correct: false
            },
            {
                text: "Australia", correct: true
            },
            {
                text: "Arctic", correct: false
            },
            {
                text: "Africa", correct: false
            },
        ]
    }
];

// set quiz to initial index 0
let currentQuestionIndex = 0;
// set score to 0
let score = 0;

// create function to execute on starting quiz
function startQuiz() {
    // on start quiz initial values to 0, in case quiz has been completed
    currentQuestionIndex = 0;
    score = 0;
    // set next button inner html value
    nextBtn.innerHTML = "next";
    // execute show questions functions to display quiz questions
    showQuestions();
}

// function ti display question
function showQuestions() {

    // call function before declaration
    resetState();
    // current question = questions array with current index which will be incremented
    let currentQuestion = questions[currentQuestionIndex];
    // let question number is currentQuestionIndex + 1 to display to user
    let questionNum = currentQuestionIndex + 1;
    // populate questionElements inner HTML with question number created for display purposes and access the current questions value with key question providing string data
    questionElement.innerHTML = questionNum + ". " + currentQuestion.question;

    // access current questions answers and for each item create a parameter answer to find true + false values, create a button element stored to variable setting the buttons inner html to value held in parameter answer which is each individual index stored in answers, populate the button with text in answers index
    currentQuestion.answers.forEach(answer => {

        // create button, populate button, add class to btn, and append answer buttons with created button
        const btn = document.createElement("button");
        btn.innerHTML = answer.text;
        btn.classList.add("btn");
        answerBtn.appendChild(btn);

        if (answer.correct) {
            btn.dataset.correct = answer.correct;
        }
            btn.addEventListener("click", selectAnswer);

    });
}

// resetState will remove old buttons
function resetState(){
    // set display to none on nextBtns
    nextBtn.style.display = "none";
    // while answerBtn.firstChild truthy
    while (answerBtn.firstChild) {
        // remove first child element of answerBtns
        answerBtn.removeChild(answerBtn.firstChild);
    }
}


// function selectAnswer with parameter of event.
// select button is event.target property, isCorrect is select button dataset properties correct property to find if question is true, if isCorrect is truet then the selected button is given a class of correct, else incorrect
function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
    } else {
        selectBtn.classList.add("incorrect");
    }

    Array.from(answerBtn.children).forEach(button => {
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

startQuiz();
