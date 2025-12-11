/**
 * =====================================================
 * ملف إعدادات التطبيق - App Configuration File
 * =====================================================
 * 
 * هذا الملف يحتوي على جميع الإعدادات القابلة للتعديل في التطبيق.
 * لتغيير الموقع المعروض، قم بتعديل قيمة WEBSITE_URL أدناه.
 * 
 * This file contains all configurable settings for the app.
 * To change the displayed website, modify the WEBSITE_URL value below.
 * 
 * =====================================================
 */

/**
 * الرابط الرئيسي للموقع - Main Website URL
 * 
 * قم بتغيير هذا الرابط لعرض موقع ويب مختلف
 * Change this URL to display a different website
 * 
 * مثال / Example:
 * export const WEBSITE_URL = "https://example.com";
 */
export const WEBSITE_URL = "https://myprojectplatform.com/";

/**
 * اسم التطبيق - App Name
 * 
 * يُستخدم في رسائل الخطأ وشاشة التحميل
 * Used in error messages and loading screen
 */
export const APP_NAME = "MyProjectPlatform";

/**
 * إعدادات WebView - WebView Settings
 * 
 * javaScriptEnabled: تفعيل JavaScript
 * domStorageEnabled: تفعيل التخزين المحلي (localStorage)
 * cacheEnabled: تفعيل التخزين المؤقت
 * cacheMode: وضع التخزين المؤقت
 *   - LOAD_DEFAULT: استخدام الكاش الافتراضي
 *   - LOAD_CACHE_ELSE_NETWORK: استخدام الكاش أولاً
 *   - LOAD_NO_CACHE: عدم استخدام الكاش
 *   - LOAD_CACHE_ONLY: استخدام الكاش فقط
 */
export const WEBVIEW_CONFIG = {
  javaScriptEnabled: true,
  domStorageEnabled: true,
  startInLoadingState: true,
  scalesPageToFit: true,
  allowsInlineMediaPlayback: true,
  mediaPlaybackRequiresUserAction: false,
  allowsFullscreenVideo: true,
  cacheEnabled: true,
  cacheMode: "LOAD_DEFAULT" as const,
};

/**
 * ألوان التطبيق - App Colors
 */
export const APP_COLORS = {
  loadingBackground: "#FFFFFF",
  loadingIndicator: "#2196F3",
  errorText: "#424242",
  retryButton: "#2196F3",
};

/**
 * إعدادات الكوكيز والتخزين - Cookie & Storage Settings
 * 
 * sharedCookiesEnabled: مشاركة الكوكيز مع المتصفح
 * thirdPartyCookiesEnabled: السماح بكوكيز الطرف الثالث
 * incognitoMode: وضع التصفح الخاص (لا يحفظ البيانات)
 */
export const STORAGE_CONFIG = {
  sharedCookiesEnabled: true,
  thirdPartyCookiesEnabled: true,
  incognitoMode: false,
};
