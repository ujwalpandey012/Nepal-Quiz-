/* ============================================================
   GOOGLE SHEET ENDPOINT
============================================================ */
const APP_URL =
  "https://script.google.com/macros/s/AKfycbyTXArmFAAChhMuBdnZUP1k95aEElCadrmZavf7XuTZlPUn4j-RScEsHkoOV7B27J4qEw/exec";

/* ============================================================
   YOUR 15 NEPAL GK QUESTIONS (INSIDE SCRIPT.JS ONLY)
============================================================ */
const nepal15 = [
  {
    q: "नेपालको राष्ट्रिय गान “सयौँ थुँगा फूलका हामी” मा कति शब्द र कति अक्षर छन्?<br>How many words and letters are in the National Anthem of Nepal?",
    options: [
      "47 words – 150 letters",
      "46 words – 128 letters",
      "52 words – 160 letters",
      "44 words – 120 letters"
    ],
    correct: "46 words – 128 letters"
  },

  {
    q: "नेपालमा शनिबार बिदा कसले सुरु गरेका थिए?<br>Who started Saturday holiday in Nepal?",
    options: [
      "Chandra Shamsher Rana",
      "Surya Bahadur Thapa",
      "Bhim Shamsher Rana",
      "Juddha Shamsher Rana"
    ],
    correct: "Bhim Shamsher Rana"
  },

  {
    q: "Olympic Games सबैभन्दा पहिले कहाँ सुरु भए?<br>Where did the Olympic Games start?",
    options: ["China", "USA", "Greece", "France"],
    correct: "Greece"
  },

  {
    q: "नेपालको कुन प्रदेशमा बढी जिल्ला छन्?<br>Which province of Nepal has the most districts?",
    options: [
      "Bagmati Province",
      "Lumbini Province",
      "Sudurpashchim Province",
      "Koshi Province (Province 1)"
    ],
    correct: "Koshi Province (Province 1)"
  },

  {
    q: "नेपालमा पहिलो रेल सेवा कहाँ थियो?<br>Where was Nepal’s first railway operated?",
    options: ["Raxaul – Amlekhganj", "Birgunj – Simara", "Janakpur – Jaynagar", "Biratnagar – Rangeli"],
    correct: "Raxaul – Amlekhganj"
  },

  {
    q: "नेपालको पहिलो जलविद्युत् आयोजना कुन हो?<br>What is Nepal’s first hydroelectric project?",
    options: ["Trishuli", "Pharping", "Kulekhani", "Sunkoshi"],
    correct: "Pharping"
  },

  {
    q: "नेपालको पहिलो बैंक कुन हो?<br>What is Nepal’s first bank?",
    options: ["Nepal Rastra Bank", "Agriculture Development Bank", "Nepal Bank Limited", "Rastriya Banijya Bank"],
    correct: "Nepal Bank Limited"
  },

  {
    q: "नेपालको पहिलो संविधान कहिले जारी भयो?<br>When was Nepal’s first constitution announced?",
    options: ["1948 (2004 BS)", "1951 (2008 BS)", "1962 (2019 BS)", "1990 (2047 BS)"],
    correct: "1948 (2004 BS)"
  },

  {
    q: "नेपाल संयुक्त राष्ट्र संघ कहिले सदस्य बन्यो?<br>When did Nepal join the UN?",
    options: ["1950", "1955", "1957", "1961"],
    correct: "1955"
  },

  {
    q: "नेपालको पहिलो विश्वविद्यालय कुन हो?<br>Which is the first university of Nepal?",
    options: ["Tribhuvan University", "Kathmandu University", "Purbanchal University", "Mid-Western University"],
    correct: "Tribhuvan University"
  },

  {
    q: "पहिलो नेपाली भाषाको चलचित्र कुन हो?<br>What is the first Nepali-language movie?",
    options: ["Aama", "Satya Harischandra", "Maitighar", "Harishchandra"],
    correct: "Satya Harischandra"
  },

  {
    q: "राष्ट्रिय सभामा कति सदस्य हुन्छन्?<br>How many members are in the National Assembly?",
    options: ["50", "56", "59", "60"],
    correct: "59"
  },

  {
    q: "नेपालको पहिलो जनगणना कहिले भयो?<br>When was Nepal’s first census?",
    options: ["1911", "1941", "1952", "1961"],
    correct: "1911"
  },

  {
    q: "नेपालले SAARC चार्टर कहिले साइन गर्‍यो?<br>When did Nepal sign the SAARC charter?",
    options: ["8 Dec 1985", "1984", "1986", "1983"],
    correct: "8 Dec 1985"
  },

  {
    q: "नेपालको पहिलो आन्तरिक उडान कहिले भयो?<br>When was Nepal’s first domestic flight?",
    options: ["1949", "1950 Kathmandu–Biratnagar", "1950 Kathmandu–Simara", "1951 Kathmandu–Janakpur"],
    correct: "1950 Kathmandu–Simara"
  }
];

