/* GOOGLE SCRIPT URL */
const APP_URL = "YOUR_APPS_SCRIPT_URL_HERE";

/* --- QUESTIONS --- */
const questions = [
  { q:"नेपालमा पहिलो रेलसेवा कहाँ सञ्चालन भयो?", options:["Raxaul – Amlekhganj","Birgunj – Simara","Janakpur – Jaynagar","Biratnagar – Rangeli"], correct:"Raxaul – Amlekhganj"},
  { q:"नेपालको पहिलो जलविद्युत् आयोजना कुन हो?",options:["Pharping","Trishuli","Kulekhani","Sunkoshi"],correct:"Pharping"},
  { q:"नेपालको पहिलो बैंक कुन हो?",options:["Nepal Rastra Bank","ADB","Nepal Bank Limited","RBB"],correct:"Nepal Bank Limited"},
  { q:"नेपालको पहिलो संविधान कुन वर्षमा जारी?",options:["1948","1951","1962","1990"],correct:"1948"},
  { q:"नेपाल संयुक्त राष्ट्रसंघ सदस्य कहिले?",options:["1950","1955","1957","1961"],correct:"1955"},
  { q:"पहिलो विश्वविद्यालय कुन?",options:["TU","KU","PU","MWU"],correct:"TU"},
  { q:"पहिलो छायाङ्कन चलचित्र?",options:["Aama","Harischandra","Maitighar","Satya Harischandra"],correct:"Aama"},
  { q:"राष्ट्रिय सभा सदस्य कति?",options:["50","56","59","60"],correct:"59"},
  { q:"पहिलो जनगणना?",options:["1911","1941","1952","1961"],correct:"1911"},
  { q:"SAARC चार्टर कहिले साइन?",options:["8 Dec 1985","6 Jan 1984","10 Dec 1986","1 Nov 1985"],correct:"8 Dec 1985"},
  { q:"पहिलो आन्तरिक उडान?",options:["1949 Pokhara","1950 Biratnagar","1950 Simara","1951 Janakpur"],correct:"1950 Simara"}
];

/* SHUFFLE EVERYTHING */
function shuffle(arr){for(let i=arr.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]]}}
shuffle(questions); questions.forEach(q=>shuffle(q.options));

/* STATE */
let current=0;
let answers={};
let review=new Set();

/* BEGIN EXAM */
function beginExam(){
  document.getElementById("startScreen").classList.add("hidden");
  document.getElementById("examScreen").classList.remove("hidden");
  loadNav();
  loadQ();
  startTimer();
}

/* NAV */
function loadNav(){
  let nav=document.getElementById("questionNav");
  nav.innerHTML="";
  questions.forEach((_,i)=>{
    let b=document.createElement("div");
    b.className="nav-btn";
    b.innerText=i+1;
    b.onclick=()=>go(i);
    nav.appendChild(b);
  });
  updateNav();
}

function updateNav(){
  document.querySelectorAll(".nav-btn").forEach((b,i)=>{
    b.classList.remove("active");
    if(i===current) b.classList.add("active");
    if(review.has(i)) b.classList.add("review");
  });
}

/* LOAD QUESTION */
function loadQ(){
  updateNav();
  const q=questions[current];
  let box=document.getElementById("questionContainer");
  let h=`<h2>${current+1}. ${q.q}</h2>`;
  q.options.forEach(opt=>{
    h+=`
      <label class="option">
        <input type="radio" name="q${current}" value="${opt}" ${(answers[current]===opt)?"checked":""}>
        ${opt}
      </label>
    `;
  });
  box.innerHTML=h;

  document.getElementById("prevBtn").disabled=(current===0);
  document.getElementById("nextBtn").disabled=(current===questions.length-1);
}

function saveAns(){
  let s=document.querySelector(`input[name="q${current}"]:checked`);
  if(s) answers[current]=s.value;
}

/* BUTTONS */
function nextQuestion(){saveAns();current++;loadQ();}
function prevQuestion(){saveAns();current--;loadQ();}
function go(n){saveAns();current=n;loadQ();}
function markForReview(){review.add(current);updateNav();}

/* TIMER */
let time=300;
function startTimer(){
  let t=document.getElementById("timerText");
  let c=document.getElementById("timerCircle");
  let int=setInterval(()=>{
    let m=Math.floor(time/60), s=time%60;
    t.innerHTML=`${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
    c.style.strokeDashoffset=220-(220*(time/300));
    if(time<0){clearInterval(int);submitExam();}
    time--;
  },1000);
}

/* SUBMIT */
async function submitExam(){
  saveAns();

  let score=0;
  questions.forEach((q,i)=>{ if(answers[i]===q.correct) score++; });

  let percent=((score/questions.length)*100).toFixed(2);

  document.getElementById("resultBox").classList.remove("hidden");
  document.getElementById("resultBox").innerHTML=`
    <h2>धन्यवाद! तपाईंको परिक्षा सम्पन्न भयो।</h2>
    <p><strong>Score:</strong> ${score}/${questions.length}</p>
    <p><strong>Percentage:</strong> ${percent}%</p>
  `;

  buildReview();

  fetch(APP_URL,{
    method:"POST",
    mode:"no-cors",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      name:document.getElementById("playerName").value,
      email:document.getElementById("playerEmail").value,
      score,percent,answers
    })
  });
}

/* REVIEW PANEL */
function buildReview(){
  let box=document.getElementById("reviewSection");
  box.classList.remove("hidden");

  let html="";
  questions.forEach((q,i)=>{
    let user=answers[i]||"Not Answered";
    let correct=q.correct;
    let status=(user===correct);

    html+=`
      <div class="review-card">
        <div class="review-q">${i+1}. ${q.q}</div>
        <div class="${status?'correct-text':'wrong-text'}">
          Your Answer: ${user}
        </div>
        <div class="correct-ans">Correct Answer: ${correct}</div>
      </div>
    `;
  });

  box.innerHTML=html;
}
