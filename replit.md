# MyProjectPlatform WebView Wrapper

## Overview
تطبيق React Native/Expo يعمل كغلاف WebView لعرض موقع myprojectplatform.com بملء الشاشة. مصمم ليعمل على أجهزة Android منخفضة المواصفات.

## Project Structure
```
client/
├── screens/
│   └── WebViewScreen.tsx    # الشاشة الرئيسية مع WebView
├── constants/
│   └── config.ts            # إعدادات التطبيق القابلة للتعديل
├── components/
│   ├── ErrorBoundary.tsx    # معالجة أخطاء التطبيق
│   └── ThemedText.tsx       # مكونات النص
└── App.tsx                  # نقطة الدخول الرئيسية
```

## Features Implemented
1. **Full-Screen WebView** - عرض الموقع بملء الشاشة
2. **Pull-to-Refresh** - سحب للتحديث (Android)
3. **Hardware Back Button** - دعم زر الرجوع للتنقل
4. **Error Handling** - رسائل خطأ باللغة العربية
5. **External Links** - فتح الروابط الخارجية في المتصفح
6. **Caching** - تخزين مؤقت لتحسين الأداء
7. **Cookie Management** - إدارة الكوكيز

## Configuration (client/constants/config.ts)
- `WEBSITE_URL` - رابط الموقع
- `APP_NAME` - اسم التطبيق
- `WEBVIEW_CONFIG` - إعدادات WebView
- `APP_COLORS` - ألوان التطبيق
- `STORAGE_CONFIG` - إعدادات التخزين

## Error Types
- Network errors - خطأ في الاتصال
- HTTP errors - خطأ في الخادم
- Timeout errors - انتهاء مهلة الاتصال

## Development
- Expo server: port 8081
- Express server: port 5000
- Run: `npm run all:dev`
