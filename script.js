/* ============================================================
   GOOGLE SHEET ENDPOINT
============================================================ */
const APP_URL =
  "https://script.google.com/macros/s/AKfycbyTXArmFAAChhMuBdnZUP1k95aEElCadrmZavf7XuTZlPUn4j-RScEsHkoOV7B27J4qEw/exec";

/* ============================================================
   BILINGUAL QUESTIONS
============================================================ */
const questions = [
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
    correct: "Satya Harischndra"
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
   SHUFFLE QUESTIONS + OPTIONS
============================================================ */
function shuffle(a){ for(let i=a.length-1;i>0;i--){ let j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } }
shuffle(questions);
questions.forEach(q => shuffle(q.options));

/* ============================================================
   STATE VARIABLES
============================================================ */
let current = 0;
let answers = {};
let reviewSet = new Set();
let alreadySubmitted = false;   // 🔒 prevents duplicate submissions

/* ============================================================
   START EXAM
============================================================ */
function beginExam() {

  // Hide start & show exam
  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("examScreen").classList.remove("hidden");

  loadNav();
  loadQ();
  startTimer();

  /* ============================================================
      🚨 ANTI-CHEAT SYSTEM (AUTO SUBMIT ON CHEATING)
  ============================================================ */

  // If student switches tab/window → auto submit
  window.onblur = () => {
    if (!alreadySubmitted) submitExam();
  };

  // If exam window hidden (minimize, new app, swipe up) → auto submit
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && !alreadySubmitted) submitExam();
  });

}

/* ============================================================
   NAVIGATION BUTTONS
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
function markForReview() { reviewSet.add(current); updateNav(); }

/* ============================================================
   TIMER
============================================================ */
let time = 300;
function startTimer() {

  let timerText = document.getElementById("timerText");
  let circle = document.getElementById("timerCircle");

  let t = setInterval(() => {

    let m = Math.floor(time / 60);
    let s = time % 60;

    timerText.innerHTML = `${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;

    circle.style.strokeDashoffset = 220 - (220 * (time / 300));

    if (time < 0) {
      clearInterval(t);
      submitExam();
    }

    time--;
  }, 1000);
}

/* ============================================================
   SUBMIT EXAM (LOCK + SEND + REVIEW)
============================================================ */
async function submitExam() {

  // 🔒 Stop double submissions
  if (alreadySubmitted) return;
  alreadySubmitted = true;

  saveAns();

  // Lock UI
  document.querySelector(".btn-row").classList.add("hidden");
  document.querySelector(".top-bar").classList.add("hidden");
  document.getElementById("questionContainer").classList.add("hidden");

  // Scoring
  let score = 0;
  let list = [];

  questions.forEach((q, i) => {
    let user = answers[i] || "Not Answered";
    let correct = q.correct;
    let ok = (user === correct);
    if (ok) score++;

    list.push({ question: q.q, user, correctAns: correct, correct: ok });
  });

  let percent = ((score / questions.length) * 100).toFixed(2);

  // Show results
  let res = document.getElementById("resultBox");
  res.classList.remove("hidden");
  res.innerHTML = `
    <h2>धन्यवाद! परीक्षा सम्पन्न भयो।</h2>
    <p><strong>Score:</strong> ${score}/${questions.length}</p>
    <p><strong>Percentage:</strong> ${percent}%</p>
    <p>Your answer report is shown below.</p>
  `;

  buildReview(list);

  // Send data to sheet + email
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

  // Block refresh resubmit
  window.onbeforeunload = () => "Exam already submitted.";
}

/* ============================================================
   REVIEW PANEL (AFTER SUBMISSION)
============================================================ */
function buildReview(list) {
  let box = document.getElementById("reviewSection");
  box.classList.remove("hidden");

  let html = "";

  list.forEach((a, i) => {
    html += `
      <div class="review-card">
        <div class="review-q">${i + 1}. ${a.question}</div>
        <div class="${a.correct ? 'correct-text' : 'wrong-text'}">
          Your Answer: ${a.user}
        </div>
        <div class="correct-ans">
          Correct Answer: ${a.correctAns}
        </div>
      </div>
    `;
  });

  box.innerHTML = html;
}