/* ============================================================
   MERGE ALL PACKS + NEPAL15
============================================================ */
const questionBank = [
  ...pack1,
  ...pack2,
  ...pack3,
  ...pack4,
  ...pack5,
  ...pack6,
  ...pack7,
  ...pack8,
  ...pack9,
  ...pack10,
  ...nepal15 
/* ============================================================
   GET 20 RANDOM UNIQUE QUESTIONS
============================================================ */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function getRandom20() {
  let copy = [...questionBank];
  shuffle(copy);
  return copy.slice(0, 20);
}

const questions = getRandom20();

/* ============================================================
   EVERYTHING BELOW REMAINS SAME (NO CHANGE)
============================================================ */

/* STATE VARIABLES */
let current = 0;
let answers = {};
let reviewSet = new Set();
let alreadySubmitted = false;

/* SHOW POPUP */
function closeRules() {
  document.getElementById("rulesPopup").style.display = "none";
  document.body.classList.remove("popup-active");
}

/* BEGIN EXAM */
function beginExam() {
  const name = document.getElementById("playerName").value.trim();
  const email = document.getElementById("playerEmail").value.trim();

  const nameErr = document.getElementById("nameError");
  const emailErr = document.getElementById("emailError");

  nameErr.textContent = "";
  emailErr.textContent = "";

  if (name.split(" ").length < 2) {
    nameErr.textContent = "Please enter FULL NAME (first + last).";
    return;
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailPattern.test(email)) {
    emailErr.textContent = "Enter a valid Email Address.";
    return;
  }

  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("examScreen").classList.remove("hidden");

  loadNav();
  loadQuestion();
  startTimer();
  setupAntiCheat();
}

/* ============================================================
   ANTI-CHEAT ENGINE
============================================================ */
function setupAntiCheat() {

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && !alreadySubmitted) submitExam();
  });

  window.addEventListener("blur", () => {
    if (!alreadySubmitted) submitExam();
  });

  document.addEventListener("contextmenu", e => e.preventDefault());

  document.addEventListener("keydown", e => {
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) ||
      (e.ctrlKey && e.key === "U")
    ) {
      e.preventDefault();
      submitExam();
    }
  });
}

/* ============================================================
   NAVIGATION
============================================================ */
function loadNav() {
  const nav = document.getElementById("questionNav");
  nav.innerHTML = "";

  questions.forEach((_, i) => {
    let b = document.createElement("div");
    b.className = "nav-btn";
    b.innerText = i + 1;
    b.onclick = () => go(i);
    nav.appendChild(b);
  });

  updateNav();
}

function updateNav() {
  document.querySelectorAll(".nav-btn").forEach((btn, i) => {
    btn.classList.remove("active");
    if (i === current) btn.classList.add("active");
    if (reviewSet.has(i)) btn.classList.add("review");
  });
}

