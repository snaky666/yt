
// عناصر التحكم
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

// عند الضغط على زر ☰
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// إغلاق القائمة عند الضغط على أي رابط
document.querySelectorAll("#nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});
