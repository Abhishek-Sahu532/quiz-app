
let currentQuestion = 0;
let score = 0;
let userName = "";
let quizData = [];
let hightScore = 0;
let selectedOption = ""; //SELECTED VALUE BY USER

//START QUIZ

async function loadQuizData() {
  console.log("Loading the questions");
  const res = await fetch("questions.json");
  quizData = await res.json();
  console.log(quizData);
  loadQuestion();
}

function loadQuestion() {
  const questionObj = quizData[currentQuestion];
  document.getElementById("question").innerText = questionObj.question;
  for (let i = 0; i < 4; i++) {
    const btn = document.getElementById(`btn${i}`); 
    btn.innerText = questionObj.options[i];

    btn.innerText = questionObj.options[i];
    btn.className = "option-btn";
    btn.disabled = false;
    btn.style.opacity = 1;
    btn.style.cursor = "default";
  }

  document.getElementById("message").innerText = "";
  document.getElementById("next-btn").style.display = "none";
}

function startQuiz() {
  userName = prompt("Enter Your Name");
  console.log(userName);
  if (userName) {
    // document.getElementById('username'.innerText) = userName;
    document.getElementById("start-page").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    loadQuizData();
  } else {
    alert("Please enter your name");
  }
}

document.getElementById("start-btn").addEventListener("click", () => {
  startQuiz();
});

//EVENT LISTENERS FOR OPTIONS
// Event listeners for the option buttons, updating score and showing whether the answer is correct or not

for (let i = 0; i < 4; i++) {
  document.getElementById(`btn${i}`).addEventListener("click", (event) => {
    selectedOption = event.target;

    if (
      quizData[currentQuestion].answer == quizData[currentQuestion].options[i]
    ) {
      console.log("Correct");
      score++;
      document.getElementById("score").innerText = score; //display the updated score
      selectedOption.className = "option-btn correct"; //update the css for the selected btn
      document.getElementById("message").innerText = "Correct Answer";
    } else {
      console.log("Wrong");

      selectedOption.className = "option-btn wrong"; //update the css for the selected btn
      document.getElementById("message").innerText = "Wrong Answer";
    }

    //FOR ONLY ONE OPTION BTN WILL BE SELECTED

    for (let j = 0; j < 4; j++) {
      document.getElementById(`btn${j}`).disabled = true;
      document.getElementById(`btn${j}`).style.opacity = 0.5;
      document.getElementById(`btn${j}`).style.cursor = "not-allowed";
    }
    selectedOption.style.opacity = 1; //ONLY ONE RIGHT BTN WILL SHOW
    document.getElementById("next-btn").style.display = "block";
  });
}

//NEXT BUTTON

document.getElementById("next-btn").addEventListener("click", (e) => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    //next questin
    loadQuestion();
    const progress = (currentQuestion / quizData.length) * 100;
    document.getElementById("progress-bar-fill").style.width = `${progress}%`;
    document.getElementById("progress-bar-text").innerText = `${Math.round(
      progress
    )}%`;
  } else {
    //end quiz
    endQuiz();
  }
});

function endQuiz() {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("score-container").style.display = "block";
  document.getElementById('final-score').innerText = score;

const scores = JSON.parse(localStorage.getItem('scores')) || [];

scores.push({
    userName: userName,
    score: score,
    date: new Date().toISOString()
})

localStorage.setItem('scores', JSON.stringify(scores))
  currentQuestion = 0;
 score = 0;
userName = "";
 quizData = [];
  selectedOption = ""; 
  
  const progress = (currentQuestion / quizData.length) * 100;
  document.getElementById("progress-bar-fill").style.width = `${progress}%`;
  document.getElementById("progress-bar-text").innerText = `${Math.round(
    progress
  )}%`;
}

document.getElementById('restart-btn').addEventListener('click',()=>{
    // console.log('clicked')
    document.getElementById("start-page").style.display = "block";
    document.getElementById("score-container").style.display = "none";
})



//highscores

 
document.getElementById('highscore-btn').addEventListener('click',(e)=>{
document.getElementById('highscore-page').style.display ='block';
document.getElementById('start-page').style.display ='none';

const scores = JSON.parse(localStorage.getItem('scores'));
scores.map((item)=>{
`<p>${item.userName} : ${item.score} on ${new Date(item.date).toLocaleDateString()} at ${new Date(
    item.date
).toLocaleTimeString()}


</p>`
} )
})