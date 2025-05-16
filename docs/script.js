let questions = [];
let current = 0;
let score = 0;
let answeredCount = 0;

window.onload = () => {
  const startButton = document.getElementById("start-button");
  const questionScreen = document.getElementById("question-screen");
  const startScreen = document.getElementById("start-screen");
  const finalScreen = document.getElementById("final-screen");
  const questionText = document.getElementById("question-text");
  const btnCorrect = document.getElementById("btn-correct");
  const btnWrong = document.getElementById("btn-wrong");
  const btnSkip = document.getElementById("btn-skip");
  const btnContinue = document.getElementById("btn-continue");
  const btnRestart = document.getElementById("btn-restart");
  const finalScore = document.getElementById("final-score");

  startButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    questionScreen.style.display = "flex";
    showQuestion();
  });

  btnCorrect.addEventListener("click", () => handleAnswer(true));
  btnWrong.addEventListener("click", () => handleAnswer(false));
  btnSkip.addEventListener("click", () => nextQuestion());
  btnContinue.addEventListener("click", () => {
    finalScreen.style.display = "none";
    questionScreen.style.display = "flex";
    score = 0;
    answeredCount = 0;
    shuffleQuestions();
    showQuestion();
  });
  btnRestart.addEventListener("click", () => location.reload());

  if (window.allQuestions) {
    questions = [...window.allQuestions];
    shuffleQuestions();
  }
};

function shuffleQuestions() {
  questions.sort(() => Math.random() - 0.5);
  current = 0;
}

function showQuestion() {
  if (questions.length === 0) return;
  const questionText = document.getElementById("question-text");
  questionText.textContent = questions[current].question;
}

function handleAnswer(isCorrect) {
  if (isCorrect) score++;
  answeredCount++;
  if (answeredCount === 5) {
    showScore();
    return;
  }
  nextQuestion();
}

function nextQuestion() {
  current = (current + 1) % questions.length;
  showQuestion();
}

function showScore() {
  document.getElementById("question-screen").style.display = "none";
  document.getElementById("final-screen").style.display = "flex";
  document.getElementById("final-score").textContent = `Você acertou ${score} de 5 perguntas respondidas.`;
}
