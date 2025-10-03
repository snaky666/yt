
// Udemy-like Brown Theme - Frontend only (HTML/CSS/JS). No external JSON fetch.
const DATA = {
  courses: [
    {id:'c1',title:'Mastering JavaScript',teacher:'Ali Hassan',rating:4.7,price:'Free',img:'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',desc:'Comprehensive JavaScript course for beginners to advanced.'},
    {id:'c2',title:'Python for Data Science',teacher:'Sara Ibrahim',rating:4.8,price:'$19.99',img:'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1200&q=80',desc:'Learn Python with hands-on projects and datasets.'},
    {id:'c3',title:'UI/UX Design Fundamentals',teacher:'Lina Khaled',rating:4.6,price:'$14.99',img:'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',desc:'Design beautiful and usable interfaces.'},
    {id:'c4',title:'React - The Complete Guide',teacher:'Omar Saeed',rating:4.9,price:'$24.99',img:'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',desc:'From hooks to performance optimization.'},
    {id:'c5',title:'Machine Learning A-Z',teacher:'Dr. Nadia',rating:4.7,price:'$29.99',img:'https://images.unsplash.com/photo-1505734702312-6b0a8a35b85d?auto=format&fit=crop&w=1200&q=80',desc:'Practical machine learning with Python.'},
    {id:'c6',title:'Web Development Bootcamp',teacher:'Khaled Farag',rating:4.5,price:'$9.99',img:'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',desc:'Full-stack web development course.'},
    {id:'c7',title:'Digital Marketing 101',teacher:'Maha Ali',rating:4.4,price:'$12.99',img:'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',desc:'Marketing strategies for the digital age.'},
    {id:'c8',title:'AWS Cloud Practitioner',teacher:'Ahmed Zaki',rating:4.3,price:'$17.99',img:'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',desc:'Introduction to AWS cloud services.'},
    {id:'c9',title:'Photography Masterclass',teacher:'Noor',rating:4.8,price:'$11.99',img:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',desc:'Learn composition, lighting and editing.'},
    {id:'c10',title:'SQL & Databases',teacher:'Youssef',rating:4.6,price:'$9.99',img:'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',desc:'Relational databases and SQL queries.'},
    {id:'c11',title:'iOS App Development',teacher:'Mariam',rating:4.5,price:'$19.99',img:'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80',desc:'Build native iOS apps with Swift.'},
    {id:'c12',title:'Personal Finance & Investing',teacher:'Samir',rating:4.2,price:'$8.99',img:'https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=1200&q=80',desc:'Manage money and invest wisely.'}
  ]
};

// Basic DOM helpers
function el(sel){return document.querySelector(sel)}
function els(sel){return Array.from(document.querySelectorAll(sel))}

// Render header user box
function renderHeader(){
  el('#total-users').textContent = (localStorage.getItem('users_count') || '0') + ' مستخدم';
}

// Render course grid
function renderCourses(list){
  const wrap = el('#courses-grid'); wrap.innerHTML = '';
  list.forEach(c=>{
    const card = document.createElement('div'); card.className = 'course-card';
    card.innerHTML = `
      <div class="course-thumb" style="background-image:url('${c.img}')"></div>
      <div class="course-body">
        <div class="course-title">${c.title}</div>
        <div class="course-teacher">${c.teacher} • ⭐ ${c.rating}</div>
        <div class="course-bottom"><div class="price">${c.price}</div><button class="btn-enroll" data-id="${c.id}">عرض</button></div>
      </div>
    `;
    wrap.appendChild(card);
  });
  // bind buttons
  els('.btn-enroll').forEach(b=>b.addEventListener('click', e=> openCourseModal(e.target.dataset.id)));
}

// Course modal
function openCourseModal(id){
  const course = DATA.courses.find(x=>x.id===id); if(!course) return;
  const modal = el('#modal'); modal.style.display='flex';
  modal.innerHTML = `<div class="panel">
    <div style="display:flex;gap:16px;align-items:flex-start">
      <div style="flex:1"><img src="${course.img}" alt="${course.title}" style="width:100%;border-radius:8px;object-fit:cover;max-height:320px"/></div>
      <div style="width:360px">
        <h2 style="margin:0 0 8px">${course.title}</h2>
        <div class="muted">${course.teacher} • ⭐ ${course.rating}</div>
        <p style="margin-top:12px">${course.desc}</p>
        <div style="margin-top:14px"><button id="enroll-now" class="btn-enroll">${course.price==='Free'?'التحق مجاناً':'اشترِ الآن'}</button> <button id="close-modal" class="icon-btn">إغلاق</button></div>
      </div>
    </div>
  </div>`;
  el('#close-modal').addEventListener('click', ()=> modal.style.display='none');
  el('#enroll-now').addEventListener('click', ()=>{
    const enrolled = JSON.parse(localStorage.getItem('enrolled')||'[]');
    if(enrolled.includes(id)){ alert('لقد التحقت مسبقاً'); return; }
    enrolled.push(id); localStorage.setItem('enrolled', JSON.stringify(enrolled)); alert('تم الالتحاق (تجريبي)'); modal.style.display='none'; renderEnrolled();
  });
}

// Search
function bindSearch(){
  el('#search-input').addEventListener('input', e=>{
    const q = e.target.value.toLowerCase();
    const filtered = DATA.courses.filter(c=> (c.title+c.teacher+c.desc).toLowerCase().includes(q));
    renderCourses(filtered);
  });
}

// Enrolled courses render
function renderEnrolled(){
  const wrap = el('#enrolled-list'); wrap.innerHTML = '';
  const ids = JSON.parse(localStorage.getItem('enrolled')||'[]');
  ids.forEach(id=>{
    const c = DATA.courses.find(x=>x.id===id);
    if(c){
      const d = document.createElement('div'); d.style.marginBottom='8px'; d.innerHTML = `<strong>${c.title}</strong><div class="muted">${c.teacher}</div>`;
      wrap.appendChild(d);
    }
  });
}

// init
function init(){
  renderHeader();
  renderCourses(DATA.courses);
  bindSearch();
  renderEnrolled();
  // set users count demo
  if(!localStorage.getItem('users_count')) localStorage.setItem('users_count','1245');
}
document.addEventListener('DOMContentLoaded', init);


// Ensure mock lessons exist for dashboard
DATA.courses.forEach((c, idx)=>{
  if(!c.lessons) c.lessons = [];
  if(c.lessons.length===0){
    for(let i=1;i<=8;i++){
      c.lessons.push({id:c.id+'_l'+i, title:{ar:'درس '+i, en:'Lesson '+i, fr:'Leçon '+i}, duration: (8+i*5)+' min', content:'محتوى تجريبي للدرس '+i});
    }
  }
});


// === Certificates issuing ===
DATA.courses.forEach(c=>{
  const progKey = 'progress_'+c.id;
  const prog = JSON.parse(localStorage.getItem(progKey) || '{"completed":[]}');
  if(c.lessons && prog.completed && prog.completed.length===c.lessons.length){
    // all lessons complete
    const certs = JSON.parse(localStorage.getItem('certs')||'{}');
    if(!certs[c.id]){
      certs[c.id] = {id:c.id+'-'+Date.now(), name:c.title, issuedAt:Date.now()};
      localStorage.setItem('certs', JSON.stringify(certs));
      console.log('Certificate issued for', c.title);
    }
  }
});
