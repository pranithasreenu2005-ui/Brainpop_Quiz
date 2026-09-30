// Quiz Questions Data
const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "High Text Machine Language", correct: false },
      { text: "Hyper Transfer Main Language", correct: false },
      { text: "Hyper Tool Multi Language", correct: false }
    ]
  },
  {
    question: "Which language is used for styling web pages?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: true },
      { text: "Java", correct: false },
      { text: "Python", correct: false }
    ]
  },
  {
    question: "Which JS keyword is used to declare a constant variable?",
    answers: [
      { text: "var", correct: false },
      { text: "let", correct: false },
      { text: "const", correct: true },
      { text: "static", correct: false }
    ]
  }
];

// DOM Elements
const questionElement = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score-text");
const restartButton = document.getElementById("restart-btn");
const questionContainer = document.getElementById("question-container");

let currentQuestionIndex = 0;
let score = 0;

// Initialize Quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultContainer.classList.add("hide");
  questionContainer.classList.remove("hide");
  nextButton.classList.add("hide");
  showQuestion();
}

// Display Question and Options
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    optionsContainer.appendChild(button);
  });
}

// Clear previous options
function resetState() {
  nextButton.classList.add("hide");
  while (optionsContainer.firstChild) {
    optionsContainer.removeChild(optionsContainer.firstChild);
  }
}

// Handle Answer Selection
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  // Highlight correct answer and disable all buttons
  Array.from(optionsContainer.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.classList.remove("hide");
}

// Move to next question or show results
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

// Display Final Result
function showResult() {
  questionContainer.classList.add("hide");
  nextButton.classList.add("hide");
  resultContainer.classList.remove("hide");
  scoreElement.innerText = `You scored ${score} out of ${questions.length}!`;
}

// Restart Quiz
restartButton.addEventListener("click", startQuiz);

// Start on page load
startQuiz();