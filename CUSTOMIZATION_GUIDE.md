# دليل تخصيص تطبيق WebView Wrapper
# WebView Wrapper App Customization Guide

## 1. تغيير رابط الموقع (Changing the Website URL)

### الموقع: `client/constants/config.ts`

افتح الملف وابحث عن السطر التالي:

```typescript
export const WEBSITE_URL = "https://myprojectplatform.com/";
```

قم بتغيير الرابط إلى موقعك المطلوب:

```typescript
export const WEBSITE_URL = "https://your-website.com/";
```

---

## 2. تغيير اسم التطبيق (Changing the App Name)

### الموقع الأول: `app.json`

ابحث عن الأسطر التالية وقم بتعديلها:

```json
{
  "expo": {
    "name": "MyProjectPlatform",  // ← اسم التطبيق الظاهر للمستخدم
    "slug": "myprojectplatform",   // ← المعرف الداخلي (بدون مسافات)
    ...
  }
}
```

### الموقع الثاني: `client/constants/config.ts`

```typescript
export const APP_NAME = "MyProjectPlatform";  // ← اسم التطبيق في رسائل الخطأ
```

### الموقع الثالث (عند البناء للإنتاج): `android/app/src/main/res/values/strings.xml`

ملاحظة: هذا الملف يُنشأ تلقائياً عند تشغيل `expo prebuild`

```xml
<resources>
    <string name="app_name">MyProjectPlatform</string>
</resources>
```

---

## 3. تغيير أيقونة التطبيق (Changing the App Icon)

### المتطلبات:
- صورة مربعة بدقة عالية (1024x1024 بكسل موصى بها)
- تنسيق PNG بخلفية شفافة (للـ foreground)

### الخطوات:

#### للتطوير مع Expo Go:
استبدل الملفات التالية في مجلد `assets/images/`:

| الملف | الوصف |
|-------|-------|
| `icon.png` | الأيقونة الرئيسية (1024x1024) |
| `android-icon-foreground.png` | الطبقة الأمامية للأيقونة التكيفية |
| `android-icon-background.png` | الطبقة الخلفية للأيقونة التكيفية |
| `splash-icon.png` | أيقونة شاشة البداية |
| `favicon.png` | أيقونة الويب |

#### للبناء النهائي (Production Build):
بعد تشغيل `expo prebuild`، استبدل الملفات في المجلدات التالية:

```
android/app/src/main/res/
├── mipmap-mdpi/      (48x48 بكسل)
├── mipmap-hdpi/      (72x72 بكسل)
├── mipmap-xhdpi/     (96x96 بكسل)
├── mipmap-xxhdpi/    (144x144 بكسل)
├── mipmap-xxxhdpi/   (192x192 بكسل)
└── mipmap-anydpi-v26/
    ├── ic_launcher.xml
    └── ic_launcher_round.xml
```

---

## 4. تغيير ألوان التطبيق (Changing App Colors)

### الموقع: `client/constants/config.ts`

```typescript
export const APP_COLORS = {
  loadingBackground: "#FFFFFF",  // ← لون خلفية التحميل
  loadingIndicator: "#2196F3",   // ← لون مؤشر التحميل
  errorText: "#424242",          // ← لون نص الخطأ
  retryButton: "#2196F3",        // ← لون زر إعادة المحاولة
};
```

### لون خلفية Splash Screen في `app.json`:

```json
{
  "plugins": [
    [
      "expo-splash-screen",
      {
        "backgroundColor": "#ffffff"  // ← لون الخلفية
      }
    ]
  ]
}
```

---

## 5. تغيير Bundle Identifier (معرف التطبيق)

### هام: قم بهذا مرة واحدة فقط قبل النشر!

### الموقع: `app.json`

```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourapp"
    },
    "android": {
      "package": "com.yourcompany.yourapp"
    },
    "scheme": "yourapp"
  }
}
```

---

## 6. إعدادات WebView المتقدمة (Advanced WebView Settings)

### الموقع: `client/constants/config.ts`

```typescript
export const WEBVIEW_CONFIG = {
  javaScriptEnabled: true,           // ← تفعيل JavaScript
  domStorageEnabled: true,           // ← تفعيل التخزين المحلي
  startInLoadingState: true,         // ← إظهار التحميل عند البدء
  scalesPageToFit: true,             // ← ملاءمة الصفحة للشاشة
  allowsInlineMediaPlayback: true,   // ← تشغيل الوسائط داخلياً
  mediaPlaybackRequiresUserAction: false,  // ← تشغيل تلقائي للوسائط
  allowsFullscreenVideo: true,       // ← السماح بملء الشاشة للفيديو
  cacheEnabled: true,                // ← تفعيل التخزين المؤقت
  cacheMode: "LOAD_DEFAULT",         // ← وضع التخزين المؤقت
};
```

---

## 7. بناء التطبيق للإنتاج (Building for Production)

### باستخدام EAS Build:

```bash
# تثبيت EAS CLI
npm install -g eas-cli

# تسجيل الدخول
eas login

# بناء APK للاختبار
eas build --platform android --profile preview

# بناء AAB للنشر على Play Store
eas build --platform android --profile production
```

### باستخدام Expo Prebuild محلياً:

```bash
# إنشاء مشروع Android الأصلي
npx expo prebuild --platform android

# بناء APK
cd android && ./gradlew assembleRelease
```

---

## ملاحظات مهمة (Important Notes)

1. **لا تغير bundle identifier بعد النشر** - سيُعتبر تطبيقاً جديداً
2. **احتفظ بنسخة احتياطية** قبل أي تعديلات
3. **اختبر على أجهزة حقيقية** قبل النشر
4. **تأكد من صلاحيات الإنترنت** في التطبيق المبني

---

## الدعم (Support)

إذا واجهت أي مشاكل، تحقق من:
- اتصال الإنترنت
- صحة الرابط المُدخل
- توافق الإصدارات
