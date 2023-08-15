// add booeing to wrong answers
// add confetti to correct answers with cheers

//  begin by targeting elements
// we have our question element, to populate with object items
const questionElement = document.getElementById("question");
// we have our button elements, to populate with answers
const answerBtn = document.getElementById("answer-btn");
// we have our next button to initiate function to repopulate with new answers
const nextBtn = document.getElementById("next-btn");
// we have our timer element to increment time
const timerEle = document.getElementById("timer");

// we will store our questions in an object
// our questions and answers will create their own divisions
// questions will be a key : value pair
// answers will be an array of answers as the value with a key
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
                text: "Nepal", correct: false
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
                text: "Sahara", correct: false
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
    },
    {
        question: "What is the smallest desert in the world?",
        answers: [
            {
                text: "Carcross", correct: true
            },
            {
                text: "Kalahari", correct: false
            },
            {
                text: "Sahara", correct: false
            },
            {
                text: "Gobi", correct: false
            },
        ]
    }
];

// set quiz to initial index 0
// we will need to on initiation set current question index to 0
let currentQuestionIndex = 0;
// set score to 0
// we will need to initiate score as 0
let score = 0;

// create function to execute on starting quiz
// startQuiz will set question index and score to 0
// will populate next button, exectue showQuestions and set our timer
function startQuiz() {
    // on start quiz initial values to 0, in case quiz has been completed
    currentQuestionIndex = 0;
    score = 0;
    // set next button inner html value
    nextBtn.innerHTML = "next";
    // execute show questions functions to display quiz questions
    showQuestions();

    startTimer(60, timerEle);

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

        // if answer with key correct is equal to true
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
    // select answer will target our event 
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        // increase score when correct
        score++;
    } else {
        selectBtn.classList.add("incorrect");
    }
    
    // for our correct answer, create array populate and idenitfy correct
    // create an array from answerBtn children elements
    // forEach element iterate through the button
    // using the button parameter as an identifier
    // if buttons data set property is correct, i.e, true
    // add the correct class
    Array.from(answerBtn.children).forEach(button => {
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        // disable the buttons
        button.disabled = true;
    });

    nextBtn.style.display = "block";
}

// show score needs to:
// resetState() to remove buttons
// display score using score + number of questions for mutability
// next button becomes play again
// change display style of nextBtn
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}.`;
    nextBtn.innerHTML = "play again";
    nextBtn.style.display = "block";
}

// next button executes x times until equal to length of questions, then it will execute showScore
function handleNextBtn() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestions();
    } else {
        showScore();
    }
}

// next button will execute a function
// 
nextBtn.addEventListener("click", ()=> {
    if (currentQuestionIndex < questions.length) {
        handleNextBtn();
    } else {
        startQuiz();
    }
});

// my created timer
function startTimer(duration, element) {
    // set time to duration, the parameter countdown (not currently used)
    let time = duration;
    // create minutes and seconds
    let minutes = 0;
    let seconds = 0;

    setInterval(function () {

        seconds = parseInt(time % 60, 10);

        seconds = seconds < 10 ? "0" + seconds : seconds;

        element.innerHTML = minutes + ":" + seconds;

        // when time is less than 0
        // time = duration
        // add 1 to minutes
        if (--time < 0) {
            time = duration;
            ++minutes;
        }
    }, 1000);
}

// execute the beggining of the quiz
startQuiz();
