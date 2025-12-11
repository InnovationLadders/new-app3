# Design Guidelines - WebView Wrapper App

## Project Overview
A lightweight Android WebView wrapper application that displays https://myprojectplatform.com/ in full-screen mode. The app should be minimal, performant, and optimized for low-end devices with seamless web-to-native integration.

## Architecture Decisions

### Authentication
- **No native authentication required** - all authentication is handled by the website itself within the WebView
- The app simply loads and displays the web content

### Navigation
- **Single-screen architecture** - The app consists of a single WebView that fills the entire screen
- Navigation is handled entirely by the website within the WebView
- Hardware back button navigates backward in WebView history or exits app when on initial page
- External links (tel:, mailto:, different domains) open in the system browser

## Screen Specifications

### Main WebView Screen
**Purpose:** Display the web platform in full-screen mode with native Android integration

**Layout:**
- **No navigation header** - The WebView fills the entire screen from edge to edge
- Safe area insets: None - The WebView uses the full device screen
- The website's own header/navigation is visible within the WebView

**States:**
1. **Loading State:**
   - Display centered ActivityIndicator while web content loads
   - Background color: White (#FFFFFF) or light gray (#F5F5F5)
   - Indicator color: Primary brand color or default Android blue (#2196F3)
   
2. **Error State:**
   - Simple centered message when connection fails
   - Text: "لا يمكن تحميل الصفحة" (Cannot load page) or "No Internet Connection"
   - Include a retry button below the message
   - Background: White (#FFFFFF)
   - Text color: Dark gray (#424242)

3. **Loaded State:**
   - WebView displays full website content
   - No visible native UI elements
   - Website takes full control of the visual experience

## Design System

### Colors
Since the app is a wrapper, colors should be minimal:
- **Background (during loading):** #FFFFFF (white) or #F5F5F5 (light gray)
- **Loading Indicator:** #2196F3 (Material Blue) or match website's primary color if known
- **Error Text:** #424242 (dark gray)

### Typography
- **Error messages only:** Use system default (Roboto on Android)
- Font size: 16sp for error messages
- All other typography comes from the website

### Visual Design
- **No custom UI elements** - The app should be invisible, letting the website shine
- **Loading indicator:** Use Android's default ActivityIndicator (circular spinner)
- **No shadows, borders, or decorative elements**
- **No splash screen animations** - Keep it lightweight

### Assets Required
1. **App Icon (Launcher Icon):**
   - Provide adaptive icon for Android (foreground + background layers)
   - Sizes needed: mipmap-mdpi (48x48), hdpi (72x72), xhdpi (96x96), xxhdpi (144x144), xxxhdpi (192x192)
   - Design should match website branding
   - Use simple, recognizable shape that works at small sizes

2. **Optional Splash Screen:**
   - If needed, use simple logo on solid background
   - No animations to keep app lightweight
   - Duration: Minimal (only while app initializes)

### Interaction Design
- **Touch feedback:** All touch interactions are handled by the website's own UI
- **Scrolling:** Native WebView scrolling (smooth, uses device's scroll physics)
- **Pull-to-refresh:** Optional - can add pull-to-refresh gesture to reload page
- **Links:** External links should open with native Android transition to browser

### Performance Considerations
- **Minimize native UI rendering** - The less React Native renders, the better
- **WebView caching enabled** - Allow website to use browser cache
- **No animations or transitions** in the native layer
- **Hardware acceleration enabled** for smooth scrolling

### Accessibility
- WebView accessibility is handled by the website's own ARIA/accessibility implementation
- Ensure WebView has accessible focus for screen readers
- Hardware back button should work predictably for all users

## Configuration Requirements
- URL should be easily modifiable in a single config file (config.js)
- App name customizable in app.json and android/app/src/main/res/values/strings.xml
- Clear documentation for changing app icon in mipmap folders