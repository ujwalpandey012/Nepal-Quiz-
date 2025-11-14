/* GLOBAL */
*{margin:0;padding:0;box-sizing:border-box;font-family:"Poppins",sans-serif;}
body{background:#020d25;color:white;}
.hidden{display:none!important}

/* START SCREEN */
.start-screen{height:100vh;display:flex;justify-content:center;align-items:center;}
.start-card{background:rgba(255,255,255,0.06);padding:40px;width:350px;border-radius:18px;
backdrop-filter:blur(10px);box-shadow:0 0 25px rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15)}
.start-card h1{color:gold;font-size:1.9rem}
.start-card h2{color:#e0eaff;margin-bottom:25px}
.start-card input{width:100%;padding:14px;margin:10px 0;background:rgba(255,255,255,0.12);
color:white;border:none;border-radius:8px;outline:none}
.start-btn{width:100%;padding:14px;background:gold;color:black;border:none;font-weight:600;
border-radius:8px;margin-top:10px;cursor:pointer;transition:0.25s}
.start-btn:hover{background:#ffdd55;transform:translateY(-2px)}

/* EXAM SCREEN */
.exam-screen{max-width:1050px;margin:auto;padding:25px}

/* TOP BAR */
.top-bar{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}

/* NAVIGATION GRID */
.question-nav{display:grid;grid-template-columns:repeat(6,40px);gap:10px}
.nav-btn{height:40px;width:40px;display:flex;justify-content:center;align-items:center;
background:rgba(255,255,255,0.15);border-radius:8px;cursor:pointer;transition:.25s;
border:1px solid rgba(255,255,255,0.25)}
.nav-btn.active{background:gold;color:black}
.nav-btn.review{background:#ff6600;color:white}

/* TIMER CIRCLE */
.timer-ring{position:relative;width:80px;height:80px}
.timer-ring svg{width:80px;height:80px;transform:rotate(-90deg)}
.timer-ring circle{fill:none;stroke-width:6;stroke:rgba(255,255,255,0.2)}
#timerCircle{stroke:gold;stroke-dasharray:220;stroke-dashoffset:0;transition:stroke-dashoffset 1s linear}
#timerText{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-weight:600}

/* QUESTION CARD */
.question-container{padding:25px;border:1px solid rgba(255,255,255,0.15);
border-radius:15px;background:rgba(255,255,255,0.05);backdrop-filter:blur(6px);
animation:slideFade 0.5s ease}
@keyframes slideFade{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}

/* OPTIONS */
.option{padding:12px;margin:10px 0;background:rgba(255,255,255,0.08);
border:1px solid rgba(255,255,255,0.2);border-radius:10px;
display:flex;align-items:center;gap:12px;cursor:pointer;transition:0.25s}
.option:hover{background:rgba(255,255,255,0.2);transform:translateY(-2px)}
.option input{transform:scale(1.2)}

/* BUTTONS */
.btn-row{display:flex;gap:10px;justify-content:center;margin-top:20px}
.btn-row button{padding:12px 22px;border:none;border-radius:8px;background:rgba(255,255,255,0.15);
color:white;cursor:pointer;transition:.25s}
.btn-row button:hover{background:gold;color:black}

/* RESULT */
.result-box{margin-top:25px;padding:25px;border-radius:15px;background:rgba(255,255,255,0.1);
border:1px solid rgba(255,255,255,0.2);animation:slideFade .5s ease}

/* REVIEW SECTION */
.review-section{margin-top:20px;padding:20px;background:rgba(255,255,255,0.05);
border-radius:15px;border:1px solid rgba(255,255,255,0.15)}
.review-card{padding:18px;margin-bottom:15px;border-bottom:1px solid rgba(255,255,255,0.2)}
.review-q{font-weight:600;margin-bottom:6px}
.correct-text{color:#00ff88;font-weight:600}
.wrong-text{color:#ff5555;font-weight:600}
.correct-ans{color:gold;font-weight:600}
