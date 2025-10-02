console.log("🚀 منصة الجزائر التعليمية تعمل بنجاح!");

// تبديل اللغة
let currentLang = "ar";
function toggleLang() {
  if (currentLang === "ar") {
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
    alert("Language switched to English ✅");
    currentLang = "en";
  } else {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
    alert("تم التحويل للعربية ✅");
    currentLang = "ar";
  }
}
