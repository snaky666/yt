document.addEventListener('DOMContentLoaded', ()=>{
  const menuBtn = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const overlayDiv = document.querySelector('.overlay') || document.createElement('div');
  if (!overlayDiv.classList.contains('overlay')) {
    overlayDiv.className = 'overlay';
    document.body.appendChild(overlayDiv);
  }

  function openMenu(){ sidebar.classList.add('open'); overlayDiv.classList.add('show'); }
  function closeMenu(){ sidebar.classList.remove('open'); overlayDiv.classList.remove('show'); }

  if (menuBtn) {
    menuBtn.addEventListener('click', ()=>{ if(sidebar.classList.contains('open')) closeMenu(); else openMenu(); });
  }
  overlayDiv.addEventListener('click', closeMenu);

  const langSelectHeader = document.getElementById('lang-select-header');
  const langSelectSidebar = document.getElementById('lang-select-sidebar');
  
  if (typeof i18n !== 'undefined') {
    if (langSelectHeader) {
      langSelectHeader.value = i18n.currentLang;
      langSelectHeader.addEventListener('change', (e) => {
        i18n.setLanguage(e.target.value);
        window.location.reload();
      });
    }
    
    if (langSelectSidebar) {
      langSelectSidebar.value = i18n.currentLang;
      langSelectSidebar.addEventListener('change', (e) => {
        i18n.setLanguage(e.target.value);
        window.location.reload();
      });
    }
  }

  document.querySelectorAll('form.demo').forEach(form=>{
    form.addEventListener('submit', e=>{
      e.preventDefault();
      const btn = form.querySelector('button[type=submit]');
      btn.disabled = true; btn.textContent = 'Processing...';
      setTimeout(()=>{ alert('Demo: backend not connected yet.'); btn.disabled=false; btn.textContent='Submit'; }, 900);
    });
  });

  const cards = document.querySelectorAll('.card');
  const io = new IntersectionObserver(entries=>{ entries.forEach(ent=>{ if(ent.isIntersecting) ent.target.classList.add('fade-in'); }); }, {threshold:0.15});
  cards.forEach(c=>io.observe(c));

  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  const langToggle = document.getElementById("lang-toggle");
  const langToggleSide = document.getElementById("lang-toggle-side");
  
  function toggleLanguage(element) {
    if (element.textContent.includes("EN")) {
      element.textContent = "🌐 AR";
    } else {
      element.textContent = "🌐 EN";
    }
  }

  if (langToggle) {
    langToggle.addEventListener("click", (e) => {
      e.preventDefault();
      toggleLanguage(e.target);
    });
  }

  if (langToggleSide) {
    langToggleSide.addEventListener("click", (e) => {
      e.preventDefault();
      toggleLanguage(e.target);
    });
  }
});

