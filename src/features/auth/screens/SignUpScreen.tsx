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
    View
} from "react-native";

export default function SignUpScreen() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);

  const onSignUp = () => {
    // şimdilik başarılı say: home'a geç (auth bağlayınca değiştirirsin)
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
          <Text style={styles.headerTitle}>Create Account</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Avatar / Badge */}
        <View style={styles.avatarWrap}>
          <View style={styles.avatarCircle}>
            {/* Eğer resim eklemek istersen assets'e koyup Image ile göster */}
            {/* <Image source={require("@/assets/images/auth/beans.jpg")} style={styles.avatarImg} /> */}
            <Ionicons name="cafe" size={30} color={colors.primary} />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.bigTitle}>Join Mobil Kahveci</Text>
        <Text style={styles.desc}>
          Experience premium coffee ordering tailored to{"\n"}your taste.
        </Text>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputWrap}>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your full name"
              placeholderTextColor="#9AA3AF"
              autoCapitalize="words"
              style={styles.input}
            />
          </View>

          <Text style={[styles.label, { marginTop: 16 }]}>Email</Text>
          <View style={styles.inputWrap}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email address"
              placeholderTextColor="#9AA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

          <Text style={[styles.label, { marginTop: 16 }]}>Phone</Text>
          <View style={styles.inputWrap}>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter your phone number"
              placeholderTextColor="#9AA3AF"
              keyboardType="phone-pad"
              style={styles.input}
            />
          </View>

          <Text style={[styles.label, { marginTop: 16 }]}>Password</Text>
          <View style={styles.inputWrap}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password"
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

          <Pressable style={styles.primaryBtn} onPress={onSignUp}>
            <Text style={styles.primaryBtnText}>Sign Up</Text>
          </Pressable>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <Pressable onPress={() => router.replace("/(auth)/sign-in")}>
              <Text style={styles.footerLink}> Sign In</Text>
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

  avatarWrap: { alignItems: "center", marginTop: 12, marginBottom: 10 },
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 999,
    backgroundColor: "#fff",
    borderWidth: 6,
    borderColor: "#F3E4CC",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  avatarImg: { width: "100%", height: "100%", borderRadius: 999 },

  bigTitle: {
    textAlign: "center",
    fontSize: 36,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -1,
    marginTop: 10,
  },
  desc: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    lineHeight: 22,
    color: colors.muted ?? "#8B8F9A",
    marginBottom: 18,
  },

  form: { marginTop: 8 },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 10,
  },
  inputWrap: {
    borderWidth: 1,
    borderColor: "#EEF2F7",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 58,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },

  primaryBtn: {
    height: 64,
    borderRadius: 18,
    backgroundColor: "#D6860A",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 26,
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

  footerRow: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 14,
  },
  footerText: { color: colors.muted ?? "#8B8F9A", fontWeight: "600" },
  footerLink: { color: colors.primary, fontWeight: "800" },
});
