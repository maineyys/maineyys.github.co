// Scroll to the next section
function scrollToNext(nextId) {
    const nextSection = document.getElementById(nextId);
    if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
        console.error(`Section with ID "${nextId}" not found.`);
    }
}

// Scroll back to the first section
function scrollToStart() {
    const firstSection = document.getElementById("page1");
    if (firstSection) {
        firstSection.scrollIntoView({ behavior: "smooth" });
    } else {
        console.error(`Section with ID "page1" not found.`);
    }
}

// Quiz functions
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const quizContainer = document.getElementById("quiz-container");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");
const endPage = document.getElementById("page13");

let currentQuestionIndex = 0;
let score = 0;

// Quiz questions
const questions = [
    { question: "What does AI stand for?", answers: ["Automated Intelligence", "Artificial Intelligence", "Advanced Internet"], correct: 1 },
    { question: "What does Gen AI do?", answers: ["Generate new content from scratch without any references", "Uses existing online content to create new content based on user input.", "Only analyzes and summarizes existing content without any modifications."], correct: 1 },
    { question: "How does AI gather information?", answers: ["By analysing large amounts of data", "By asking humans directly", "By reading books"], correct: 0 },
    { question: "What is a key feature of Generative AI?", answers: ["It can create new music, art, and text by learning patterns from existing content.", "It can perform physical tasks like a robot.", "It only provides search results without any creative input."], correct: 0 },
    { question: "Which of the following best describes the function of Generative AI?", answers: ["It combines elements from existing data to generate new and creative outputs.", "It creates original research papers independently.", "It only translates text from one language to another."], correct: 0 },
];

// Start quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    startBtn.style.display = "none";
    quizContainer.style.display = "flex";
    nextBtn.style.display = "block";
    scoreEl.style.display = "none";

    loadQuestion();
}

function loadQuestion() {
    answersEl.innerHTML = "";
    const questionObj = questions[currentQuestionIndex];
    questionEl.textContent = questionObj.question;

    questionObj.answers.forEach((answer, index) => {
        const label = document.createElement("label");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "answer";
        radio.value = index;

        label.appendChild(radio);
        label.appendChild(document.createTextNode(" " + answer));
        answersEl.appendChild(label);
    });

    nextBtn.textContent = currentQuestionIndex === questions.length - 1 ? "Submit Quiz" : "Next Question";
}

// Handle next question or submit quiz
function handleNextOrSubmit() {
    const selectedOption = document.querySelector("input[name='answer']:checked");

    if (!selectedOption) {
        alert("Please select an answer first!");
        return;
    }

    if (parseInt(selectedOption.value) === questions[currentQuestionIndex].correct) {
        score++;
    }

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        endQuiz();
    }
}

// End quiz
function endQuiz() {
    quizContainer.style.display = "none";
    nextBtn.style.display = "none";
    startBtn.style.display = "block";
    startBtn.textContent = "Restart Quiz";

    scoreEl.textContent = `You scored ${score} out of ${questions.length}!`;
    scoreEl.style.display = "block"; // Make sure the score is displayed
    
    // Show the end page
    endPage.classList.remove("hidden");
}

// Attach event listeners
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", handleNextOrSubmit);
