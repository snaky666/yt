
// Main app.js for Educational Prototype

// External libs used via CDN in index.html: QRCode, jsQR

const DB = {
  courses:[
    {id:'c1',title:{ar:'مقدمة في جافاسكربت',en:'Intro to JavaScript',fr:'Intro JS'},category:'programming',level:'Beginner',duration:'3 ساعات',rating:4.7,students:1245,desc:{ar:'تعلم أساسيات JavaScript',en:'Learn JavaScript basics',fr:'Apprendre JS basics'},price:0,teacher:'t1'},
    {id:'c2',title:{ar:'تصميم تجربة المستخدم',en:'UX Design',fr:'Design UX'},category:'design',level:'Intermediate',duration:'8 ساعات',rating:4.6,students:846,desc:{ar:'دورة شاملة عن UX',en:'Comprehensive UX course',fr:'Cours complet UX'},price:29,teacher:'t2'},
    {id:'c3',title:{ar:'أساسيات إدارة الأعمال',en:'Business Fundamentals',fr:'Fondamentaux Business'},category:'business',level:'Beginner',duration:'5 ساعات',rating:4.5,students:540,desc:{ar:'مفاهيم الأعمال الأساسية',en:'Core business concepts',fr:'Concepts clés business'},price:19,teacher:'t3'},
    {id:'c4',title:{ar:'الفيزياء الحديثة',en:'Modern Physics',fr:'Physique moderne'},category:'science',level:'Advanced',duration:'12 ساعات',rating:4.8,students:320,desc:{ar:'مقدمات فيزياء متقدمة',en:'Intro to modern physics',fr:'Intro physique moderne'},price:49,teacher:'t4'},
  ],
  users:[],
  comments:{},
  teachers:{t1:{name:'أحمد'},t2:{name:'Lina'},t3:{name:'Carlos'},t4:{name:'Dr. Smith'}}
};

const I = {
  ar:{site:'منصة التعليم العالمية',lead:'مئات الدورات - مسارات مهنية - شهادات معتمدة - تجربة تفاعلية',search:'ابحث عن دورة، موضوع أو مدرس',popular:'الأشهر',library:'المكتبة',courses:'دورات',enroll:'التحق',buy:'اشتري الآن',free:'مجاني',teacherPanel:'لوحة المدرس',payments:'المدفوعات',badges:'شارات'},
  en:{site:'Global Learning Platform',lead:'Hundreds of courses - Career paths - Verified certificates - Interactive learning',search:'Search courses, topics or instructors',popular:'Popular',library:'Library',courses:'Courses',enroll:'Enroll',buy:'Buy now',free:'Free',teacherPanel:'Teacher Panel',payments:'Payments',badges:'Badges'},
  fr:{site:"Plateforme d'apprentissage mondiale",lead:"Des centaines de cours - Parcours pro - Certificats vérifiés - Apprentissage interactif",search:"Rechercher des cours, sujets ou instructeurs",popular:"Populaires",library:"Bibliothèque",courses:"Cours",enroll:"S'inscrire",buy:"Acheter",free:"Gratuit",teacherPanel:"Panneau Enseignant",payments:"Paiements",badges:"Badges"}
};

let state = {lang:'ar',filter:'all',query:'',user:null,role:'student'};

function t(key){return I[state.lang][key]||key}
function el(q){return document.querySelector(q)}
function els(q){return Array.from(document.querySelectorAll(q))}

function renderHeader(){
  el('#site-title').textContent = t('site')
  el('#hero-title').textContent = t('site')
  el('#hero-lead').textContent = t('lead')
  el('#search').placeholder = t('search')
  el('#popular-title').textContent = t('popular')
  el('#library-title').textContent = t('library')
  document.title = t('site') + ' - Prototype'
}

