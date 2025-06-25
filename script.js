// script.js  – Advanced Quiz App (random order, timer, restart)
const landingPage = document.getElementById("landing-page");
const quizPage = document.getElementById("quiz-page");
const startBtn = document.getElementById("start-btn");

startBtn.addEventListener("click", () => {
    landingPage.style.display = "none";
    quizPage.style.display = "block";
    startQuiz();
});

const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "HyperText Markup Language", correct: true },
            { text: "HyperText Markdown Language", correct: false },
            { text: "HighText Marking Language", correct: false },
            { text: "None of the above", correct: false }
        ]
    },
    {
        question: "Which language is used to style web pages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "Java", correct: false },
            { text: "Python", correct: false }
        ]
    },
    {
        question: "Inside which HTML element do we put JavaScript?",
        answers: [
            { text: "<js>", correct: false },
            { text: "<javascript>", correct: false },
            { text: "<script>", correct: true },
            { text: "<code>", correct: false }
        ]
    },
    {
        question: "What does DOM stand for?",
        answers: [
            { text: "Document Object Model", correct: true },
            { text: "Data Object Model", correct: false },
            { text: "Digital Object Management", correct: false },
            { text: "None of these", correct: false }
        ]
    },
    {
        question: "Which keyword declares a variable in JavaScript?",
        answers: [
            { text: "int", correct: false },
            { text: "var", correct: true },
            { text: "string", correct: false },
            { text: "float", correct: false }
        ]
    },
    {
        question: "Which company created JavaScript?",
        answers: [
            { text: "Netscape", correct: true },
            { text: "Microsoft", correct: false },
            { text: "Google", correct: false },
            { text: "IBM", correct: false }
        ]
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        answers: [
            { text: "//", correct: true },
            { text: "/* */", correct: false },
            { text: "#", correct: false },
            { text: "<!-- -->", correct: false }
        ]
    },
    {
        question: "Which method converts JSON data to a JavaScript object?",
        answers: [
            { text: "JSON.parse()", correct: true },
            { text: "JSON.stringify()", correct: false },
            { text: "JSON.convert()", correct: false },
            { text: "JSON.toObject()", correct: false }
        ]
    }
];

let shuffledQuestions = [];
let questionIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;

const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("time");

function startQuiz() {
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    questionIndex = 0;
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    nextBtn.innerText = "Next";
    nextBtn.style.display = "none";
    restartBtn.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    startTimer();

    const current = shuffledQuestions[questionIndex];
    questionElement.innerText = current.question;

    current.answers.forEach(ans => {
        const btn = document.createElement("button");
        btn.innerText = ans.text;
        btn.addEventListener("click", () => selectAnswer(btn, ans.correct));
        answersContainer.appendChild(btn);
    });
}

function resetState() {
    clearInterval(timer);
    timeLeft = 15;
    timerDisplay.innerText = timeLeft;
    nextBtn.style.display = "none";
    answersContainer.innerHTML = "";
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            autoSelect();
        }
    }, 1000);
}

function selectAnswer(button, correct) {
    Array.from(answersContainer.children).forEach(btn => {
        btn.disabled = true;
        const isRight = shuffledQuestions[questionIndex].answers.find(a => a.text === btn.innerText).correct;
        btn.classList.add(isRight ? "correct" : "wrong");
    });
    if (correct) score++;
    scoreDisplay.textContent = `Score: ${score}`;
    clearInterval(timer);
    nextBtn.style.display = "inline-block";
}

function autoSelect() {
    Array.from(answersContainer.children).forEach(btn => {
        const isRight = shuffledQuestions[questionIndex].answers.find(a => a.text === btn.innerText).correct;
        btn.classList.add(isRight ? "correct" : "wrong");
        btn.disabled = true;
    });
    nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
    questionIndex++;
    if (questionIndex < shuffledQuestions.length) {
        showQuestion();
    } else {
        showFinalScore();
    }
});

restartBtn.addEventListener("click", startQuiz);

function showFinalScore() {
    clearInterval(timer);
    questionElement.innerText = `🎉 You scored ${score} out of ${shuffledQuestions.length}!`;
    answersContainer.innerHTML = "";
    nextBtn.style.display = "none";
    restartBtn.style.display = "inline-block";
    scoreDisplay.textContent = "";
    timerDisplay.innerText = "0";
}


