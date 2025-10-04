
document.addEventListener('DOMContentLoaded', ()=>{
  const menuBtn = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const overlayDiv = document.createElement('div');
  overlayDiv.className = 'overlay';
  document.body.appendChild(overlayDiv);

  function openMenu(){ sidebar.classList.add('open'); overlayDiv.classList.add('show'); }
  function closeMenu(){ sidebar.classList.remove('open'); overlayDiv.classList.remove('show'); }

  menuBtn.addEventListener('click', ()=>{ if(sidebar.classList.contains('open')) closeMenu(); else openMenu(); });
  overlayDiv.addEventListener('click', closeMenu);

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
});
// Toggle side menu
const menuToggle = document.getElementById("menu-toggle");
const sideMenu = document.getElementById("side-menu");

menuToggle.addEventListener("click", () => {
  sideMenu.style.right = sideMenu.style.right === "0px" ? "-250px" : "0px";
});

// Change navbar on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Language toggle
function toggleLanguage(element) {
  if (element.textContent.includes("EN")) {
    element.textContent = "🌐 AR";
  } else {
    element.textContent = "🌐 EN";
  }
}

document.getElementById("lang-toggle").addEventListener("click", (e) => {
  e.preventDefault();
  toggleLanguage(e.target);
});

document.getElementById("lang-toggle-side").addEventListener("click", (e) => {
  e.preventDefault();
  toggleLanguage(e.target);
});