function renderCourses(){
  const grid = el('#courses-grid'); grid.innerHTML='';
  const list = DB.courses.filter(c=> (state.filter==='all' || c.category===state.filter) && ((c.title[state.lang]||'').toLowerCase().includes(state.query.toLowerCase()) || (c.desc[state.lang]||'').toLowerCase().includes(state.query.toLowerCase())) )
  list.forEach(c=>{
    const card = document.createElement('article'); card.className='card fade-up';
    card.innerHTML = `
      <div class="thumb">${c.title[state.lang]}</div>
      <div style="margin-top:8px;font-weight:700">${c.title[state.lang]}</div>
      <div class="meta">${c.level} • ${c.duration} • ⭐ ${c.rating} • ${c.students} ${state.lang==='ar'?'مشارك':'students'}</div>
      <div style="margin-top:8px;display:flex;gap:8px">
        <button class="chip" data-id="${c.id}">${t('courses').startsWith('د')? 'عرض':'View'}</button>
        <button class="chip" data-enroll="${c.id}">${c.price>0? (t('buy')): (t('enroll'))}</button>
      </div>
    `
    grid.appendChild(card)
    setTimeout(()=>card.classList.add('show'),50)
  })
  el('#total-courses').textContent = (list.length) + ' ' + (state.lang==='ar'?'دورات':'courses')
  el('#total-users').textContent = (DB.users.length||0) + ' ' + (state.lang==='ar'?'مستخدم':'users')
}

function renderPopular(){
  const box = el('#popular-list'); box.innerHTML='';
  DB.courses.slice(0,3).forEach(c=>{
    const r = document.createElement('div'); r.style.margin='8px 0'; r.innerHTML = `<div style="font-weight:700">${c.title[state.lang]}</div><div class="muted">${c.desc[state.lang]}</div>`
    box.appendChild(r)
  })
}

function renderAISuggestions(){
  const wrap = el('#ai-suggestions'); wrap.innerHTML='';
  const q = state.query.trim().toLowerCase();
  let recs = [];
  if(!q) recs = DB.courses.slice(0,3)
  else recs = DB.courses.filter(c=> (c.title.ar+c.title.en+c.title.fr+c.desc.ar+c.desc.en+c.desc.fr).toLowerCase().includes(q)).slice(0,3)
  recs.forEach(c=>{
    const d = document.createElement('div'); d.className='chip'; d.style.display='inline-block'; d.style.margin='6px 6px 0 0'; d.textContent = c.title[state.lang]; d.addEventListener('click',()=>openCourse(c.id)); wrap.appendChild(d)
  })
}

// events
function bindEvents(){
  els('.chip[data-lang]').forEach(b=>b.addEventListener('click',e=>{
    state.lang = e.target.dataset.lang; document.documentElement.lang = state.lang; document.documentElement.dir = (state.lang==='ar'?'rtl':'ltr'); renderAll();
  }))
  els('.chip[data-filter]').forEach(b=>b.addEventListener('click',e=>{ state.filter = e.target.dataset.filter; renderCourses(); }))
  el('#search').addEventListener('input',e=>{ state.query = e.target.value; renderCourses(); renderAISuggestions(); })
  document.addEventListener('click',e=>{
    const id = e.target.dataset.id; if(id){ openCourse(id) }
    const enroll = e.target.dataset.enroll; if(enroll){ enrollCourse(enroll) }
  })
  el('#close-modal').addEventListener('click',()=>closeModal())
  el('#open-signup').addEventListener('click',()=>{ const u={id:'u'+Date.now(),name: state.lang==='ar'?'طالب جديد':'New Student'}; DB.users.push(u); state.user=u; alert(state.lang==='ar'?'تم إنشاء مستخدم تجريبي':'Demo user created'); renderAll(); })
  el('#open-login').addEventListener('click',()=>{ state.user={id:'demo',name: state.lang==='ar'?'طالب تجريبي':'Demo Student'}; state.role='student'; alert(state.lang==='ar'?'تم تسجيل الدخول كـ طالب تجريبي':'Logged in as demo student'); renderAll(); })
  el('#logout').addEventListener('click',()=>{ state.user=null; state.role='student'; alert(state.lang==='ar'?'تم تسجيل الخروج':'Logged out'); renderAll(); })
  el('#dash-courses').addEventListener('click',()=>showDash('courses'))
  el('#dash-progress').addEventListener('click',()=>showDash('progress'))
  el('#dash-forum').addEventListener('click',()=>showDash('forum'))
  el('#dash-teacher').addEventListener('click',()=>showDash('teacher'))
  el('#dash-payments').addEventListener('click',()=>showDash('payments'))
  el('#download-cert').addEventListener('click',()=>{ generateCertificate(); })
  el('#verify-btn').addEventListener('click',()=>{ const val = el('#verify-input').value.trim(); if(!val) return alert(state.lang==='ar'?'أدخل رمز الشهادة':'Enter certificate token'); const res = verifyCertificateToken(val); if(res.ok) showVerifyResult(res.cert.id,true,res.cert); else { showVerifyResult(val,false,null) } })
}

