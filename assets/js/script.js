const startButton = document.querySelector('#start-btn');
const submitButton = document.querySelector('#submit-btn');

const h1Ele = document.querySelector("h1");
const bodyEle = document.querySelector('body');
const olEle = document.querySelector('ol');
const answerContainer = document.querySelector('#answer-container');
const questionEle = document.querySelector('#question');
const nameInput = document.querySelector("#name");
const scoreEle = document.querySelector('#score');
const progressEle = document.querySelector("#progress");

let questionIndex, randomQuestions, timeLeft, timeInterval;
let scoreboard = JSON.parse(localStorage.getItem("userScore")) || [];

const questionBank = [
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
    question: 'Who developed Javascript?',
    answers: [
      { text: 'Microsoft', correct: false },
      { text: 'Virgin Galatic', correct: false },
      { text: 'Netscape', correct: true },
      { text: 'Sun Microsystems', correct: false }
    ]
  },
  {
    question: 'What operator is this \'===\'?',
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
      { text: '42', correct: false }
    ]
  },
  {
    question: 'What are cookies in relation to web development?',
    answers: [
      { text: 'Slang for person', correct: false },
      { text: 'A sweet treat', correct: false },
      { text: 'Small text files stored locally', correct: true },
      { text: 'Files on a server', correct: false }
    ]
  }
];

const startQuiz = () => {
  timeLeft = 30;
  questionIndex = 0;
  randomQuestions = questionBank.sort(() => Math.random() - 0.5);

  progressEle.textContent = `Time remaining: ${timeLeft || 30}`;
  h1Ele.textContent = "Javascript Speed Quiz";
  nameInput.value = '';
  startButton.classList.add('hidden');
  scoreEle.classList.add('hidden');
  bodyEle.classList.remove('correct', 'wrong');
  answerContainer.classList.remove('hidden');
  document.querySelector("#quiz-content").classList.remove('hidden');

  countdown();
  nextQuestion();
}

const countdown = () => {
  timeInterval = setInterval(() => {
    timeLeft--;
    progressEle.textContent = `Time remaining: ${timeLeft}`;

    if (timeLeft === 0) {
      bodyEle.classList.add('wrong');
      displayScore();
      clearInterval(timeInterval);
      progressEle.textContent = `Time's up!`;
    };
  }, 1000);
}

const nextQuestion = () => {
  // removes excess answer buttons
  answerContainer.innerHTML = '';
  renderQuestion(randomQuestions[questionIndex]);
}

// display question and makes new answer buttons
const renderQuestion = (question) => {
  if (randomQuestions.length >= questionIndex + 1) {
    questionEle.textContent = question.question;

    question.answers.forEach(answer => {
      const button = document.createElement('button');

      button.textContent = answer.text;
      button.classList.add('btn');

      answer.correct && (button.dataset.correct = answer.correct);

      button.addEventListener('click', selectAnswer);
      answerContainer.appendChild(button);
    });
  }
}

const selectAnswer = (e) => {
  let selectedAnswer = e.target;
  let correct = selectedAnswer.dataset.correct;

  !correct && (timeLeft -= 5);

  feedback(document.body, correct);
  Array.from(answerContainer.children).forEach(button => {
    feedback(button, button.dataset.correct)
  })

  if (randomQuestions.length <= questionIndex + 1) {
    clearInterval(timeInterval);
    displayScore();
  }

  questionIndex++;
  nextQuestion();
}
// changes background depending on correct answer
const feedback = (ele, correct) => {
  ele.classList.remove('correct', 'wrong');
  ele.classList.add(correct ? 'correct' : 'wrong');
}

const displayScore = () => {
  h1Ele.textContent = "Result";
  startButton.textContent = 'Restart';
  answerContainer.classList.add('hidden');
  startButton.classList.remove('hidden');
  scoreEle.classList.remove('hidden');
  questionEle.textContent = `Your score: ${timeLeft}`;
};

const submit = (e) => {
  e.preventDefault();

  scoreboard = [...scoreboard, {
    name: nameInput.value.trim(),
    score: timeLeft
  }];

  if (nameInput.value.trim().length !== 0) {
    alert("You will be remembered");
    localStorage.setItem("userScore", JSON.stringify(scoreboard));
  } else {
    alert("Name cannot be blank.");
  }
}

const displayHighScore = () => {
  //also remove empty string names
  let sortedScore = scoreboard.sort((a, b) => b.score - a.score)
    .filter(item => item.name.length !== 0);

  sortedScore.forEach(item => {
    const liEle = document.createElement("li");

    liEle.textContent = `${item.name}: ${item.score}`;
    olEle.appendChild(liEle);
  });
}

const clearHighScore = () => {
  olEle.innerHTML = "";
  localStorage.removeItem("userScore");
}

if (startButton && submitButton) {
  startButton.addEventListener('click', startQuiz);
  submitButton.addEventListener('click', submit);
}
