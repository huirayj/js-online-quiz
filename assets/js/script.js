let startButton = document.querySelector('#start');
let submitButton = document.querySelector('#submit');
let answerButtons = document.querySelector('#answer');
let clearButton = document.querySelector('#clear');

let h1Ele = document.querySelector("h1");
let olEle = document.querySelector('ol');
let questionEle = document.querySelector('#question');
let nameInput = document.querySelector("#name");
let scoreEle = document.querySelector('#score');
let progressEle = document.querySelector("#progress");

let randomQuestions, questionIndex, timeLeft, timeInterval;
let scoreboard = JSON.parse(localStorage.getItem("userScore")) || [];

let questionBank = [
  {
    question: 'What is negative infinity?',
    answers: [
      { text: 'A negative number divded by infinity.', correct: true },
      { text: 'Infinity in a bad mood.', correct: false },
      { text: 'A cool band name.', correct: false },
      { text: 'Infinity but cooler.', correct: false }
    ]
  },
  {
    question: 'What company developed Javascript?',
    answers: [
      { text: 'Microsoft', correct: false },
      { text: 'Virgin Galatic', correct: false },
      { text: 'Netscape', correct: true },
      { text: 'Sun Microsystems', correct: false }
    ]
  },
  {
    question: 'What is === operator?',
    answers: [
      { text: 'Grouping operator', correct: false },
      { text: 'Equality operator', correct: false },
      { text: 'A typo', correct: false },
      { text: 'Strict equality operator', correct: true }
    ]
  },
  {
    question: 'How can you convert the string of any base to an integer?',
    answers: [
      { text: 'parseInt()', correct: true },
      { text: '.toString()', correct: false },
      { text: 'abraKadabra()', correct: false },
      { text: 'alakazam()', correct: false }
    ]
  },
  {
    question: 'What is null?',
    answers: [
      { text: 'No value or object', correct: true },
      { text: 'A type of shoe', correct: false },
      { text: 'Feeling of emptiness', correct: false },
      { text: '40', correct: false }
    ]
  },
  {
    question: 'What are cookies?',
    answers: [
      { text: 'Slang for person', correct: false },
      { text: 'A sweet treat', correct: false },
      { text: 'Small text files stored locally', correct: true },
      { text: 'Files on a server', correct: false }
    ]
  }
];

const startQuiz = () => {
  let quizContainerEle = document.querySelector("#quiz-content");

  timeLeft = 30;
  progressEle.textContent = `Time remaining: ${timeLeft || 30}`;
  h1Ele.textContent = "Javascript Speed Quiz";
  nameInput.value = '';
  startButton.classList.add('hidden');
  scoreEle.classList.add('hidden');
  quizContainerEle.classList.remove('hidden');
  answerButtons.classList.remove('hidden');
  randomQuestions = questionBank.sort(() => Math.random() - 0.5);
  questionIndex = 0;
  penalty = 0;
  nextQuestion();
  countdown();
}
// removes excess answer buttons
const nextQuestion = () => {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  renderQuestion(randomQuestions[questionIndex]);
}
// display question
const renderQuestion = (question) => {
  questionEle.textContent = question.question;
  question.answers.forEach(answer => {
    let button = document.createElement('button');
    button.textContent = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtons.appendChild(button);
  });
}

const selectAnswer = (e) => {
  let selectedButton = e.target;
  let correct = selectedButton.dataset.correct;

  if (!correct) { timeLeft -= 5; }

  feedback(document.body, correct);
  Array.from(answerButtons.children).forEach(button => {
    feedback(button, button.dataset.correct)
  })
  if (randomQuestions.length <= questionIndex + 1) {
    clearInterval(timeInterval);
    showScores();
  }

  questionIndex++;
  nextQuestion();
}
// changes background depending on correct answer
const feedback = (ele, correct) => {
  ele.classList.remove('correct');
  ele.classList.remove('wrong');

  if (correct) {
    ele.classList.add('correct');
  } else {
    ele.classList.add('wrong');
  }
}

const showScores = () => {
  h1Ele.textContent = "Result";
  startButton.textContent = 'Restart'
  answerButtons.classList.add('hidden');
  startButton.classList.remove('hidden')
  scoreEle.classList.remove('hidden');
  questionEle.textContent = `Your score: ${timeLeft}`;
};

const countdown = () => {
  timeInterval = setInterval(() => {
    timeLeft--;
    progressEle.textContent = `Time remaining: ${timeLeft}`;
    if (timeLeft === 0) {
      showScores();
      clearInterval(timeInterval);
      progressEle.textContent = `Time's up!`;
    };
  }, 1000);
}

const displayHighScore = () => {
  scoreboard.forEach(item => {
    let liEle = document.createElement("li");
    liEle.textContent = `${item.name}: ${item.score}`;
    olEle.appendChild(liEle);
  });
}

function clearHighScore() {
  olEle.innerHTML = "";
  localStorage.removeItem("userScore");
}

const submit = (e) => {
  e.preventDefault();
  scoreboard.push({
    name: nameInput.value.trim(),
    score: timeLeft
  });

  if (nameInput.value.trim().length !== 0) {
    alert("You will be remembered");
    console.log(scoreboard);
    localStorage.setItem("userScore", JSON.stringify(scoreboard));
  } else {
    alert("Name cannot be blank");
  }
}

startButton.addEventListener('click', startQuiz);
submitButton.addEventListener('click', submit);
