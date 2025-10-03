
// Educational Platform - Coursera-like prototype
const state = { lang: 'ar', user: null, enrolled: [] };

// Embedded data (real sources & demo lessons)
const DATA = {
  courses: [
    {id:'cs50', title:{ar:'CS50 - مقدمة لعلوم الحاسوب', en:'CS50: Intro to Computer Science', fr:'CS50 : Intro informatique'}, desc:{ar:'دورة من Harvard تغطي أساسيات الحوسبة.', en:'Harvard course covering computing fundamentals.', fr:'Cours Harvard sur fondamentaux du calcul.'}, level:'Beginner', teacher:'David J. Malan', source:'https://cs50.harvard.edu/x/2025/', lessons:[]},
    {id:'mit6_0001', title:{ar:'MIT 6.0001 - برمجة بايثون', en:'MIT 6.0001: Python', fr:'MIT 6.0001 : Python'}, desc:{ar:'مقدمة في البرمجة بلغة بايثون من MIT OCW.', en:'Intro to programming in Python from MIT OCW.', fr:'Introduction à Python (MIT OCW).'}, level:'Beginner', teacher:'MIT Staff', source:'https://ocw.mit.edu/', lessons:[]},
    {id:'freecode', title:{ar:'منهج freeCodeCamp', en:'freeCodeCamp Curriculum', fr:'freeCodeCamp'}, desc:{ar:'مسار عملي لتعلم تطوير الويب.', en:'Hands-on curriculum for web development.', fr:'Parcours pratique pour dev web.'}, level:'All', teacher:'freeCodeCamp', source:'https://www.freecodecamp.org/', lessons:[]},
    {id:'khan_calc', title:{ar:'التفاضل والتكامل - Khan Academy', en:'Calculus (Khan Academy)', fr:'Calcul (Khan)'}, desc:{ar:'مسار شامل لتعلّم التفاضل والتكامل.', en:'Comprehensive calculus track.', fr:'Parcours complet de calcul.'}, level:'Intermediate', teacher:'Khan Academy', source:'https://www.khanacademy.org/', lessons:[]},
    {id:'ux_basic', title:{ar:'أساسيات UX Design', en:'UX Design Basics', fr:'Bases UX'}, desc:{ar:'مبادئ تصميم تجربة المستخدم.', en:'Principles of user experience design.', fr:'Principes de conception UX.'}, level:'Intermediate', teacher:'Lina', source:'https://www.interaction-design.org/', lessons:[]}
  ],
  books: [
    {id:'eloquent', title:{ar:'Eloquent JavaScript', en:'Eloquent JavaScript', fr:'Eloquent JavaScript'}, author:'Marijn Haverbeke', source:'https://eloquentjavascript.net/'},
    {id:'ydkjs', title:{ar:'You Don\'t Know JS', en:'You Don\'t Know JS', fr:'You Don\'t Know JS'}, author:'Kyle Simpson', source:'https://github.com/getify/You-Dont-Know-JS'},
    {id:'thinkpython', title:{ar:'Think Python', en:'Think Python', fr:'Think Python'}, author:'Allen B. Downey', source:'https://greenteapress.com/thinkpython/'}
  ]
};

// generate mock lessons for each course (10 lessons)
DATA.courses.forEach(c=>{
  c.lessons = Array.from({length:8}).map((_,i)=>({id:c.id+'_l'+(i+1), title:{ar:`درس ${(i+1)} - ${c.title.ar}`, en:`Lesson ${(i+1)} - ${c.title.en}`, fr:`Leçon ${(i+1)} - ${c.title.fr}`}, duration: (10+i*5)+' min', content:`نص تجريبي للدرس ${(i+1)}.`}));
});

// helpers
function el(q){return document.querySelector(q)}
function els(q){return Array.from(document.querySelectorAll(q))}
function t(texts){ return texts[state.lang] || texts['en'] || ''; }

// render header
function renderHeader(){
  el('#site-title').textContent = t({ar:'منصة تعليمية',en:'Educational Platform',fr:'Plateforme éducative'});
  // language buttons active state
  els('.lang-btn').forEach(b=> b.classList.toggle('active', b.dataset.lang===state.lang));
}
function bindHeader(){
  els('.lang-btn').forEach(b=> b.addEventListener('click', e=>{ state.lang = b.dataset.lang; renderAll(); }));
  el('#open-login').addEventListener('click', ()=>{ openAuth(); });
}

