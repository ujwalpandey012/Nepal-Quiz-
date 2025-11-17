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

  /* ---- Old Original 11 Questions ---- */

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

function loadQuestion() {
  updateNav();

  let q = questions[current];
  let box = document.getElementById("questionContainer");

  let html = `<h2>${current + 1}. ${q.q}</h2>`;

  q.options.forEach(opt => {
    html += `
      <label class="option">
        <input type="radio" name="q${current}" value="${opt}">
        ${opt}
      </label>`;
  });

  box.innerHTML = html;

  // Auto move to next when option selected
  document.querySelectorAll(`input[name="q${current}"]`).forEach(input => {
    input.onclick = () => {
      answers[current] = input.value;

      // If NOT last question → go next
      if (current < questions.length - 1) {
        current++;
        loadQuestion();
      } else {
        // LAST QUESTION → show submit button
        document.getElementById("submitBtn").style.display = "block";
      }
    };
  });

  // PREVIOUS BUTTON always visible except Q1
  if (current === 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline-block";
  }

  // Submit button ONLY on last question
  if (current === questions.length - 1) {
    document.getElementById("submitBtn").style.display = "block";
  } else {
    document.getElementById("submitBtn").style.display = "none";
  }
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
   TIMER — 20 MINUTES
============================================================ */
let time = 1200; // 20 minutes in seconds

function startTimer() {
  let circle = document.getElementById("timerCircle");
  let text = document.getElementById("timerText");

  const FULL = 1200; // full 20 minutes
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
    mode: "no-cors",
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
document.getElementById("prevBtn").onclick = prevQuestion;
document.getElementById("reviewBtn").onclick = markForReview;
document.getElementById("submitBtn").onclick = submitExam;
document.getElementById("startExamBtn").onclick = beginExam;

