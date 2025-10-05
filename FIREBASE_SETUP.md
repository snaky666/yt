
# إعداد Firebase للموقع

## الخطوات المطلوبة:

### 1. إنشاء مشروع Firebase
1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. اضغط "Add project" أو "إضافة مشروع"
3. أدخل اسم المشروع (مثل: NovaAcademy)
4. اقبل الشروط واضغط "Continue"
5. يمكنك تعطيل Google Analytics إذا لم تحتاجه
6. اضغط "Create project"

### 2. إعداد Authentication
1. من القائمة الجانبية، اختر "Authentication"
2. اضغط "Get started"
3. اختر "Email/Password" وفعّله
4. اختر "Google" وفعّله:
   - أدخل اسم المشروع
   - أدخل بريد الدعم
   - احفظ

### 3. إضافة تطبيق ويب
1. من صفحة Project Overview، اضغط على أيقونة الويب `</>`
2. أدخل اسم التطبيق (مثل: NovaAcademy Web)
3. اضغط "Register app"
4. **انسخ الكود** الذي يظهر (firebaseConfig)

### 4. تحديث الكود
افتح ملف `assets/js/firebase-config.js` واستبدل القيم:

```javascript
const firebaseConfig = {
  apiKey: "AIza...", // القيمة من Firebase
  authDomain: "...", // القيمة من Firebase
  projectId: "...",  // القيمة من Firebase
  storageBucket: "...", // القيمة من Firebase
  messagingSenderId: "...", // القيمة من Firebase
  appId: "..." // القيمة من Firebase
};
```

### 5. إعداد Authorized Domains
1. في Firebase Console > Authentication > Settings > Authorized domains
2. أضف نطاق GitHub Pages الخاص بك:
   - `username.github.io` (استبدل username باسم المستخدم)

### 6. الرفع على GitHub
بعد تحديث firebase-config.js، ارفع الملفات على GitHub:

```bash
git add .
git commit -m "Add Firebase Authentication"
git push origin main
```

## الميزات:
✅ تسجيل دخول بـ Google (OAuth)
✅ تسجيل دخول بالبريد الإلكتروني وكلمة المرور
✅ تحقق من البريد الإلكتروني
✅ إعادة تعيين كلمة المرور
✅ يعمل على GitHub Pages (static hosting)
✅ آمن تماماً - Firebase يتحقق من البريد الإلكتروني

## ملاحظة أمان:
- Firebase يتحقق من أن البريد الإلكتروني حقيقي
- Google OAuth يتطلب حساب Google حقيقي
- لا يمكن التسجيل ببريد إلكتروني وهمي
