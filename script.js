/* ============================================================
   NEPAL GK PROFESSIONAL QUIZ ENGINE – FINAL FIXED VERSION
   Created for Ujwal Pandey
============================================================ */

// ⭐ Your Google Apps Script Web App URL:
const APP_URL =
  "https://script.google.com/macros/s/AKfycbxiDuQwKO7Krp-QGNwXhSH6nKVxO_JSos7Dtl6jPtL1jl_AGAOM9ux1XH30EjDtxL-Y1Q/exec";

/* ============================================================
   QUIZ QUESTIONS — Final Set (11 Questions)
============================================================ */
const quizData = [
  {
    q: "नेपालमा पहिलो रेलसेवा कहाँ सञ्चालन भयो?<br>When and where was Nepal’s first railway service operated?",
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
    q: "नेपालको पहिलो संविधान कुन वर्षमा जारी गरिएको थियो?<br>In which year was Nepal’s first constitution promulgated?",
    options: ["1948 A.D. (2004 B.S.)", "1951 A.D. (2008 B.S.)", "1962 A.D. (2019 B.S.)", "1990 A.D. (2047 B.S.)"],
    correct: "1948 A.D. (2004 B.S.)"
  },
  {
    q: "नेपाल संयुक्त राष्ट्रसंघको सदस्य कहिले भएको हो?<br>When did Nepal join the United Nations?",
    options: ["1950 A.D.", "1955 A.D.", "1957 A.D.", "1961 A.D."],
    correct: "1955 A.D."
  },
  {
    q: "नेपालको पहिलो विश्वविद्यालय कुन हो?<br>Which is the first university of Nepal?",
    options: ["Tribhuvan University", "Kathmandu University", "Purbanchal University", "Mid-Western University"],
    correct: "Tribhuvan University"
  },
  {
    q: "नेपाली भाषामा छायाङ्कन भएको पहिलो चलचित्र कुन हो?<br>Which is the first Nepali-language movie shot in Nepal?",
    options: ["Aama", "Satya Harischandra", "Maitighar", "Harischandra"],
    correct: "Aama"
  },
  {
    q: "संविधान २०७२ अनुसार राष्ट्रिय सभामा कति सदस्य हुन्छन्?<br>How many members are in the National Assembly?",
    options: ["50", "56", "59", "60"],
    correct: "59"
  },
  {
    q: "नेपालमा पहिलो राष्ट्रिय जनगणना कहिले र कसको कालमा भयो?<br>When was Nepal’s first national census conducted?",
    options: [
      "1911 A.D. during Chandra Shumsher",
      "1941 A.D. during Judha Shumsher",
      "1952 A.D. during Tribhuvan Shah",
      "1961 A.D. during Mahendra Shah"
    ],
    correct: "1911 A.D. during Chandra Shumsher"
  },
  {
    q: "नेपालले SAARC को स्थापना सम्झौता कहिले साइन गरेको थियो?<br>When did Nepal sign the SAARC Charter?",
    options: ["8 December 1985", "6 January 1984", "10 December 1986", "1 November 1985"],
    correct: "8 December 1985"
  },
  {
    q: "नेपालमा पहिलो आन्तरिक उडान कहिले र कुन मार्गमा भयो?<br>When and on which route was Nepal’s first domestic flight?",
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
   Proper Shuffle Function (Fixed)
============================================================ */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/* Shuffle questions + options */
shuffle(quizData);
quizData.forEach(q => shuffle(q.options));

/* ============================================================
   Load Questions after Start Quiz
============================================================ */
function loadQuestions() {
  const wrapper = document.getElementById("questions-wrapper");
  wrapper.innerHTML = "";

  quizData.forEach((item, index) => {
    const div = document.createElement("div");
    div