// render main
function renderHero(){
  el('#hero-title').textContent = t({ar:'أكبر مكتبة تعليمية رقمية',en:'Large Learning Library',fr:'Grande bibliothèque d\'apprentissage'});
  el('#hero-lead').textContent = t({ar:'دورات، كتب، ودروس من مصادر عالمية.',en:'Courses, books and lessons from global sources.',fr:'Cours, livres et leçons de sources mondiales.'});
  el('#search').placeholder = t({ar:'ابحث عن دورة أو كتاب...',en:'Search courses or books...',fr:'Rechercher cours ou livres...'});
}

// render lists
function renderBooks(){
  const wrap = el('#books-wrap'); wrap.innerHTML='';
  DATA.books.forEach(b=>{
    const div = document.createElement('div'); div.className='card course-card';
    div.innerHTML = `<div class="course-thumb">${t(b.title)}</div><div class="course-title">${t(b.title)}</div><div class="course-meta">المؤلف: ${b.author}</div><div style="margin-top:10px"><a href="${b.source}" target="_blank" class="primary-btn" style="padding:8px 10px">المصدر</a></div>`;
    wrap.appendChild(div);
  });
  el('#total-books').textContent = DATA.books.length + ' كتب';
}

function renderCourses(){
  const wrap = el('#courses-wrap'); wrap.innerHTML='';
  DATA.courses.forEach(c=>{
    const div = document.createElement('div'); div.className='card course-card';
    div.innerHTML = `<div class="course-thumb">${t(c.title)}</div><div class="course-title">${t(c.title)}</div><div class="course-meta">${t(c.desc)}</div><div style="margin-top:10px"><button class="primary-btn view-course" data-id="${c.id}">${t({ar:'عرض',en:'View',fr:'Voir'})}</button></div>`;
    wrap.appendChild(div);
  });
  el('#total-courses').textContent = DATA.courses.length + ' دورات';
  bindCourseButtons();
}

function bindCourseButtons(){
  els('.view-course').forEach(b=> b.addEventListener('click', e=>{
    const id = b.dataset.id; openCourseModal(id);
  }));
}

// course modal
function openCourseModal(id){
  const course = DATA.courses.find(x=>x.id===id); if(!course) return;
  const modal = el('#modal'); modal.style.display='block';
  modal.innerHTML = `<div class="card" style="max-width:900px;margin:20px auto"><h3>${t(course.title)}</h3><p class="course-meta">${t(course.desc)}</p><p class="muted">المعلم: ${course.teacher} • ${course.level}</p><h4 style="margin-top:12px">${t({ar:'الدروس',en:'Lessons',fr:'Leçons'})}</h4><div id="lessons-list"></div><div style="margin-top:12px"><button id="enroll-btn" class="primary-btn">${t({ar:'الالتحاق بالدورة',en:'Enroll',fr:'S\'inscrire'})}</button> <button id="close-modal" class="lang-btn">إغلاق</button></div></div>`;
  const list = course.lessons.map(l=>`<div style="padding:8px;border-radius:8px;margin-top:8px;background:linear-gradient(180deg,#fff,#fbfdff)"><strong>${t(l.title)}</strong><div class="muted">${l.duration}</div><div style="margin-top:6px">${l.content}</div></div>`).join('');
  el('#lessons-list').innerHTML = list;
  el('#close-modal').addEventListener('click', ()=> modal.style.display='none');
  el('#enroll-btn').addEventListener('click', ()=>{
    if(!state.user){ alert(state.lang==='ar'?'سجل الدخول أولاً':'Please login first'); return; }
    if(state.enrolled.includes(id)){ alert(state.lang==='ar'?'لقد التحقت مسبقًا':'Already enrolled'); return; }
    state.enrolled.push(id); localStorage.setItem('enrolled', JSON.stringify(state.enrolled)); alert(state.lang==='ar'?'تم الالتحاق (تجريبي)':'Enrolled (demo)');
    modal.style.display='none';
    renderEnrolled();
  });
}

