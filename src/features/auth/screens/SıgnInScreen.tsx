import { colors } from "@/src/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Pressable,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);

  const onSignIn = () => {
    // şimdilik direkt home tabına gönder (auth bağlayınca değiştiririz)
    router.replace("/(tabs)/home");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={12}
            style={styles.backBtn}
          >
            <Ionicons name="chevron-back" size={24} color={colors.text} />
          </Pressable>
          <Text style={styles.headerTitle}>Sign In</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Logo badge */}
        <View style={styles.logoWrap}>
          <View style={styles.logoCircle}>
            <Ionicons name="cafe" size={34} color={colors.primary} />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.bigTitle}>Welcome to the Ritual</Text>
        <Text style={styles.desc}>
          Sign in to continue your premium coffee experience.
        </Text>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrap}>
            <Ionicons name="mail-outline" size={20} color="#9AA3AF" />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#9AA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

          <Text style={[styles.label, { marginTop: 18 }]}>Password</Text>
          <View style={styles.inputWrap}>
            <Ionicons name="lock-closed-outline" size={20} color="#9AA3AF" />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor="#9AA3AF"
              secureTextEntry={secure}
              autoCapitalize="none"
              style={styles.input}
            />
            <Pressable onPress={() => setSecure((s) => !s)} hitSlop={10}>
              <Ionicons
                name={secure ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#9AA3AF"
              />
            </Pressable>
          </View>

          <Pressable
            onPress={() => router.push("/(auth)/forgot-password")}
            style={styles.forgot}
          >
            <Text style={styles.forgotText}>Forgot password?</Text>
          </Pressable>

          <Pressable style={styles.primaryBtn} onPress={onSignIn}>
            <Text style={styles.primaryBtnText}>Sign In</Text>
          </Pressable>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social */}
          <Pressable style={styles.socialBtn} onPress={() => {}}>
            <Ionicons name="logo-google" size={20} color={colors.text} />
            <Text style={styles.socialText}>Continue with Google</Text>
          </Pressable>

          <Pressable style={styles.socialBtn} onPress={() => {}}>
            <Ionicons name="logo-apple" size={22} color={colors.text} />
            <Text style={styles.socialText}>Continue with Apple</Text>
          </Pressable>

          {/* Footer */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Don’t have an account?</Text>
            <Pressable onPress={() => router.push("/(auth)/sign-up")}>
              <Text style={styles.footerLink}> Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },

  logoWrap: { alignItems: "center", marginTop: 8, marginBottom: 10 },
  logoCircle: {
    width: 92,
    height: 92,
    borderRadius: 999,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },

  bigTitle: {
    fontSize: 40,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -1,
    marginTop: 8,
  },
  desc: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 22,
    color: colors.muted ?? "#8B8F9A",
  },

  form: { marginTop: 26 },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 10,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#DCE3EF",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 58,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },

  forgot: {
    alignSelf: "flex-end",
    marginTop: 14,
    marginBottom: 18,
  },
  forgotText: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 14,
  },

  primaryBtn: {
    height: 64,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 22,
    marginBottom: 16,
    gap: 12,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#DCE3EF" },
  dividerText: { color: colors.muted ?? "#8B8F9A", fontWeight: "600" },

  socialBtn: {
    height: 64,
    borderRadius: 18,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DCE3EF",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
  },
  socialText: { fontSize: 16, fontWeight: "700", color: colors.text },

  footerRow: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 14,
  },
  footerText: { color: colors.muted ?? "#8B8F9A", fontWeight: "600" },
  footerLink: { color: colors.primary, fontWeight: "800" },
});
