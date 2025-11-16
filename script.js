/* ============================================================
   GOOGLE SHEET ENDPOINT
============================================================ */
const APP_URL =
  "https://script.google.com/macros/s/AKfycbyTXArmFAAChhMuBdnZUP1k95aEElCadrmZavf7XuTZlPUn4j-RScEsHkoOV7B27J4qEw/exec";

/* ============================================================
   QUESTIONS (YOUR EXACT 15)
============================================================ */
const questions = [

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
    q: "नेपालमा शनिबार बिदा (Saturday holiday) कसले सुरु गरेका हुन्?<br>Who started the Saturday holiday in Nepal?",
    options: [
      "Chandra Shamsher Rana",
      "Surya Bahadur Thapa",
      "Bhim Shamsher Rana",
      "Juddha Shamsher Rana"
    ],
    correct: "Bhim Shamsher Rana"
  },

  {
    q: "Olympic Games सबैभन्दा पहिले कुन देशबाट सुरु भएका थिए?<br>Where did the Olympic Games start?",
    options: ["China", "USA", "Greece", "France"],
    correct: "Greece"
  },

  {
    q: "नेपालको कुन प्रदेशमा सबैभन्दा धेरै जिल्ला छन्?<br>Which province of Nepal has the highest number of districts?",
    options: [
      "Bagmati Province",
      "Lumbini Province",
      "Sudurpashchim Province",
      "Koshi Province (Province 1)"
    ],
    correct: "Koshi Province (Province 1)"
  },

  /* ---- Original 11 Questions ---- */
  {
    q: "नेपालमा पहिलो रेल सेवा कहाँ सञ्चालन भयो?<br>Where was Nepal’s first railway service operated?",
    options: ["Raxaul – Amlekhganj", "Birgunj – Simara", "Janakpur – Jaynagar", "Biratnagar – Rangeli"],
    correct: "Raxaul – Amlekhganj"
  },

  {
    q: "नेपालको पहिलो जलविद्युत् आयोजना कुन हो?<br>What is the first hydroelectric project of Nepal?",
    options: ["Trishuli", "Pharping", "Kulekhani", "Sunkoshi"],
    correct: "Pharping"
  },

  {
    q: "नेपालको पहिलो बैंक कुन हो?<br>What is the first bank of Nepal?",
    options: ["Nepal Rastra Bank", "Agriculture Development Bank", "Nepal Bank Limited", "Rastriya Banijya Bank"],
    correct: "Nepal Bank Limited"
  },

  {
    q: "नेपालको पहिलो संविधान कहिले जारी गरिएको थियो?<br>When was Nepal’s first constitution issued?",
    options: ["1948 A.D. (2004 B.S.)", "1951 A.D. (2008 B.S.)", "1962 A.D. (2019 B.S.)", "1990 A.D. (2047 B.S.)"],
    correct: "1948 A.D. (2004 B.S.)"
  },

  {
    q: "नेपाल संयुक्त राष्ट्रसंघ सदस्य कहिले भएको हो?<br>When did Nepal join the United Nations?",
    options: ["1950 A.D", "1955 A.D", "1957 A.D", "1961 A.D"],
    correct: "1955 A.D"
  },

  {
    q: "नेपालको पहिलो विश्वविद्यालय कुन हो?<br>What is the first university of Nepal?",
    options: ["Tribhuvan University", "Kathmandu University", "Purbanchal University", "Mid-Western University"],
    correct: "Tribhuvan University"
  },

  {
    q: "नेपाली भाषामा छायाङ्कन गरिएको पहिलो चलचित्र कुन हो?<br>What is the first Nepali-language film?",
    options: ["Aama", "Satya Harischandra", "Maitighar", "Harischandra"],
    correct: "Satya Harischandra"
  },

  {
    q: "राष्ट्रिय सभामा कति जना सदस्य हुन्छन्?<br>How many members are there in the National Assembly?",
    options: ["50", "56", "59", "60"],
    correct: "59"
  },

  {
    q: "नेपालको पहिलो जनगणना कहिले भएको हो?<br>When was Nepal’s first official census conducted?",
    options: [
      "1911 A.D., during Chandra Shumsher",
      "1941 A.D., during Judha Shumsher",
      "1952 A.D., during Tribhuvan Shah",
      "1961 A.D., during King Mahendra"
    ],
    correct: "1911 A.D., during Chandra Shumsher"
  },

  {
    q: "नेपालले SAARC चार्टर कहिले साइन गरेको थियो?<br>When did Nepal sign the SAARC Charter?",
    options: ["8 December 1985", "6 January 1984", "10 December 1986", "1 November 1985"],
    correct: "8 December 1985"
  },

  {
    q: "नेपालको पहिलो आन्तरिक उडान कहिले भएको हो?<br>When was Nepal’s first domestic flight conducted?",
    options: [
      "1949 A.D., Kathmandu–Pokhara",
      "1950 A.D., Kathmandu–Biratnagar",
      "1950 A.D., Kathmandu–Simara",
      "1951 A.D., Kathmandu–Janakpur"
    ],
    correct: "1950 A.D., Kathmandu–Simara"
  }
];

/* ============================================================
   SHUFFLE QUESTIONS
============================================================ */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
shuffle(questions);
questions.forEach(q => shuffle(q.options));

/* ============================================================
   STATE VARIABLES
============================================================ */
let current = 0;
let answers = {};
let reviewSet = new Set();
let alreadySubmitted = false;

/* ============================================================
   SHOW POPUP ON LOAD
============================================================ */
window.onload = () => {
  document.getElementById("rulesPopup").style.display = "flex";
  document.getElementById("startScreen").classList.remove("hidden");
  document.body.classList.add("popup-active");

  document.getElementById("startExamBtn").onclick = beginExam;
};

/* Close popup */
function closeRules() {
  document.getElementById("rulesPopup").style.display = "none";
  document.body.classList.remove("popup-active");
  document.getElementById("startScreen").classList.remove("hidden");
}

/* ============================================================
   BEGIN EXAM
============================================================ */
function beginExam() {

  let name = document.getElementById("playerName").value.trim();
  let email = document.getElementById("playerEmail").value.trim();

  let nErr = document.getElementById("nameError");
  let eErr = document.getElementById("emailError");

  nErr.textContent = "";
  eErr.textContent = "";

  if (name === "") {
    nErr.textContent = "Full Name is required.";
    return;
  }

  let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(email)) {
    eErr.textContent = "Enter a valid Email Address.";
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
   NAVIGATION LOADER
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
   TIMER
============================================================ */
let time = 600;

function startTimer() {
  let text = document.getElementById("timerText");
  let circle = document.getElementById("timerCircle");

  let timer = setInterval(() => {
    let m = Math.floor(time / 60);
    let s = time % 60;

    text.textContent = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

    circle.style.strokeDashoffset = 220 - (220 * (time / 600));

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
