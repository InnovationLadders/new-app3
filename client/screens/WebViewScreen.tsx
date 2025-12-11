import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  BackHandler,
  Linking,
  Platform,
  Pressable,
  Text,
  RefreshControl,
  ScrollView,
} from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { WEBSITE_URL, WEBVIEW_CONFIG, APP_COLORS } from "@/constants/config";

type ErrorType = "network" | "http" | "timeout" | "unknown";

const getErrorMessage = (errorType: ErrorType): { title: string; subtitle: string } => {
  switch (errorType) {
    case "network":
      return {
        title: "لا يوجد اتصال بالإنترنت",
        subtitle: "تحقق من اتصالك بالشبكة وحاول مرة أخرى",
      };
    case "http":
      return {
        title: "خطأ في الخادم",
        subtitle: "الموقع غير متاح حالياً، يرجى المحاولة لاحقاً",
      };
    case "timeout":
      return {
        title: "انتهت مهلة الاتصال",
        subtitle: "الاتصال بطيء جداً، حاول مرة أخرى",
      };
    default:
      return {
        title: "لا يمكن تحميل الصفحة",
        subtitle: "تحقق من اتصالك بالإنترنت وحاول مرة أخرى",
      };
  }
};

export default function WebViewScreen() {
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorType, setErrorType] = useState<ErrorType>("unknown");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleNavigationStateChange = useCallback((navState: WebViewNavigation) => {
    setCanGoBack(navState.canGoBack);
  }, []);

  const handleShouldStartLoadWithRequest = useCallback((request: { url: string }) => {
    const { url } = request;
    
    if (url.startsWith("tel:") || url.startsWith("mailto:") || url.startsWith("sms:")) {
      Linking.openURL(url).catch(() => {});
      return false;
    }

    try {
      const requestUrl = new URL(url);
      const baseUrl = new URL(WEBSITE_URL);
      
      if (requestUrl.hostname !== baseUrl.hostname) {
        Linking.openURL(url).catch(() => {});
        return false;
      }
    } catch {
    }

    return true;
  }, []);

  useEffect(() => {
    const onBackPress = () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => subscription.remove();
  }, [canGoBack]);

  const handleLoadStart = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
  }, []);

  const handleLoadEnd = useCallback(() => {
    setIsLoading(false);
    setIsRefreshing(false);
  }, []);

  const handleError = useCallback((syntheticEvent: { nativeEvent: { description?: string; code?: number } }) => {
    setIsLoading(false);
    setIsRefreshing(false);
    setHasError(true);
    
    const { nativeEvent } = syntheticEvent;
    const description = nativeEvent?.description?.toLowerCase() || "";
    
    if (description.includes("net::") || description.includes("network") || description.includes("internet")) {
      setErrorType("network");
    } else if (description.includes("timeout")) {
      setErrorType("timeout");
    } else {
      setErrorType("unknown");
    }
  }, []);

  const handleHttpError = useCallback(() => {
    setIsLoading(false);
    setIsRefreshing(false);
    setHasError(true);
    setErrorType("http");
  }, []);

  const handleRetry = useCallback(() => {
    setHasError(false);
    setIsLoading(true);
    webViewRef.current?.reload();
  }, []);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    webViewRef.current?.reload();
  }, []);

  const handleClearCache = useCallback(() => {
    webViewRef.current?.clearCache?.(true);
    webViewRef.current?.reload();
  }, []);

  const errorMessage = getErrorMessage(errorType);

  if (hasError) {
    return (
      <ScrollView
        contentContainerStyle={styles.errorContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRetry}
            colors={[APP_COLORS.loadingIndicator]}
            tintColor={APP_COLORS.loadingIndicator}
          />
        }
      >
        <StatusBar style="dark" />
        <View style={styles.errorIconContainer}>
          <Feather 
            name={errorType === "network" ? "wifi-off" : errorType === "http" ? "server" : "alert-circle"} 
            size={64} 
            color={APP_COLORS.errorText} 
          />
        </View>
        <Text style={styles.errorText}>
          {errorMessage.title}
        </Text>
        <Text style={styles.errorSubtext}>
          {errorMessage.subtitle}
        </Text>
        <Pressable
          style={({ pressed }) => [
            styles.retryButton,
            pressed && styles.retryButtonPressed,
          ]}
          onPress={handleRetry}
        >
          <Feather name="refresh-cw" size={18} color="#FFFFFF" style={styles.buttonIcon} />
          <Text style={styles.retryButtonText}>إعادة المحاولة</Text>
        </Pressable>
        <Text style={styles.pullToRefreshHint}>
          أو اسحب لأسفل للتحديث
        </Text>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" translucent backgroundColor="transparent" />
      <WebView
        ref={webViewRef}
        source={{ uri: WEBSITE_URL }}
        style={styles.webview}
        onNavigationStateChange={handleNavigationStateChange}
        onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        onHttpError={handleHttpError}
        javaScriptEnabled={WEBVIEW_CONFIG.javaScriptEnabled}
        domStorageEnabled={WEBVIEW_CONFIG.domStorageEnabled}
        startInLoadingState={false}
        scalesPageToFit={WEBVIEW_CONFIG.scalesPageToFit}
        allowsInlineMediaPlayback={WEBVIEW_CONFIG.allowsInlineMediaPlayback}
        mediaPlaybackRequiresUserAction={WEBVIEW_CONFIG.mediaPlaybackRequiresUserAction}
        allowsFullscreenVideo={WEBVIEW_CONFIG.allowsFullscreenVideo}
        cacheEnabled={WEBVIEW_CONFIG.cacheEnabled}
        cacheMode={WEBVIEW_CONFIG.cacheMode}
        allowsBackForwardNavigationGestures={Platform.OS === "ios"}
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
        setSupportMultipleWindows={false}
        pullToRefreshEnabled={Platform.OS === "android"}
        incognito={false}
        mixedContentMode="compatibility"
        originWhitelist={["*"]}
        textZoom={100}
      />
      {isLoading && !isRefreshing ? (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator
            size="large"
            color={APP_COLORS.loadingIndicator}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLORS.loadingBackground,
  },
  webview: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: APP_COLORS.loadingBackground,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    backgroundColor: APP_COLORS.loadingBackground,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    minHeight: "100%",
  },
  errorIconContainer: {
    marginBottom: 24,
    opacity: 0.7,
  },
  errorText: {
    fontSize: 20,
    fontWeight: "700",
    color: APP_COLORS.errorText,
    textAlign: "center",
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    color: "#757575",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: APP_COLORS.retryButton,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  retryButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  buttonIcon: {
    marginRight: 8,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  pullToRefreshHint: {
    marginTop: 16,
    fontSize: 12,
    color: "#9E9E9E",
    textAlign: "center",
  },
});
