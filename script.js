/* ============================================================
   GOOGLE SHEET ENDPOINT
============================================================ */
const APP_URL =
  "https://script.google.com/macros/s/AKfycbyTXArmFAAChhMuBdnZUP1k95aEElCadrmZavf7XuTZlPUn4j-RScEsHkoOV7B27J4qEw/exec";

/* ============================================================
   YOUR NEPAL 15 QUESTIONS
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
    q: "Olympic Games कहाँ सुरु भए?<br>Where did the Olympic Games start?",
    options: ["China", "USA", "Greece", "France"],
    correct: "Greece"
  },
  {
    q: "नेपालको कुन प्रदेशमा बढी जिल्ला छन्?<br>Which province has the most districts?",
    options: [
      "Bagmati Province",
      "Lumbini Province",
      "Sudurpashchim Province",
      "Koshi Province (Province 1)"
    ],
    correct: "Koshi Province (Province 1)"
  },
  {
    q: "नेपालमा पहिलो रेल सेवा कहाँ थियो?<br>Where was Nepal’s first railway?",
    options: [
      "Raxaul – Amlekhganj",
      "Birgunj – Simara",
      "Janakpur – Jaynagar",
      "Biratnagar – Rangeli"
    ],
    correct: "Raxaul – Amlekhganj"
  },
  {
    q: "नेपालको पहिलो जलविद्युत् आयोजना कुन हो?<br>What is Nepal’s first hydropower project?",
    options: ["Trishuli", "Pharping", "Kulekhani", "Sunkoshi"],
    correct: "Pharping"
  },
  {
    q: "नेपालको पहिलो बैंक कुन हो?<br>What is Nepal’s first bank?",
    options: [
      "Nepal Bank Limited",
      "Nepal Rastra Bank",
      "ADB",
      "Rastriya Banijya Bank"
    ],
    correct: "Nepal Bank Limited"
  },
  {
    q: "नेपालको पहिलो संविधान कहिले जारी भयो?<br>When was Nepal's first constitution announced?",
    options: ["1948 (2004 BS)", "1951", "1962", "1990"],
    correct: "1948 (2004 BS)"
  },
  {
    q: "नेपाल संयुक्त राष्ट्र संघ कहिले सदस्य बन्यो?<br>When did Nepal join the UN?",
    options: ["1950", "1955", "1957", "1961"],
    correct: "1955"
  },
  {
    q: "नेपालको पहिलो विश्वविद्यालय कुन हो?<br>Which is Nepal’s first university?",
    options: ["Tribhuvan University", "KU", "PU", "MWU"],
    correct: "Tribhuvan University"
  },
  {
    q: "पहिलो नेपाली भाषाको चलचित्र कुन हो?<br>First Nepali-language movie?",
    options: ["Aama", "Satya Harischandra", "Maitighar", "Harishchandra"],
    correct: "Satya Harischandra"
  },
  {
    q: "राष्ट्रिय सभामा कति सदस्य हुन्छन्?<br>Members in National Assembly?",
    options: ["50", "56", "59", "60"],
    correct: "59"
  },
  {
    q: "पहिलो जनगणना कहिले?<br>When was 1st census?",
    options: ["1911", "1941", "1952", "1961"],
    correct: "1911"
  },
  {
    q: "SAARC चार्टर कहिले साइन भयो?<br>When was SAARC charter signed?",
    options: ["1984", "8 Dec 1985", "1986", "1983"],
    correct: "8 Dec 1985"
  },
  {
    q: "पहिलो आन्तरिक उडान?<br>First domestic flight?",
    options: [
      "1949",
      "1950 Kathmandu–Simara",
      "1950 Kathmandu–Biratnagar",
      "1951 Kathmandu–Janakpur"
    ],
    correct: "1950 Kathmandu–Simara"
  }
];

/* ============================================================
   MERGE ALL PACKS + NEPAL 15
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
];

/* ============================================================
   RANDOM 20 QUESTIONS
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
   STATES
============================================================ */
let current = 0;
let answers = {};
let alreadySubmitted = false;
let reviewSet = new Set();

/* ============================================================
   POPUP
============================================================ */
window.onload = () => {
  document.getElementById("rulesPopup").style.display = "flex";
  document.body.classList.add("popup-active");
};

function closeRules() {
  document.getElementById("rulesPopup").style.display = "none";
  document.body.classList.remove("popup-active");
}

/* ============================================================
   START EXAM
============================================================ */
function beginExam() {
  const name = document.getElementById("playerName").value.trim();
  const email = document.getElementById("playerEmail").value.trim();

  if (!name.includes(" ")) {
    document.getElementById("nameError").textContent = "Enter FULL NAME.";
    return;
  }

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!validEmail.test(email)) {
    document.getElementById("emailError").textContent = "Enter valid Email.";
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
   NAVIGATION + LOADING QUESTIONS
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
  document.querySelectorAll(".nav-btn").forEach((b, i) => {
    b.classList.remove("active");
    if (i === current) b.classList.add("active");
    if (reviewSet.has(i)) b.classList.add("review");
  });
}

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
      </label>`;
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
   TIMER — 15 MINUTES
============================================================ */
let time = 900;

function startTimer() {
  let circle = document.getElementById("timerCircle");
  let text = document.getElementById("timerText");
  const FULL = 900;
  const CIRCLE = 220;

  let timer = setInterval(() => {
    let m = Math.floor(time / 60);
    let s = time % 60;

    text.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    circle.style.strokeDashoffset = CIRCLE - (CIRCLE * (time / FULL));

    if (time <= 0) {
      clearInterval(timer);
      submitExam();
    }
    time--;
  }, 1000);
}

/* ============================================================
   ANTI-CHEAT
============================================================ */
function setupAntiCheat() {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && !alreadySubmitted) submitExam();
  });

  window.addEventListener("blur", () => {
    if (!alreadySubmitted) submitExam();
  });

  document.addEventListener("contextmenu", e => e.preventDefault());
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
  `;

  buildReview(list);

  await fetch(APP_URL, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: document.getElementById("playerName").value,
      email: document.getElementById("playerEmail").value,
      score: score,
      percent: percent,
      answersDetailed: list
    })
  })
  .then(res => console.log("SENT TO GOOGLE SCRIPT"))
  .catch(err => console.error("FETCH ERROR:", err));
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
        <div class="${a.correct ? "correct-text" : "wrong-text"}">
          Your Answer: ${a.user}</div>
        <div class="correct-ans">Correct Answer: ${a.correctAns}</div>
      </div>`;
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
document.getElementById("startExamBtn").onclick = beginExam;

