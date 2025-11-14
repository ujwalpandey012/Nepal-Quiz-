/* QUESTIONS DATABASE -------------------------------------------- */
const questions = [
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

/* SHUFFLE QUESTIONS + OPTIONS ----------------------------------- */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffle(questions);
questions.forEach(q => shuffle(q.options));

/* STATE ---------------------------------------------------------- */
let current = 0;
let answers = {};
let reviewList = new Set();

/* START EXAM ----------------------------------------------------- */
function beginExam() {
  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("examScreen").classList.remove("hidden");

  loadNavigation();
  loadQuestion();
  startTimer();
}

/* NAVIGATION GRID ------------------------------------------------ */
function loadNavigation() {
  let nav = document.getElementById("questionNav");
  nav.innerHTML = "";

  questions.forEach((_, i) => {
    let btn = document.createElement("div");
    btn.className = "nav-btn";
    btn.innerText = i + 1;
    btn.onclick = () => goTo(i);
    nav.appendChild(btn);
  });

  updateNav();
}

function updateNav() {
  document.querySelectorAll(".nav-btn").forEach((btn, i) => {
    btn.classList.remove("active");
    if (i === current) btn.classList.add("active");
    if (reviewList.has(i)) btn.classList.add("review");
  });
}

/* LOAD QUESTION -------------------------------------------------- */
function loadQuestion() {
  updateNav();

  const q = questions[current];
  const container = document.getElementById("questionContainer");

  let html = `<h2>${current + 1}. ${q.q}</h2>`;

  q.options.forEach(opt => {
    html += `
      <label class="option">
        <input type="radio" 
               name="q${current}" 
               value="${opt}"
               ${answers[current] === opt ? "checked" : ""}>
        ${opt}
      </label>`;
  });

  container.innerHTML = html;

  // buttons conditions
  document.getElementById("prevBtn").disabled = current === 0;
  document.getElementById("nextBtn").disabled = current === questions.length - 1;
}

/* BUTTON FUNCTIONS ---------------------------------------------- */
function nextQuestion() {
  saveAnswer();
  current++;
  loadQuestion();
}

function prevQuestion() {
  saveAnswer();
  current--;
  loadQuestion();
}

function goTo(n) {
  saveAnswer();
  current = n;
  loadQuestion();
}

function saveAnswer() {
  const selected = document.querySelector(`input[name="q${current}"]:checked`);
  if (selected) answers[current] = selected.value;
}

function markForReview() {
  reviewList.add(current);
  updateNav();
}

/* TIMER ---------------------------------------------------------- */
let time = 300; 
function startTimer() {
  const timerText = document.getElementById("timerText");
  const circle = document.getElementById("timerCircle");

  let interval = setInterval(() => {
    let m = Math.floor(time / 60);
    let s = time % 60;

    timerText.innerHTML = `${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;

    let progress = (time / 300) * 220;
    circle.style.strokeDashoffset = 220 - progress;

    time--;

    if (time < 0) {
      clearInterval(interval);
      submitExam();
    }

  }, 1000);
}

/* SUBMIT RESULT -------------------------------------------------- */
function submitExam() {
  saveAnswer();

  let score = 0;
  questions.forEach((q, i) => {
    if (answers[i] === q.correct) score++;
  });

  let result = document.getElementById("resultBox");
  result.classList.remove("hidden");
  result.innerHTML = `
    <h2>Exam Completed</h2>
    <p><strong>Score:</strong> ${score}/${questions.length}</p>
    <p><strong>Percentage:</strong> ${(score / questions.length * 100).toFixed(2)}%</p>
  `;

  window.scrollTo({ top: 0, behavior: "smooth" });
}
