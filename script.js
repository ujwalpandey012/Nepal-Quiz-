/* ================================
   1) START QUIZ
================================ */
function beginQuiz() {
  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("quizContainer").classList.remove("hidden");
}

/* ================================
   2) QUIZ DATA (11 QUESTIONS)
================================ */
const quizData = [
  { q:"नेपालमा पहिलो रेल सेवा कहाँ सञ्चालन भयो?", 
    options:["Raxaul – Amlekhganj","Birgunj – Simara","Janakpur – Jaynagar","Biratnagar – Rangeli"],
    correct:"Raxaul – Amlekhganj" },
  { q:"नेपालको पहिलो जलविद्युत् आयोजना कुन हो?",
    options:["Pharping","Trishuli","Kulekhani","Sunkoshi"],
    correct:"Pharping" },
  { q:"नेपालको पहिलो बैंक कुन हो?",
    options:["Nepal Bank Limited","Nepal Rastra Bank","RBB","ADB"],
    correct:"Nepal Bank Limited" },
  { q:"नेपालको पहिलो संविधान कहिले जारी?",
    options:["1948 A.D.","1951 A.D.","1962 A.D.","1990 A.D."],
    correct:"1948 A.D." },
  { q:"UN को सदस्य नेपाल कहिले?",
    options:["1955 A.D.","1950 A.D.","1957 A.D.","1961 A.D."],
    correct:"1955 A.D." },
  { q:"नेपालको पहिलो विश्वविद्यालय कुन?",
    options:["Tribhuvan University","Kathmandu University","Purbanchal University","MWU"],
    correct:"Tribhuvan University" },
  { q:"छायाङ्कन गरिएको पहिलो नेपाली चलचित्र कुन?",
    options:["Aama","Maitighar","Harischandra","SH"],
    correct:"Aama" },
  { q:"राष्ट्रिय सभा सदस्य कति?",
    options:["59","56","60","61"],
    correct:"59" },
  { q:"नेपालको पहिलो जनगणना कहिले?",
    options:["1911 A.D.","1941 A.D.","1952 A.D.","1961 A.D."],
    correct:"1911 A.D." },
  { q:"SAARC चार्टर कहिले साइन?",
    options:["8 December 1985","6 Jan 1984","10 Dec 1986","1 Nov 1985"],
    correct:"8 December 1985" },
  { q:"पहिलो आन्तरिक उडान कहिले?",
    options:["1950 A.D., Kathmandu–Simara","1949 A.D., Kathmandu–Pokhara","1950 A.D., Kathmandu–Biratnagar","1951 A.D., Kathmandu–Janakpur"],
    correct:"1950 A.D., Kathmandu–Simara" }
];

/* Randomize */
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
shuffle(quizData);
quizData.forEach(q=>q.options=shuffle(q.options));

const quizBox=document.getElementById("questions-wrapper");
quizData.forEach((item,i)=>{
  let div=document.createElement("div");
  div.className="question";
  let html=`<h3>${i+1}. ${item.q}</h3>`;
  item.options.forEach(opt=>{
    html+=`<label><input type="radio" name="q${i}" value="${opt}"> ${opt}</label>`;
  });
  div.innerHTML=html;
  quizBox.appendChild(div);
});

/* ================================
   3) TIMER
================================ */
let timeLeft=300;
let timer=document.getElementById("timer");
let countdown=setInterval(()=>{
  let m=Math.floor(timeLeft/60);
  let s=timeLeft%60;
  timer.textContent=`${m}:${s.toString().padStart(2,"0")}`;
  timeLeft--;
  if(timeLeft<0){
    clearInterval(countdown);
    submitQuiz();
  }
},1000);

/* ================================
   4) ANTI-CHEAT
================================ */
window.onblur=()=>{
  alert("⚠ Tab switch detected. Auto-submitting...");
  submitQuiz();
};

/* ================================
   5) SUBMIT QUIZ — SAVE + EMAIL
================================ */
async function submitQuiz(){

  clearInterval(countdown);
  document.getElementById("submitBtn").disabled = true;

  const name=document.getElementById("playerName").value.trim();
  const email=document.getElementById("playerEmail").value.trim();

  if(!name||!email){
    alert("Please enter name and email!");
    return;
  }

  let score=0;
  let answerDetails=[];

  quizData.forEach((q,i)=>{
    const sel=document.querySelector(`input[name="q${i}"]:checked`);
    const user=(sel)?sel.value:"Not Answered";
    const isCorrect=(user===q.correct);

    if(isCorrect) score++;

    answerDetails.push({
      question:q.q,
      user:user,
      correct:q.correct,
      correctStatus:isCorrect?"Correct":"Wrong"
    });
  });

  const percent=((score/quizData.length)*100).toFixed(2);

  document.getElementById("resultBox").style.display="block";
  document.getElementById("resultBox").innerHTML = `
    <h3>Thank You, ${name}!</h3>
    <p>Your Score: <b>${score}/${quizData.length}</b> (${percent}%)</p>
    <p>A detailed answer breakdown has been emailed to you.</p>
  `;

  await fetch("https://script.google.com/macros/s/AKfycbxiDuQwKO7Krp-QGNwXhSH6nKVxO_JSos7Dtl6jPtL1jl_AGAOM9ux1XH30EjDtxL-Y1Q/exec",{
    method:"POST",
    mode:"no-cors",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      name,
      email,
      score,
      percent,
      total: quizData.length,
      answersDetailed: answerDetails,
      device: navigator.userAgent
    })
  });

  alert("Your result has been submitted and emailed.");
}
