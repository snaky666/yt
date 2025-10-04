NovaAcademy - نسخة مبسطة
=======================
هذه نسخة مبسطة/تجريبية لواجهة منصة تعليمية (NovaAcademy).

● الواجهة الأمامية:
  - ملفات جاهزة داخل /frontend
  - افتح frontend/index.html في المتصفح لتجربة الواجهة (React عبر CDN)

● الواجهة الخلفية:
  - داخل /backend
  - لتشغيلها:
      cd backend
      npm install
      node index.js
  - تستمع على PORT (افتراضي 4000) وتوفر نقاط نهاية بسيطة:
      GET /api/health
      GET /api/courses
      POST /api/login  {username, password}

ملاحظات:
- هذه مشروع تجريبي ومبسط. لربط قاعدة بيانات PostgreSQL أضف إعدادات الاتصال في ملف .env وأكمل الشيفرة.
- لتشغيل نسخة متكاملة احترافية استخدم أدوات مثل Vercel (Frontend) و Render/Heroku/AWS (Backend) وربط PostgreSQL.
