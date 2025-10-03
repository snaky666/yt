
// Shared site script: language switching, navigation highlight, data and helpers
const LANG = {
  en: {
    home: "Home",
    courses: "Courses",
    books: "Books",
    categories: "Categories",
    dashboard: "Dashboard",
    about: "About",
    contact: "Contact",
    search_placeholder: "Search courses, topics, or instructors...",
    enroll: "Enroll",
    view: "View",
    recommended: "Recommended for you",
    users_count_prefix: "",
    users_count_suffix: " users"
  },
  ar: {
    home: "الرئيسية",
    courses: "الدورات",
    books: "الكتب",
    categories: "التصنيفات",
    dashboard: "لوحة الطالب",
    about: "من نحن",
    contact: "اتصل بنا",
    search_placeholder: "ابحث عن دورة، تقنية أو مدرس...",
    enroll: "الالتحاق",
    view: "عرض",
    recommended: "مقترح لك",
    users_count_prefix: "",
    users_count_suffix: " مستخدم"
  }
};

let state = { lang: localStorage.getItem('site_lang') || 'ar' };

function applyLanguage(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.dataset.i18n;
    const v = LANG[state.lang][key] || LANG['en'][key] || '';
    el.textContent = v;
  });
  // placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    const key = el.dataset.i18nPlaceholder;
    el.placeholder = LANG[state.lang][key] || '';
  });
  // mark active lang button
  document.querySelectorAll('.lang-btn').forEach(b=> b.classList.toggle('active', b.dataset.lang===state.lang));
  localStorage.setItem('site_lang', state.lang);
}

function bindLangButtons(){
  document.querySelectorAll('.lang-btn').forEach(b=> b.addEventListener('click', ()=>{
    state.lang = b.dataset.lang;
    applyLanguage();
  }));
}

// Simple nav active highlighting based on current page filename
function markActiveNav(){
  const parts = location.pathname.split('/');
  const page = parts[parts.length-1] || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a=>{
    const target = a.dataset.target || a.getAttribute('href') || '';
    a.classList.toggle('active', target===page || (target==='' && page==='index.html'));
  });
}

// Simple DATA embedded
const DATA = {
  courses: [
    {id:'c1',title_en:'Mastering JavaScript',title_ar:'إتقان جافاسكربت',teacher:'Ali Hassan',rating:4.7,price:'Free',img:'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',desc_en:'Comprehensive JS course',desc_ar:'دورة شاملة عن جافاسكربت'},
    {id:'c2',title_en:'Python for Data Science',title_ar:'بايثون لعلوم البيانات',teacher:'Sara Ibrahim',rating:4.8,price:'$19.99',img:'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1200&q=80',desc_en:'Hands-on Python projects',desc_ar:'مشاريع عملية بالبايثون'},
    {id:'c3',title_en:'UI/UX Design Fundamentals',title_ar:'أساسيات تصميم UX',teacher:'Lina Khaled',rating:4.6,price:'$14.99',img:'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',desc_en:'Design interfaces',desc_ar:'تصميم واجهات مستخدم'}
  ],
  books: [
    {id:'b1',title_en:'Eloquent JavaScript',title_ar:'Eloquent JavaScript',author:'Marijn Haverbeke',source:'https://eloquentjavascript.net/'},
    {id:'b2',title_en:"You Don't Know JS",title_ar:"You Don't Know JS",author:'Kyle Simpson',source:'https://github.com/getify/You-Dont-Know-JS'}
  ],
  categories: ['Development','Design','Business','Data']
};

function formatCourseTitle(c){
  return state.lang==='ar' ? c.title_ar : c.title_en;
}
function formatCourseDesc(c){
  return state.lang==='ar' ? c.desc_ar : c.desc_en;
}

// utilities for pages to use
function renderCoursesGrid(containerSelector, list){
  const wrap = document.querySelector(containerSelector);
  if(!wrap) return;
  wrap.innerHTML = '';
  list.forEach(c=>{
    const card = document.createElement('div'); card.className='card course-card';
    card.innerHTML = `
      <div class="thumb" style="background-image:url('${c.img}')"></div>
      <div class="card-body">
        <div class="title">${formatCourseTitle(c)}</div>
        <div class="meta">${c.teacher} • ⭐ ${c.rating}</div>
        <div class="card-foot"><div class="price">${c.price}</div><div><a class="nav-link" href="course.html?id=${c.id}">${LANG[state.lang].view}</a></div></div>
      </div>
    `;
    wrap.appendChild(card);
  });
}

// basic init for any page
function siteInit(){
  applyLanguage();
  bindLangButtons();
  markActiveNav();
  // set users count demo
  if(!localStorage.getItem('users_count')) localStorage.setItem('users_count','1245');
  // display courses on pages that have #courses-grid
  renderCoursesGrid('#courses-grid', DATA.courses);
}

document.addEventListener('DOMContentLoaded', siteInit);
