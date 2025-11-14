/* LOADING SCREEN ----------------------------------------- */
window.onload = () => {
  setTimeout(() => {
    document.getElementById("loadingScreen").classList.add("hidden");
    document.getElementById("startScreen").classList.remove("hidden");
  }, 1500);
};

/* BEGIN QUIZ -------------------------------------------- */
function beginQuiz() {
  const name = document.getElementById("playerName").value.trim();
  const email = document.getElementById("playerEmail").value.trim();

  if (!name || !email) {
    alert("Please fill all fields correctly.");
    return;
  }

  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("quizScreen").classList.remove("hidden");

  loadQuestions();
  startTimer();
}

/* QUESTIONS --------------------------------------------- */
const quizData = [
  { q: "नेपालमा पहिलो रेलसेवा कहाँ सञ्चालन भयो?", options: ["Raxaul – Amlekhganj","Birgunj – Simara","Janakpur – Jaynagar","Biratnagar – Rangeli"], correct: "Raxaul – Amlekhganj" },
  { q: "नेपालको पहिलो जलविद्युत् आयोजना कुन हो?", options: ["Pharping","Trishuli","Kulekhani","Sunkoshi"], correct: "Pharping" },
  { q: "नेपालको पहिलो बैंक कुन हो?", options: ["Nepal Rastra Bank","ADB","Nepal Bank Limited","RBB"], correct: "Nepal Bank Limited" },
  { q: "नेपालको पहिलो संविधान कुन वर्षमा जारी?", options: ["1948","1951","1962","1990"], correct: "1948" },
  { q: "नेपाल संयुक्त राष्ट्रसंघ सदस्य कहिले?", options: ["1950","1955","1957","1961"], correct: "1955" },
  { q: "पहिलो विश्वविद्यालय कुन?", options: ["TU","KU","PU","MWU"], correct: "TU" },
  { q: "पहिलो छायाङ्कन चलचित्र?", options: ["Aama","Harischandra","Maitighar","Satya Harischandra"], correct: "Aama" },
  { q: "राष्ट्रिय सभा सदस्य कति?", options: ["50","56","59","60"], correct: "59" },
  { q: "पहिलो जनगणना?", options: ["1911","1941","1952","1961"], correct: "1911" },
  { q: "SAARC चार्टर कहिले साइन?", options: ["8 Dec 1985","6 Jan 1984","10 Dec 1986","1 Nov 1985"], correct: "8 Dec 1985" },
  { q: "पहिलो आन्तरिक उडान?", options: ["1949 Pokhara","1950 Biratnagar","1950 Simara","1951 Janakpur"], correct: "1950 Simara" }
];

/* SHUFFLE FUNCTION */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/* LOAD QUESTIONS ---------------------------------------- */
function loadQuestions() {
  shuffle(quizData);

  const wrapper = document.getElementById("questionsWrapper");
  wrapper.innerHTML = "";

  quizData.forEach((item, index) => {
    shuffle(item.options);

    let card = document.createElement("div");
    card.classList.add("question-card");

    let html = `<h3>${index + 1}. ${item.q}</h3>`;

    item.options.forEach(opt => {
      html += `
      <label class="option">
        <input type="radio" name="q${index}" value="${opt}">
        ${opt}
      </label>`;
    });

    card.innerHTML = html;
    wrapper.appendChild(card);
  });
}

/* TIMER ------------------------------------------------- */
let totalTime = 300; // 5 minutes
function startTimer() {
  const timer = document.getElementById("timer");

  let countdown = setInterval(() => {
    let m = Math.floor(totalTime / 60);
    let s = totalTime % 60;

    timer.textContent = `${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;

    // Change color when time is low
    if (totalTime === 60) timer.style.background = "#ff9300";
    if (totalTime === 20) timer.style.background = "#d80000";

    totalTime--;
    updateProgressBar();

    if (totalTime < 0) {
      clearInterval(countdown);
      submitQuiz();
    }
  }, 1000);
}

/* PROGRESS BAR ------------------------------------------ */
function updateProgressBar() {
  const fill = document.getElementById("progressFill");
  let percentage = ((300 - totalTime) / 300) * 100;
  fill.style.width = percentage + "%";
}

/* SUBMIT QUIZ ------------------------------------------ */
function submitQuiz() {
  const name = document.getElementById("playerName").value;
  const email = document.getElementById("playerEmail").value;

  let score = 0;
  let details = [];

  quizData.forEach((q, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    let answer = selected ? selected.value : "Not Answered";

    if (answer === q.correct) score++;

    details.push({ question: q.q, selected: answer, correct: q.correct });
  });

  const result = document.getElementById("resultBox");
  result.classList.remove("hidden");
  result.innerHTML = `
      <h2>Examination Completed</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Score:</strong> ${score}/${quizData.length}</p>
      <p><strong>Percentage:</strong> ${(score / quizData.length * 100).toFixed(2)}%</p>
  `;

  window.scrollTo({ top: 0, behavior: "smooth" });
}