/* ============================================================
   QUESTION LOADER
============================================================ */
function loadQuestion() {

  updateNav();

  let q = questions[current];
  let box = document.getElementById("questionContainer");

  let html = `<h2>${current + 1}. ${q.q}</h2>`;

  q.options.forEach(opt => {
    html += `
      <label class="option">
        <input type="radio" name="q${current}" value="${opt}"
        ${answers[current] === opt ? "checked" : ""}>
        ${opt}
      </label>
    `;
  });

  box.innerHTML = html;
}

function saveAnswer() {
  let chosen = document.querySelector(`input[name="q${current}"]:checked`);
  if (chosen) answers[current] = chosen.value;
}

function nextQuestion() {
  saveAnswer();
  if (current < questions.length - 1) current++;
  loadQuestion();
}

function prevQuestion() {
  saveAnswer();
  if (current > 0) current--;
  loadQuestion();
}

function go(n) {
  saveAnswer();
  current = n;
  loadQuestion();
}

function markForReview() {
  reviewSet.add(current);
  updateNav();
}

/* ============================================================
   TIMER (15 minutes)
============================================================ */
let time = 900;  
function startTimer() {
  let text = document.getElementById("timerText");
  let circle = document.getElementById("timerCircle");

  const FULL_TIME = 900;  
  const CIRCLE_LENGTH = 220; 
  let timer = setInterval(() => {

    let m = Math.floor(time / 60);
    let s = time % 60;

    text.textContent = `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;

    // FIXED: circle animation now matches full 900 seconds
    circle.style.strokeDashoffset = CIRCLE_LENGTH - (CIRCLE_LENGTH * (time / FULL_TIME));

    if (time <= 0) {
      clearInterval(timer);
      submitExam();
    }

    time--;
  }, 1000);
}
/* ============================================================
   SUBMIT EXAM
============================================================ */
async function submitExam() {

  if (alreadySubmitted) return;
  alreadySubmitted = true;

  saveAnswer();

  document.querySelector(".btn-row").classList.add("hidden");
  document.querySelector(".top-bar").classList.add("hidden");
  document.getElementById("questionContainer").classList.add("hidden");

  let score = 0;
  let list = [];

  questions.forEach((q, i) => {
    let user = answers[i] || "Not Answered";
    let ok = user === q.correct;
    if (ok) score++;

    list.push({
      question: q.q,
      user,
      correctAns: q.correct,
      correct: ok
    });
  });

  let percent = ((score / questions.length) * 100).toFixed(2);

  let res = document.getElementById("resultBox");
  res.classList.remove("hidden");

  res.innerHTML = `
    <h2>धन्यवाद! परीक्षा सम्पन्न भयो।</h2>
    <p><strong>Score:</strong> ${score}/${questions.length}</p>
    <p><strong>Percentage:</strong> ${percent}%</p>
    <p>Your answer report is below.</p>
  `;

  buildReview(list);

  await fetch(APP_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: document.getElementById("playerName").value,
      email: document.getElementById("playerEmail").value,
      score,
      percent,
      answersDetailed: list
    })
  });
}

/* ============================================================
   REVIEW PANEL
============================================================ */
function buildReview(list) {
  let box = document.getElementById("reviewSection");
  box.classList.remove("hidden");

  let html = "";

  list.forEach((a, i) => {
    html += `
      <div class="review-card">
        <div class="review-q">${i + 1}. ${a.question}</div>
        <div class="${a.correct ? "correct-text" : "wrong-text"}">Your Answer: ${a.user}</div>
        <div class="correct-ans">Correct Answer: ${a.correctAns}</div>
      </div>
    `;
  });

  box.innerHTML = html;
}

/* ============================================================
   BUTTON EVENTS
============================================================ */
document.getElementById("nextBtn").onclick = nextQuestion;
document.getElementById("prevBtn").onclick = prevQuestion;
document.getElementById("reviewBtn").onclick = markForReview;
document.getElementById("submitBtn").onclick = submitExam;
