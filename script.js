/* ============================================================
   CLEAN QUIZ SCRIPT (NO IMAGES) — FINAL STABLE VERSION
============================================================ */

/* Your Apps Script URL */
const APP_URL =
  "https://script.google.com/macros/s/AKfycbxiDuQwKO7Krp-QGNwXhSH6nKVxO_JSos7Dtl6jPtL1jl_AGAOM9ux1XH30EjDtxL-Y1Q/exec";

/* START QUIZ */
function beginQuiz() {
  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("quizContainer").classList.remove("hidden");
}

/* QUESTIONS */
const quizData = [
  {
    q: "नेपालमा पहिलो रेलसेवा कहाँ सञ्चालन भयो?",
    options: ["Raxaul – Amlekhganj", "Birgunj – Simara", "Janakpur – Jaynagar", "Biratnagar – Rangeli"],
    correct: "Raxaul – Amlekhganj"
  },
  {
    q: "नेपालको पहिलो जलविद्युत् आयोजना कुन हो?",
    options: ["Pharping", "Trishuli", "Kulekhani", "Sunkoshi"],
    correct: "Pharping"
  },
  {
    q: "नेपालको पहिलो बैंक कुन हो?",
    options: ["Nepal Rastra Bank", "ADB", "Nepal Bank Limited", "RBB"],
    correct: "Nepal Bank Limited"
  },
  {
    q: "नेपालको पहिलो संविधान कुन वर्षमा जारी?",
    options: ["1948", "1951", "1962", "1990"],
    correct: "1948"
  },
  {
    q: "नेपाल संयुक्त राष्ट्रसंघ सदस्य कहिले?",
    options: ["1950", "1955", "1957", "1961"],
    correct: "1955"
  },
  {
    q: "पहिलो विश्वविद्यालय कुन?",
    options: ["TU", "KU", "PU", "MWU"],
    correct: "TU"
  },
  {
    q: "पहिलो छायाङ्कन चलचित्र?",
    options: ["Aama", "Harischandra", "Maitighar", "Satya Harischandra"],
    correct: "Aama"
  },
  {
    q: "राष्ट्रिय सभा सदस्य कति?",
    options: ["50", "56", "59", "60"],
    correct: "59"
  },
  {
    q: "पहिलो जनगणना?",
    options: ["1911", "1941", "1952", "1961"],
    correct: "1911"
  },
  {
    q: "SAARC चार्टर कहिले साइन?",
    options: ["8 Dec 1985", "6 Jan 1984", "10 Dec 1986", "1 Nov 1985"],
    correct: "8 Dec 1985"
  },
  {
    q: "पहिलो आन्तरिक उडान?",
    options: ["1949 Pokhara", "1950 Biratnagar", "1950 Simara", "1951 Janakpur"],
    correct: "1950 Simara"
  }
];

/* SHUFFLE */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
shuffle(quizData);
quizData.forEach(q => shuffle(q.options));

/* LOAD QUESTIONS */
const wrapper = document.getElementById("questions-wrapper");
quizData.forEach((item, index) => {
  let div = document.createElement("div");
  div.classList.add("question");

  let html = `<h3>${index + 1}. ${item.q}</h3>`;

  item.options.forEach(opt => {
    html += `
    <label class="option">
      <input type="radio" name="q${index}" value="${opt}">
      ${opt}
    </label>`;
  });

  div.innerHTML = html;
  wrapper.appendChild(div);
});

/* TIMER */
let timeLeft = 300;
const timer = document.getElementById("timer");

const countdown = setInterval(() => {
  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  timer.textContent = `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  timeLeft--;
  if (timeLeft < 0) submitQuiz();
}, 1000);

/* ANTI-CHEAT */
window.onblur = () => {
  alert("⚠️ You switched tab! Auto-submitting quiz.");
  submitQuiz();
};

/* SUBMIT QUIZ */
async function submitQuiz() {
  clearInterval(countdown);

  const name = document.getElementById("playerName").value.trim();
  const email = document.getElementById("playerEmail").value.trim();

  if (!name || !email) return alert("Please enter name & email.");

  let score = 0;
  let answersDetailed = [];

  quizData.forEach((q, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    const answer = selected ? selected.value : "Not Answered";
    const correct = answer === q.correct;
    if (correct) score++;

    answersDetailed.push({
      question: q.q,
      user: answer,
      correctAns: q.correct,
      correct
    });
  });

  const percent = ((score / quizData.length) * 100).toFixed(2);

  document.getElementById("resultBox").innerHTML = `
    <h3>${name}, your quiz is submitted.</h3>
    <p>Score: ${score}/${quizData.length}</p>
    <p>Percentage: ${percent}%</p>
    <p>Your answer report has been emailed.</p>
  `;
  document.getElementById("resultBox").style.display = "block";

  await fetch(APP_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, score, percent, answersDetailed })
  });

  alert("✔️ Quiz submitted successfully!");
}
