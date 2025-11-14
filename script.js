/* ============================================================
   NEPAL GK PROFESSIONAL QUIZ ENGINE (Fixed Version)
============================================================ */

const APP_URL =
  "https://script.google.com/macros/s/AKfycbxiDuQwKO7Krp-QGNwXhSH6nKVxO_JSos7Dtl6jPtL1jl_AGAOM9ux1XH30EjDtxL-Y1Q/exec";

/* QUIZ QUESTIONS */
const quizData = [
  {
    q: "नेपालमा पहिलो रेलसेवा कहाँ सञ्चालन भयो?<br>When and where was Nepal’s first railway service?",
    options: ["Raxaul – Amlekhganj", "Birgunj – Simara", "Janakpur – Jaynagar", "Biratnagar – Rangeli"],
    correct: "Raxaul – Amlekhganj"
  },
  {
    q: "नेपालको पहिलो जलविद्युत् आयोजना कुन हो?<br>Which was Nepal’s first hydroelectric project?",
    options: ["Pharping", "Trishuli", "Kulekhani", "Sunkoshi"],
    correct: "Pharping"
  },
  {
    q: "नेपालको पहिलो बैंक कुन हो?<br>Which is Nepal’s first bank?",
    options: ["Nepal Rastra Bank", "Agriculture Development Bank", "Nepal Bank Limited", "Rastriya Banijya Bank"],
    correct: "Nepal Bank Limited"
  },
  {
    q: "नेपालको पहिलो संविधान कुन वर्षमा जारी?<br>When was Nepal’s first constitution issued?",
    options: [
      "1948 A.D. (2004 B.S.)",
      "1951 A.D. (2008 B.S.)",
      "1962 A.D. (2019 B.S.)",
      "1990 A.D. (2047 B.S.)"
    ],
    correct: "1948 A.D. (2004 B.S.)"
  },
  {
    q: "नेपाल संयुक्त राष्ट्रसंघ सदस्य कहिले?<br>When did Nepal join the UN?",
    options: ["1950 A.D.", "1955 A.D.", "1957 A.D.", "1961 A.D."],
    correct: "1955 A.D."
  },
  {
    q: "पहिलो विश्वविद्यालय कुन?<br>First university?",
    options: ["Tribhuvan University", "Kathmandu University", "Purbanchal University", "MWU"],
    correct: "Tribhuvan University"
  },
  {
    q: "पहिलो छायाङ्कन चलचित्र?<br>First Nepali filmed movie?",
    options: ["Aama", "Satya Harischandra", "Maitighar", "Harischandra"],
    correct: "Aama"
  },
  {
    q: "राष्ट्रिय सभा सदस्य कति?<br>National Assembly members?",
    options: ["50", "56", "59", "60"],
    correct: "59"
  },
  {
    q: "पहिलो जनगणना?<br>First census?",
    options: [
      "1911 during Chandra Shumsher",
      "1941 during Judha Shumsher",
      "1952 during Tribhuvan",
      "1961 during Mahendra Shah"
    ],
    correct: "1911 during Chandra Shumsher"
  },
  {
    q: "SAARC चार्टर कहिले साइन?<br>When was SAARC Charter signed?",
    options: ["8 December 1985", "6 January 1984", "10 December 1986", "1 Nov 1985"],
    correct: "8 December 1985"
  },
  {
    q: "पहिलो आन्तरिक उडान?<br>First domestic flight?",
    options: [
      "1949 Kathmandu–Pokhara",
      "1950 Kathmandu–Biratnagar",
      "1950 Kathmandu–Simara",
      "1951 Kathmandu–Janakpur"
    ],
    correct: "1950 Kathmandu–Simara"
  }
];

/* FIXED SHUFFLE FUNCTION */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* Shuffle questions + options */
shuffle(quizData);
quizData.forEach(q => shuffle(q.options));

/* Load questions */
function loadQuestions() {
  const wrapper = document.getElementById("questions-wrapper");
  wrapper.innerHTML = "";

  quizData.forEach((item, index) => {
    let div = document.createElement("div");
    div.classList.add("question");

    let html = `<h3>${index + 1}. ${item.q}</h3>`;

    item.options.forEach(opt => {
      html += `
      <label>
        <input type="radio" name="q${index}" value="${opt}">
        ${opt}
      </label>`;
    });

    div.innerHTML = html;
    wrapper.appendChild(div);
  });
}

loadQuestions();

/* TIMER */
let timeLeft = 300;
const timerDisplay = document.getElementById("timer");

const countdown = setInterval(() => {
  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;

  timerDisplay.textContent = `⏱ ${m.toString().padStart(2, "0")}:${s
    .toString()
    .padStart(2, "0")}`;

  timeLeft--;
  if (timeLeft < 0) {
    clearInterval(countdown);
    submitQuiz();
  }
}, 1000);

/* ANTI CHEAT */
window.onblur = () => {
  alert("⚠️ Tab change detected! Auto submitting quiz.");
  submitQuiz();
};

/* SUBMIT QUIZ */
async function submitQuiz() {
  clearInterval(countdown);

  const name = document.getElementById("playerName").value.trim();
  const email = document.getElementById("playerEmail").value.trim();

  if (!name || !email) return alert("Please enter name & email!");

  let score = 0;
  let answersDetailed = [];

  quizData.forEach((q, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    const userAnswer = selected ? selected.value : "Not Answered";
    const isCorrect = userAnswer === q.correct;

    if (isCorrect) score++;

    answersDetailed.push({
      question: q.q,
      user: userAnswer,
      correctAns: q.correct,
      correct: isCorrect
    });
  });

  const percent = ((score / quizData.length) * 100).toFixed(2);

  document.getElementById("resultBox").style.display = "block";
  document.getElementById("resultBox").innerHTML = `
    <h3>${name}, your quiz has been submitted.</h3>
    <p><b>Score:</b> ${score}/${quizData.length}</p>
    <p><b>Percentage:</b> ${percent}%</p>
    <p>📩 A detailed report has been emailed to you.</p>
  `;

  await fetch(APP_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ name, email, score, percent, answersDetailed })
  });

  alert("✅ Thank you! Your quiz is completed.");
}