// core actions
function openCourse(id){
  const course = DB.courses.find(x=>x.id===id)
  if(!course) return; el('#modal-title').textContent = course.title[state.lang]
  el('#modal-body').innerHTML = `
    <div style="display:flex;gap:12px;flex-wrap:wrap">
      <div style="flex:1;min-width:280px">
        <div style="background:#061225;padding:12px;border-radius:10px">
          <div class="video-overlay">مشغل فيديو تجريبي</div>
          <div style="margin-top:10px">${course.desc[state.lang]}</div>
        </div>
      </div>
      <div style="width:320px">
        <div style="background:linear-gradient(180deg,rgba(255,255,255,0.01),transparent);padding:10px;border-radius:10px">
          <div style="font-weight:700">${course.title[state.lang]}</div>
          <div class="muted">${course.level} • ${course.duration}</div>
          <div style="margin-top:12px"><button class="btn" id="take-quiz" data-course="${course.id}">${t('enroll')}</button></div>
        </div>
        <div style="margin-top:12px;background:linear-gradient(180deg,rgba(255,255,255,0.01),transparent);padding:10px;border-radius:10px">
          <h4>التعليقات</h4>
          <div id="comments-${course.id}"></div>
          <div style="margin-top:8px"><input id="comment-input-${course.id}" placeholder="اكتب تعليقك" style="width:100%;padding:8px;border-radius:8px;border:1px solid rgba(255,255,255,0.03);background:transparent;color:inherit"/><button class="chip" id="add-comment-${course.id}" style="margin-top:6px">أرسل</button></div>
        </div>

        <div style="margin-top:12px;background:linear-gradient(180deg,rgba(255,255,255,0.01),transparent);padding:10px;border-radius:10px">
          <h4>ملفات الدورة</h4>
          <input type="file" id="upload-${course.id}" />
          <div id="uploads-list-${course.id}" class="muted" style="margin-top:8px"></div>
        </div>

      </div>
    </div>
  `
  setTimeout(()=>{
    el(`#add-comment-${course.id}`).addEventListener('click',()=>{
      const v = el(`#comment-input-${course.id}`).value.trim(); if(!v) return alert(state.lang==='ar'?'اكتب تعليق':'Write a comment'); DB.comments[course.id]=DB.comments[course.id]||[]; DB.comments[course.id].push({user:state.user?state.user.name:'زائر',text:v,at:Date.now()}); renderComments(course.id); broadcastComment(course.id,{user:state.user?state.user.name:'Guest',text:v,at:Date.now()})
    })
    renderComments(course.id)
    el('#take-quiz').addEventListener('click',()=>{ if(course.price>0) openPayment(course.id); else enrollCourse(course.id) })
    const up = el(`#upload-${course.id}`);
    up.addEventListener('change',e=>{
      const files = Array.from(e.target.files);
      const list = el(`#uploads-list-${course.id}`);
      files.forEach(f=>{
        const reader = new FileReader(); reader.onload = ()=>{
          const id = 'f'+Date.now(); const uploads = JSON.parse(localStorage.getItem('uploads_'+course.id)||'[]'); uploads.push({id,name:f.name,src:reader.result}); localStorage.setItem('uploads_'+course.id,JSON.stringify(uploads)); renderUploads(course.id)
        }; reader.readAsDataURL(f)
      })
    })
    renderUploads(course.id)
  },20)

  el('#modal').classList.add('open'); el('#modal').setAttribute('aria-hidden','false')
}
function closeModal(){ el('#modal').classList.remove('open'); el('#modal').setAttribute('aria-hidden','true') }
function renderComments(courseId){
  const wrap = el(`#comments-${courseId}`); wrap.innerHTML=''; const arr = DB.comments[courseId]||[];
  arr.slice().reverse().forEach(c=>{
    const d = document.createElement('div'); d.style.margin='8px 0'; d.innerHTML = `<div style="font-weight:700">${c.user}</div><div class="muted" style="font-size:13px">${new Date(c.at).toLocaleString()}</div><div style="margin-top:6px">${c.text}</div>`
    wrap.appendChild(d)
  })
}
function renderUploads(courseId){ const list = el(`#uploads-list-${courseId}`); if(!list) return; list.innerHTML=''; const arr = JSON.parse(localStorage.getItem('uploads_'+courseId)||'[]'); arr.forEach(u=>{ const d = document.createElement('div'); d.className='muted'; d.textContent = u.name; list.appendChild(d) }) }
function enrollCourse(id){
  if(!state.user){ alert(state.lang==='ar'?'سجل الدخول أولاً':'Please login first'); return }
  const course = DB.courses.find(c=>c.id===id);
  if(course.price>0){ openPayment(id); return }
  alert(state.lang==='ar'?'تم تسجيلك تجريبيًا في الدورة':'You have been enrolled (demo)'); const key = 'enrolled_'+id; localStorage.setItem(key, JSON.stringify({id,progress:0})); renderDash();
}
function openPayment(courseId){
  const course = DB.courses.find(c=>c.id===courseId);
  const html = `
    <div style="padding:12px" class="payment-panel">
      <div style="font-weight:700">${course.title[state.lang]}</div>
      <div class="muted">${course.price} USD</div>
      <label>اسم حامل البطاقة<input id="cc-name" placeholder="Full name" style="width:100%;padding:8px;border-radius:6px"/></label>
      <label>رقم بطاقة (نموذج)<input id="cc-num" placeholder="4242 4242 4242 4242" style="width:100%;padding:8px;border-radius:6px"/></label>
      <div style="display:flex;gap:8px"><button class="btn" id="pay-confirm">ادفع (Sandbox)</button><button class="chip" id="pay-cancel">إلغاء</button></div>
    </div>
  `
  el('#modal-body').innerHTML = html; el('#modal-title').textContent = t('payments'); el('#modal').classList.add('open'); el('#modal').setAttribute('aria-hidden','false')
  el('#pay-cancel').addEventListener('click',()=>closeModal())
  el('#pay-confirm').addEventListener('click',()=>{
    setTimeout(()=>{ alert(state.lang==='ar'?'تمت عملية الدفع بنجاح (Sandbox)':'Payment successful (Sandbox)'); localStorage.setItem('enrolled_'+courseId, JSON.stringify({id:courseId,progress:0})); const payments = JSON.parse(localStorage.getItem('payments')||'[]'); payments.push({course:course.title[state.lang],amount:course.price,at:Date.now()}); localStorage.setItem('payments',JSON.stringify(payments)); closeModal(); renderDash() },800)
  })
}