// auth modal (simple)
function openAuth(){
  const modal = el('#modal'); modal.style.display='block';
  modal.innerHTML = `<div class="card" style="max-width:420px;margin:20px auto"><h3>${t({ar:'تسجيل الدخول / تسجيل',en:'Login / Signup',fr:'Connexion / Inscription'})}</h3><div style="margin-top:8px"><input id="name-input" placeholder="${t({ar:'الاسم الكامل',en:'Full name',fr:'Nom complet'})}" style="width:100%;padding:10px;border-radius:8px;border:1px solid #e6eef8"/></div><div style="margin-top:12px"><button id="save-user" class="primary-btn">${t({ar:'حفظ',en:'Save',fr:'Enregistrer'})}</button> <button id="close-auth" class="lang-btn">إغلاق</button></div></div>`;
  el('#close-auth').addEventListener('click', ()=> modal.style.display='none');
  el('#save-user').addEventListener('click', ()=>{
    const name = el('#name-input').value.trim(); if(!name) return alert(state.lang==='ar'?'اكتب الاسم':'Enter name');
    state.user = {name}; localStorage.setItem('user', JSON.stringify(state.user)); alert(state.lang==='ar'?'تم التسجيل':'Signed in');
    modal.style.display='none'; renderHeaderUser();
  });
}

// enrolled render
function renderEnrolled(){
  const wrap = el('#enrolled-wrap'); wrap.innerHTML='';
  const list = state.enrolled.map(id=> DATA.courses.find(c=>c.id===id)).filter(Boolean);
  list.forEach(c=>{
    const d = document.createElement('div'); d.className='card course-card'; d.innerHTML = `<div style="font-weight:700">${t(c.title)}</div><div class="muted">${t(c.desc)}</div>`;
    wrap.appendChild(d);
  });
}

// header user info
function renderHeaderUser(){
  if(state.user){ el('#user-box').innerHTML = `<div style="font-weight:700">${state.user.name}</div><div class="muted">طالب تجريبي</div>`; } else { el('#user-box').innerHTML = `<button id="open-login" class="primary-btn">دخول</button>`; bindHeader(); }
}

// init bindings
function bindSearch(){
  el('#search').addEventListener('input', e=>{
    const q = e.target.value.toLowerCase();
    const fc = DATA.courses.filter(c=> (t(c.title)+t(c.desc)).toLowerCase().includes(q));
    const fb = DATA.books.filter(b=> (t(b.title)+ (b.author||'')).toLowerCase().includes(q));
    // render filtered
    const wrapC = el('#courses-wrap'); wrapC.innerHTML=''; fc.forEach(c=>{ const div = document.createElement('div'); div.className='card course-card'; div.innerHTML = `<div class="course-thumb">${t(c.title)}</div><div class="course-title">${t(c.title)}</div><div class="course-meta">${t(c.desc)}</div><div style="margin-top:10px"><button class="primary-btn view-course" data-id="${c.id}">${t({ar:'عرض',en:'View',fr:'Voir'})}</button></div>`; wrapC.appendChild(div); });
    const wrapB = el('#books-wrap'); wrapB.innerHTML=''; fb.forEach(b=>{ const div = document.createElement('div'); div.className='card course-card'; div.innerHTML = `<div class="course-thumb">${t(b.title)}</div><div class="course-title">${t(b.title)}</div><div class="course-meta">المؤلف: ${b.author||''}</div><div style="margin-top:10px"><a class="primary-btn" href="${b.source}" target="_blank">المصدر</a></div>`; wrapB.appendChild(div); });
    bindCourseButtons();
  });
}

// load state from localStorage
function loadState(){
  const u = JSON.parse(localStorage.getItem('user')||'null'); if(u) state.user = u;
  const e = JSON.parse(localStorage.getItem('enrolled')||'[]'); state.enrolled = e;
}

// render all
function renderAll(){
  renderHeader(); renderHero(); renderBooks(); renderCourses(); renderEnrolled(); renderHeaderUser();
}

// initial setup
function init(){
  loadState();
  bindHeader();
  bindSearch();
  renderAll();
}
document.addEventListener('DOMContentLoaded', init);
