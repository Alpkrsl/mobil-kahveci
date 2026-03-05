import { colors } from "@/src/theme/colors";
import { useRouter } from "expo-router";
import React from "react";
import {
    ImageBackground,
    Pressable,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function OnboardingScreen() {
  const router = useRouter();

  const onNext = () => {
    // Şimdilik sign-in'e gönderiyoruz
    router.replace("/(auth)/sign-in");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={styles.container}>
        {/* Top image */}
        <View style={styles.heroCard}>
          <ImageBackground
            source={require("@/assets/images/onboarding/onboarding-1.jpg")}
            style={styles.heroImage}
            imageStyle={styles.heroImageRadius}
          >
            {/* alttaki beyaz fade efekti */}
            <View style={styles.heroFade} />
          </ImageBackground>
        </View>

        {/* Bottom content */}
        <View style={styles.content}>
          <Text style={styles.title}>
            Discover expertly{"\n"}crafted coffees
          </Text>

          <Text style={styles.subtitle}>
            Explore a curated selection of premium{"\n"}
            blends from around the world.
          </Text>

          {/* Dots */}
          <View style={styles.dotsRow}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          {/* Button */}
          <Pressable style={styles.button} onPress={onNext}>
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
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
    paddingTop: 16,
    paddingBottom: 28,
  },

  heroCard: {
    flex: 1.15,
    borderRadius: 26,
    overflow: "hidden",
    backgroundColor: colors.surface,
  },
  heroImage: { flex: 1 },
  heroImageRadius: {
    borderRadius: 26,
    resizeMode: "cover",
  },
  heroFade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 140,
    backgroundColor: "rgba(246, 242, 236, 0.72)",
  },

  content: {
    flex: 0.9,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: 24,
  },

  title: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -1,
    marginBottom: 16,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 22,
  },

  dotsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 28,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: "#E7D8C2",
  },
  dotActive: {
    width: 38,
    backgroundColor: colors.primary,
  },

  button: {
    width: "100%",
    borderRadius: 18,
    backgroundColor: colors.primary,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
