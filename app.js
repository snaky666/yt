
// Load data from data.json (which was inlined as a script tag)
const DATA = window.DATA || {};

// For compatibility when data.json is loaded as a script tag, check window.DATA
// But in our environment, data.json is a JSON file loaded as script - so window.DATA undefined.
// So fetch it asynchronously.
async function loadData(){
  try{
    const res = await fetch('data.json'); const parsed = await res.json(); return parsed;
  }catch(e){ console.error('Failed load data', e); return {courses:[],books:[]}; }
}

function el(q){return document.querySelector(q)}
function els(q){return Array.from(document.querySelectorAll(q))}

function renderBooks(books){
  const wrap = el('#books-list'); wrap.innerHTML = '<h2>الكتب</h2>';
  books.forEach(b=>{
    const card = document.createElement('div'); card.className='card';
    card.innerHTML = `<div class="thumb">${b.title.ar || b.title.en}</div>
      <div style="margin-top:8px;font-weight:700">${b.title.ar || b.title.en}</div>
      <div class="meta">المؤلف: ${b.author || 'Unknown'}</div>
      <div style="margin-top:8px"><a class="chip" href="${b.source}" target="_blank">المصدر</a> ${b.file?'<a class="chip" href="'+b.file+'" target="_blank">تحميل (PDF)</a>':''}</div>`;
    wrap.appendChild(card);
  });
  el('#total-books').textContent = books.length + ' كتب';
}

function renderCourses(courses){
  const wrap = el('#courses-list'); wrap.innerHTML = '<h2>الدورات</h2>';
  courses.forEach(c=>{
    const card = document.createElement('div'); card.className='card';
    card.innerHTML = `<div class="thumb">${c.title.ar || c.title.en}</div>
      <div style="margin-top:8px;font-weight:700">${c.title.ar || c.title.en}</div>
      <div class="meta">${c.desc.ar || c.desc.en}</div>
      <div style="margin-top:8px"><button class="chip view-course" data-id="${c.id}">عرض</button> <a class="chip" href="${c.source}" target="_blank">المصدر</a></div>`;
    wrap.appendChild(card);
  });
  el('#total-courses').textContent = courses.length + ' دورات';
  // bind view buttons
  els('.view-course').forEach(b=>b.addEventListener('click', e=>{
    const id = e.target.dataset.id;
    openCourseDetail(id);
  }));
}

async function init(){
  const data = await loadData();
  // expose to window for debugging
  window.DATA = data;
  renderBooks(data.books || []);
  renderCourses(data.courses || []);
  el('#search').addEventListener('input', (e)=>{
    const q = e.target.value.toLowerCase();
    const fc = (data.courses||[]).filter(c=> (c.title.ar+c.title.en+c.title.fr + c.desc.ar + c.desc.en + c.desc.fr).toLowerCase().includes(q));
    const fb = (data.books||[]).filter(b=> (b.title.ar+b.title.en+b.title.fr + (b.author||'')).toLowerCase().includes(q));
    renderCourses(fc);
    renderBooks(fb);
  });
}

function openCourseDetail(id){
  const data = window.DATA || {courses:[]};
  const course = (data.courses||[]).find(c=>c.id===id);
  if(!course) return alert('Course not found');
  const detail = el('#course-detail');
  detail.style.display='block';
  detail.innerHTML = `<div class="card" style="max-width:900px;margin:20px auto">
    <h3>${course.title.ar || course.title.en}</h3>
    <p class="meta">${course.desc.ar || course.desc.en}</p>
    <p class="meta">المصدر: <a href="${course.source}" target="_blank">عرض المادة الأصلية</a></p>
    <div style="margin-top:12px"><button id="close-detail" class="chip">إغلاق</button> <button id="enroll" class="btn">الالتحاق (تجريبي)</button></div>
  </div>`;
  el('#close-detail').addEventListener('click', ()=>{ detail.style.display='none'; });
  el('#enroll').addEventListener('click', ()=>{
    const enrolled = JSON.parse(localStorage.getItem('enrolled')||'[]');
    if(enrolled.includes(id)) return alert('تم الالتحاق مسبقاً');
    enrolled.push(id); localStorage.setItem('enrolled', JSON.stringify(enrolled)); alert('تم الالتحاق (تجريبي)');
  });
}

init();
