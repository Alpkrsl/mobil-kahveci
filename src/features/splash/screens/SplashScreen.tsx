import { colors } from "@/src/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.backgroundWrapper}>
        <ImageBackground
          source={require("@/assets/images/splash/coffee-beans.jpg")}
          style={styles.leftPanel}
          imageStyle={styles.panelImage}
        >
          <View style={styles.overlay} />
        </ImageBackground>

        <ImageBackground
          source={require("@/assets/images/splash/coffee-cup.jpg")}
          style={styles.rightPanel}
          imageStyle={styles.panelImage}
        >
          <View style={styles.overlay} />
        </ImageBackground>
      </View>

      <View style={styles.centerContent}>
        <View style={styles.logoCircle}>
          <Ionicons name="cafe" size={42} color={colors.primary} />
        </View>

        <Text style={styles.title}>Mobil Kahveci</Text>

        <View style={styles.line} />

        <Text style={styles.subtitle}>PREMIUM LUXURY COFFEE</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingVertical: 28,
    justifyContent: "center",
  },
  backgroundWrapper: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 28,
    gap: 16,
  },
  leftPanel: {
    flex: 1,
    borderRadius: 22,
    overflow: "hidden",
  },
  rightPanel: {
    flex: 1,
    borderRadius: 22,
    overflow: "hidden",
  },
  panelImage: {
    borderRadius: 22,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(246, 242, 236, 0.80)",
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoCircle: {
    width: 148,
    height: 148,
    borderRadius: 74,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#E9C98A",
    marginBottom: 34,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  title: {
    fontSize: 44,
    fontWeight: "800",
    color: colors.text,
    letterSpacing: -1,
    marginBottom: 18,
  },
  line: {
    width: 86,
    height: 6,
    borderRadius: 999,
    backgroundColor: colors.primary,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 15,
    letterSpacing: 4,
    color: colors.primary,
    fontWeight: "500",
  },
});
