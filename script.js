/* ============================================================
   GOOGLE SHEET ENDPOINT
============================================================ */
const APP_URL =
  "https://script.google.com/macros/s/AKfycbyTXArmFAAChhMuBdnZUP1k95aEElCadrmZavf7XuTZlPUn4j-RScEsHkoOV7B27J4qEw/exec";

/* ============================================================
   QUESTIONS (15 TOTAL)
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
    q: "नेपालमा शनिबार बिदा (Saturday holiday) कसले सुरु गरेका हुन्?<br>Who started Saturday holiday in Nepal?",
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
    q: "नेपालको कुन प्रदेशमा सबैभन्दा धेरै जिल्ला छन्?<br>Which province has the most districts?",
    options: [
      "Bagmati Province",
      "Lumbini Province",
      "Sudurpashchim Province",
      "Koshi Province (Province 1)"
    ],
    correct: "Koshi Province (Province 1)"
  },

  /* Old Questions */
  {
    q: "नेपालमा पहिलो रेल सेवा कहाँ सञ्चालन भयो?<br>Where was Nepal's first railway operated?",
    options: ["Raxaul – Amlekhganj", "Birgunj – Simara", "Janakpur – Jaynagar", "Biratnagar – Rangeli"],
    correct: "Raxaul – Amlekhganj"
  },
  {
    q: "नेपालको पहिलो जलविद्युत् आयोजना कुन हो?<br>What is Nepal's first hydroelectric project?",
    options: ["Trishuli", "Pharping", "Kulekhani", "Sunkoshi"],
    correct: "Pharping"
  },
  {
    q: "नेपालको पहिलो बैंक कुन हो?<br>What is Nepal's first bank?",
    options: ["Nepal Rastra Bank", "Agriculture Development Bank", "Nepal Bank Limited", "Rastriya Banijya Bank"],
    correct: "Nepal Bank Limited"
  },
  {
    q: "नेपालको पहिलो संविधान कहिले जारी भयो?<br>When was Nepal's first constitution issued?",
    options: ["1948 A.D. (2004 B.S.)", "1951 A.D.", "1962 A.D.", "1990 A.D."],
    correct: "1948 A.D. (2004 B.S.)"
  },
  {
    q: "नेपाल संयुक्त राष्ट्रसंघ सदस्य कहिले भएको हो?<br>When did Nepal join the UN?",
    options: ["1950", "1955", "1957", "1961"],
    correct: "1955"
  },
  {
    q: "नेपालको पहिलो विश्वविद्यालय कुन हो?<br>What is Nepal's first university?",
    options: ["Tribhuvan University", "Kathmandu University", "Purbanchal University", "Mid-Western University"],
    correct: "Tribhuvan University"
  },
  {
    q: "नेपाली भाषामा छायाङ्कन गरिएको पहिलो चलचित्र कुन हो?<br>What is the first Nepali-language film?",
    options: ["Aama", "Satya Harischandra", "Maitighar", "Harischandra"],
    correct: "Satya Harischandra"
  },
  {
    q: "राष्ट्रिय सभामा कति सदस्य छन्?<br>How many National Assembly members?",
    options: ["50", "56", "59", "60"],
    correct: "59"
  },
  {
    q: "नेपालको पहिलो जनगणना कहिले भयो?<br>When was Nepal's first census?",
    options: [
      "1911 A.D.",
      "1941 A.D.",
      "1952 A.D.",
      "1961 A.D."
    ],
    correct: "1911 A.D."
  },
  {
    q: "नेपालले SAARC चार्टर कहिले साइन गरेको थियो?<br>When did Nepal sign SAARC Charter?",
    options: ["8 Dec 1985", "6 Jan 1984", "10 Dec 1986", "1 Nov 1985"],
    correct: "8 Dec 1985"
  },
  {
    q: "नेपालको पहिलो आन्तरिक उडान कहिले भएको हो?<br>When was Nepal's first domestic flight?",
    options: [
      "1949 A.D.",
      "1950 A.D. Kathmandu–Simara",
      "1950 A.D. Kathmandu–Biratnagar",
      "1951 A.D."
    ],
    correct: "1950 A.D. Kathmandu–Simara"
  }
];