// quiz
function startQuiz(courseId){
  const q = [
    {q:{ar:'ما هو HTML؟',en:'What is HTML?',fr:'Qu\\'est-ce que HTML?'},choices:[{id:1,text:{ar:'لغة ترميز',en:'Markup language',fr:'Langage de balisage'}},{id:2,text:{ar:'قاعدة بيانات',en:'Database',fr:'Base de données'}}],answer:1}
  ]
  let idx=0,score=0
  const next = ()=>{
    if(idx>=q.length){ alert((state.lang==='ar'?'انتهى الاختبار. نتيجتك: ':'Test finished. Score: ')+score+'/'+q.length);
      const key='enrolled_'+courseId; const obj=JSON.parse(localStorage.getItem(key)||'null'); if(obj){ obj.progress=100; localStorage.setItem(key,JSON.stringify(obj)) } renderDash(); return
    }
    const Q = q[idx]; const sel = prompt(Q.q[state.lang] + '\n' + Q.choices.map(c=>c.id+' - '+c.text[state.lang]).join('\n'))
    if(Number(sel)===Q.answer) score++;
    idx++; next()
  }
  next()
}

// dashboard
function renderDash(){
  const list = el('#dash-list'); list.innerHTML='';
  for(let k in localStorage){ if(k.startsWith('enrolled_')){
    const obj = JSON.parse(localStorage.getItem(k)); const course = DB.courses.find(c=>c.id===obj.id); const d = document.createElement('div'); d.className='card'; d.style.margin='8px 0'; d.innerHTML = `<div style="font-weight:700">${course.title[state.lang]}</div><div class="muted">${obj.progress||0}%</div>`; list.appendChild(d)
  }}
  const badgesWrap = document.createElement('div'); badgesWrap.style.marginTop='12px'; badgesWrap.innerHTML = `<div class="muted">${t('badges')}</div><div class="badges-list" id="badges-list"></div>`; list.appendChild(badgesWrap); renderBadges();
}
function showDash(tab){ el('#dash-main').innerHTML = '<h3>'+ (tab==='courses'? 'دوراتي': (tab==='progress'?'التقدم': (tab==='teacher'? t('teacherPanel') : t('payments')))) +'</h3><div id="dash-content"></div>'; if(tab==='courses') renderDash(); if(tab==='forum') el('#dash-content').innerHTML='<div class="muted">منتدى تجريبي - يمكن توسيعه عبر WebSocket أو backend</div>'; if(tab==='teacher') renderTeacherPanel(); if(tab==='payments') renderPayments(); }
function renderTeacherPanel(){ const wrap = el('#dash-content'); wrap.innerHTML = '<div class="muted">لوحة المدرس التجريبية — يمكنك إنشاء دورة ورفع ملفات (محلياً)</div>'; const btn = document.createElement('button'); btn.className='chip'; btn.textContent='إنشاء دورة جديدة'; btn.addEventListener('click',()=>{ const id='c'+(DB.courses.length+1); DB.courses.push({id,title:{ar:'دورة جديدة',en:'New Course',fr:'Nouveau Cours'},category:'programming',level:'Beginner',duration:'1 ساعة',rating:0,students:0,desc:{ar:'وصف',en:'desc',fr:'desc'},price:0,teacher:'t1'}); renderCourses(); alert('تم إنشاء دورة تجريبية') }); wrap.appendChild(btn) }
function renderPayments(){ const wrap = el('#dash-content'); wrap.innerHTML = '<div class="muted">سجل المدفوعات (موك)</div>'; const payments = JSON.parse(localStorage.getItem('payments')||'[]'); payments.forEach(p=>{ const d = document.createElement('div'); d.className='card'; d.style.margin='8px 0'; d.innerHTML = `<div style="font-weight:700">${p.course}</div><div class="muted">${p.amount} USD — ${new Date(p.at).toLocaleString()}</div>`; wrap.appendChild(d) }) }

// certificates with QR and verification
function generateCertificate(){
  const certId = 'cert_'+Date.now()+'_'+Math.random().toString(36).slice(2,9);
  const cert = { id: certId, name: state.user?state.user.name:(state.lang==='ar'?'طالب تجريبي':'Demo Student'), issuedAt: Date.now(), issuer: t('site') };
  const certs = JSON.parse(localStorage.getItem('certs')||'{}'); certs[certId]=cert; localStorage.setItem('certs', JSON.stringify(certs));
  const c = document.createElement('canvas'); c.width=1200; c.height=675; const ctx=c.getContext('2d');
  ctx.fillStyle='#071427'; ctx.fillRect(0,0,c.width,c.height);
  ctx.fillStyle='#0ea5a9'; ctx.fillRect(40,40,c.width-80,80);
  ctx.fillStyle='#fff'; ctx.font='40px serif'; ctx.fillText(state.lang==='ar'?'شهادة إتمام':'Certificate of Completion', 80,120);
  ctx.font='28px serif'; ctx.fillText(cert.name, 80,200);
  ctx.font='18px serif'; ctx.fillStyle='#9aa4b2'; ctx.fillText((state.lang==='ar'?'تأكيد إتمام الدورة بنجاح - نموذج تجريبي':'Confirmation of course completion - demo'), 80,260);
  const token = JSON.stringify({id:certId,issuer:cert.issuer});
  QRCode.toDataURL(token, {width:200, margin:1}, function (err,url) {
    if(err){ console.error(err); return }
    const img = new Image(); img.onload = ()=>{
      ctx.drawImage(img, c.width-260, 120, 200, 200);
      ctx.fillStyle='#9aa4b2'; ctx.font='14px serif'; ctx.fillText('ID: '+certId, 80, c.height-60);
      const dataUrl = c.toDataURL('image/png'); const a = document.createElement('a'); a.href=dataUrl; a.download=certId+'.png'; a.click();
      showVerifyResult(certId,true,cert);
    };
    img.src = url;
  });
}

function verifyCertificateToken(token){
  try{
    const obj = JSON.parse(token);
    if(!obj || !obj.id) return {ok:false,msg:'Invalid token'};
    const certs = JSON.parse(localStorage.getItem('certs')||'{}');
    if(certs[obj.id]) return {ok:true,cert:certs[obj.id]};
    return {ok:false,msg:'Certificate not found'};
  }catch(e){return {ok:false,msg:'Malformed token'}}
}

function showVerifyResult(id,ok,cert){
  const wrap = el('#verify-result'); wrap.innerHTML='';
  if(ok){
    const d = document.createElement('div'); d.className='card'; d.style.padding='12px'; d.innerHTML = `<div style="font-weight:700">${state.lang==='ar'?'الشهادة صالحة':'Valid certificate'}</div><div class="muted">ID: ${id}</div><div>${cert.name} — ${new Date(cert.issuedAt).toLocaleString()}</div>`;
    wrap.appendChild(d);
  } else {
    const d = document.createElement('div'); d.className='card'; d.style.padding='12px'; d.innerHTML = `<div style="font-weight:700">${state.lang==='ار'?'الشهادة غير موجودة':'Certificate not valid'}</div><div class="muted">${id}</div>`;
    wrap.appendChild(d);
  }
}

// Badges
function awardBadge(key,label){ const badges = JSON.parse(localStorage.getItem('badges')||'{}'); badges[key]=label; localStorage.setItem('badges',JSON.stringify(badges)); renderBadges(); }
function renderBadges(){ const list = el('#badges-list'); if(!list) return; list.innerHTML=''; const badges = JSON.parse(localStorage.getItem('badges')||'{}'); for(let k in badges){ const d = document.createElement('div'); d.className='badge-card'; d.textContent = badges[k]; list.appendChild(d) } }

// BroadcastChannel for comments
const bc = ('BroadcastChannel' in window) ? new BroadcastChannel('edu_comments') : null;
function broadcastComment(courseId,data){ if(bc) bc.postMessage({courseId,data}); }
if(bc){ bc.onmessage = (ev)=>{ const {courseId,data} = ev.data; DB.comments[courseId]=DB.comments[courseId]||[]; DB.comments[courseId].push(data); renderComments(courseId) }}

// Service Worker registration
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/sw.js').then(()=>console.log('SW registered')).catch(()=>console.log('SW register failed'))
}

// QR camera scanning using getUserMedia + jsQR
let videoStream = null;
let scanning = false;
function startQrScanner(){
  // create modal content
  const body = el('#modal-body');
  body.innerHTML = `
    <div style="display:flex;gap:12px;flex-wrap:wrap">
      <div style="flex:1">
        <video id="qr-video" style="width:100%;max-height:480px;border-radius:8px;background:#000"></video>
        <canvas id="qr-canvas" style="display:none"></canvas>
      </div>
      <div style="width:320px">
        <div id="qr-status" class="muted">كاميرا متوقفة</div>
        <div style="margin-top:12px"><button class="chip" id="stop-scan">إيقاف المسح</button></div>
      </div>
    </div>
  `;
  el('#modal-title').textContent = state.lang==='ar'?'مسح الشهادة بالكاميرا':'Scan Certificate (Camera)';
  el('#modal').classList.add('open'); el('#modal').setAttribute('aria-hidden','false');

  const video = el('#qr-video');
  const canvas = el('#qr-canvas');
  const ctx = canvas.getContext('2d');
  const status = el('#qr-status');
  scanning = true;

  navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}}).then(stream=>{
    videoStream = stream;
    video.srcObject = stream;
    video.setAttribute('playsinline', true);
    video.play();
    status.textContent = state.lang==='ar'?'المسح جارٍ...':'Scanning...';
    requestAnimationFrame(tick);
  }).catch(err=>{
    status.textContent = state.lang==='ar'?'فشل الوصول للكاميرا':'Camera access failed';
  });

  function tick(){
    if(!scanning) return;
    if(video.readyState === video.HAVE_ENOUGH_DATA){
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video,0,0,canvas.width,canvas.height);
      const imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
      try{
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if(code){
          // found QR
          stopQrScanner();
          // code.data contains the token (JSON)
          const token = code.data;
          const res = verifyCertificateToken(token);
          if(res.ok) showVerifyResult(res.cert.id,true,res.cert); else showVerifyResult(token,false,null);
          return;
        }
      }catch(e){
        console.error('jsQR error', e);
      }
    }
    requestAnimationFrame(tick);
  }

  el('#stop-scan').addEventListener('click', stopQrScanner);
}

function stopQrScanner(){
  scanning = false;
  if(videoStream){
    const tracks = videoStream.getTracks();
    tracks.forEach(t=>t.stop());
    videoStream = null;
  }
  closeModal();
}

// init
function renderAll(){ renderHeader(); renderCourses(); renderPopular(); renderDash(); renderAISuggestions(); }
bindEvents();
renderAll();
localStorage.setItem('enrolled_c1', JSON.stringify({id:'c1',progress:35}));
awardBadge('first_login', state.lang==='ar'?'أول تسجيل':'First Login');

// expose scanner to global (for button)
window.startQrScanner = startQrScanner;
