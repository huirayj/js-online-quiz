var startButton = document.querySelector('#start');
var submitButton = document.querySelector('#submit');
var quizContainerEle = document.querySelector("#quiz-container");
var questionEle = document.querySelector('#question');
var answerButtons = document.querySelector('#answer-buttons');
var scoreEle = document.querySelector('#score');
var h1Ele = document.querySelector("h1");
var pEle = document.querySelector('#progress');
var nameInput = document.querySelector("#name");

var aEele = document.querySelector("a");
var olEle = document.querySelector('#test');

var scoreboard = [];
var timeLeft;
var timeInterval;

function startQuiz() {
    questionIndex = 0;

    nameInput.value = '';
    h1Ele.innerHTML = "Javascript Speed Quiz";
    startButton.classList.add('hide');
    scoreEle.classList.add('hide');
    answerButtons.classList.remove('hide');
    quizContainerEle.classList.remove('hide');

    nextQuestion();
    countdown();
}

function nextQuestion() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }

    renderQuestion();
}

function renderQuestion(question) {
    questionEle.textContent = questionBank.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function selectAnswer(e) {
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;

    if (!correct) {
        timeLeft -= 5;
    }

    setFeedbackClass(document.body, correct);
    Array.from(answerButtons.children).forEach(button => {
        setFeedbackClass(button, button.dataset.correct)
    });

    if (currentQuestionIndex + 1 >= questionBank.length) {
        clearInterval(timeInterval);
        showScores();
    }
    questionIndex++;
    nextQuestion();
}

function setFeedbackClass(ele, correct) {
    ele.classList.remove('correct');
    ele.classList.remove('wrong');

    if (correct) {
        ele.classList.add('correct')
    } else {
        ele.classList.add('wrong')
    }
}

function showScores() {
    startButton.textContent = 'Restart'
    h1Ele.textContent = "Result";
    answerButtons.classList.add('hide');
    startButton.classList.remove('hide')
    scoreEle.classList.remove('hide');
    questionEle.textContent = `Your score: ${timeLeft}`;
};

submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    scoreboard.push({
        name: nameInput.value.trim(),
        score: timeLeft
    });

    if (nameInput.value.trim().length !== 0) {
        alert("You will be remembered");
        for (var i = 0; i < scoreboard.length; i++) {
            localStorage.setItem("userScore", JSON.stringify(scoreboard[i]));
        }

        console.log(scoreboard);
    } else {
        alert("Name cannot be blank");
    }
});

function displayScore() {
    var liEle = document.createElement("li");
    var olEle = document.querySelector('ol');

    [1, 2, 3].forEach(function (item) {
        console.log(item);
        liEle.textContent = item;
        olEle.appendChild(liEle);
    });
}

var questionBank = [
    {
        question: 'What is 2 + 2?',
        answers: [
            { text: '4', correct: true },
            { text: '1', correct: false },
            { text: '10', correct: false },
            { text: '40', correct: false }
        ]
    },
    {
        question: 'What is 3 + 6?',
        answers: [
            { text: '9', correct: true },
            { text: '1', correct: false },
            { text: '10', correct: false },
            { text: '40', correct: false }
        ]
    },
    {
        question: 'What is 2 + 1?',
        answers: [
            { text: '3', correct: true },
            { text: '1', correct: false },
            { text: '10', correct: false },
            { text: '40', correct: false }
        ]
    },
    {
        question: 'What is 5 + 1?',
        answers: [
            { text: '6', correct: true },
            { text: '1', correct: false },
            { text: '10', correct: false },
            { text: '40', correct: false }
        ]
    },
    {
        question: 'What is 5 + 2',
        answers: [
            { text: '7', correct: true },
            { text: '1', correct: false },
            { text: '10', correct: false },
            { text: '40', correct: false }
        ]
    }
];