/* ============================================================
   SHUFFLE QUESTIONS
============================================================ */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
}
shuffle(questions);
questions.forEach(q => shuffle(q.options));

/* ============================================================
   STATE
============================================================ */
let current = 0;
let answers = {};
let reviewSet = new Set();
let alreadySubmitted = false;

/* ============================================================
   PAGE LOAD → SHOW RULE POPUP
============================================================ */
window.onload = function () {
  document.getElementById("rulesPopup").style.display = "flex";
  document.getElementById("startScreen").classList.add("hidden");

  document.getElementById("startExamBtn").onclick = beginExam;
};

/* CLOSE RULE POPUP */
function closeRules() {
  document.getElementById("rulesPopup").style.display = "none";
  document.getElementById("startScreen").classList.remove("hidden");
}

/* ============================================================
   START EXAM
============================================================ */
function beginExam() {
  const name = document.getElementById("playerName");
  const email = document.getElementById("playerEmail");
  const nameErr = document.getElementById("nameError");
  const emailErr = document.getElementById("emailError");

  resetValidation(name, nameErr);
  resetValidation(email, emailErr);

  let valid = true;

  if (name.value.trim() === "") {
    showError(name, nameErr, "Full Name is required.");
    valid = false;
  } else showSuccess(name);

  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(email.value.trim())) {
    showError(email, emailErr, "Enter a valid Email Address.");
    valid = false;
  } else showSuccess(email);

  if (!valid) return;

  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("examScreen").classList.remove("hidden");

  loadNav();
  loadQ();
  startTimer();
  setupAntiCheat();
}

/* ============================================================
   INPUT VALIDATION
============================================================ */
function showError(input, error, msg) {
  error.textContent = msg;
  input.classList.add("input-error");
}
function showSuccess(input) {
  input.classList.add("input-success");
}
function resetValidation(input, error) {
  input.classList.remove("input-error", "input-success");
  error.textContent = "";
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

  window.addEventListener("resize", () => {
    if (!alreadySubmitted && (window.innerWidth < 900 || window.innerHeight < 500)) {
      submitExam();
    }
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

  history.pushState(null, null, location.href);
  window.onpopstate = function () {
    submitExam();
    history.pushState(null, null, location.href);
  };
}

/* ============================================================
   NAVIGATION
============================================================ */
function loadNav() {
  let nav = document.getElementById("questionNav");
  nav.innerHTML = "";

  questions.forEach((_, i) => {
    let btn = document.createElement("div");
    btn.className = "nav-btn";
    btn.innerText = i + 1;
    btn.onclick = () => go(i);
    nav.appendChild(btn);
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
   LOAD QUESTION
============================================================ */
function loadQ() {
  updateNav();

  const q = questions[current];
  const box = document.getElementById("questionContainer");

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

  document.getElementById("prevBtn").disabled = current === 0;
  document.getElementById("nextBtn").disabled = current === questions.length - 1;
}

function saveAns() {
  let selected = document.querySelector(`input[name="q${current}"]:checked`);
  if (selected) answers[current] = selected.value;
}

function nextQuestion() { saveAns(); current++; loadQ(); }
function prevQuestion() { saveAns(); current--; loadQ(); }
function go(n) { saveAns(); current = n; loadQ(); }
function markForReview() {
  reviewSet.add(current);
  updateNav();
}

/* ============================================================
   TIMER — 10 minutes
============================================================ */
let time = 600;

function startTimer() {
  let text = document.getElementById("timerText");
  let circle = document.getElementById("timerCircle");

  let t = setInterval(() => {
    let m = Math.floor(time / 60);
    let s = time % 60;

    text.innerHTML = `${m.toString().padStart(2, "0")}:${s
      .toString()
      .padStart(2, "0")}`;

    circle.style.strokeDashoffset = 220 - (220 * (time / 600));

    if (time <= 0) {
      clearInterval(t);
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

  saveAns();

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

  let box = document.getElementById("resultBox");
  box.classList.remove("hidden");
  box.innerHTML = `
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

  window.onbeforeunload = () => "Exam already submitted.";
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
          Your Answer: ${a.user}
        </div>
        <div class="correct-ans">Correct Answer: ${a.correctAns}</div>
      </div>
    `;
  });

  box.innerHTML = html;
}
