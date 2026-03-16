import { colors } from "@/src/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

type Step = {
  title: string;
  time: string;
  state: "done" | "active" | "upcoming";
  icon: keyof typeof Ionicons.glyphMap;
};

export default function OrderTrackingScreen() {
  const router = useRouter();

  const steps: Step[] = [
    {
      title: "Order Confirmed",
      time: "09:45 AM",
      state: "done",
      icon: "checkmark",
    },
    { title: "Brewing", time: "10:00 AM", state: "active", icon: "cafe" },
    { title: "On the Way", time: "", state: "upcoming", icon: "car" },
    { title: "Delivered", time: "", state: "upcoming", icon: "home" },
  ];

  const onCall = () => {
    // burada ileride gerçek arama/whatsapp vb bağlanır
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          style={styles.backBtn}
        >
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Order Tracking</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.bigTitle}>Preparing your coffee</Text>
        <Text style={styles.eta}>
          Estimated arrival: <Text style={styles.etaStrong}>10:15 AM</Text>
        </Text>

        {/* Map */}
        <View style={styles.mapCard}>
          <Image
            source={require("@/assets/images/checkout/map-placeholder.jpg")}
            style={styles.mapImage}
          />
          <View style={styles.mapPin}>
            <Ionicons name="car" size={22} color={colors.primary} />
          </View>
        </View>

        {/* Timeline */}
        <View style={styles.timelineWrap}>
          {steps.map((s, idx) => {
            const isLast = idx === steps.length - 1;

            const dotBg =
              s.state === "done"
                ? colors.primary
                : s.state === "active"
                  ? colors.primarySoft
                  : "#EEF2F7";

            const dotBorder =
              s.state === "active"
                ? colors.primary
                : s.state === "upcoming"
                  ? "#DCE3EF"
                  : colors.primary;

            const iconColor =
              s.state === "done"
                ? "#fff"
                : s.state === "active"
                  ? colors.primary
                  : "#9AA3AF";

            const titleColor = s.state === "upcoming" ? "#9AA3AF" : colors.text;
            const titleWeight = s.state === "active" ? "900" : "800";
            const timeColor =
              s.state === "upcoming" ? "#C0C6D0" : (colors.muted ?? "#8B8F9A");

            return (
              <View key={s.title} style={styles.stepRow}>
                {/* Left rail */}
                <View style={styles.rail}>
                  <View
                    style={[
                      styles.dot,
                      { backgroundColor: dotBg, borderColor: dotBorder },
                    ]}
                  >
                    <Ionicons
                      name={s.icon as any}
                      size={16}
                      color={iconColor}
                    />
                  </View>

                  {!isLast ? (
                    <View
                      style={[
                        styles.line,
                        {
                          backgroundColor:
                            s.state === "done" ? colors.primary : "#DCE3EF",
                        },
                      ]}
                    />
                  ) : (
                    <View style={styles.lineSpacer} />
                  )}
                </View>

                {/* Right content */}
                <View style={styles.stepContent}>
                  <Text
                    style={[
                      styles.stepTitle,
                      { color: titleColor, fontWeight: titleWeight as any },
                    ]}
                  >
                    {s.title}
                  </Text>
                  {!!s.time ? (
                    <Text style={[styles.stepTime, { color: timeColor }]}>
                      {s.time}
                    </Text>
                  ) : null}
                </View>
              </View>
            );
          })}
        </View>

        {/* Courier card */}
        <View style={styles.courierCard}>
          <View style={styles.courierLeft}>
            <View style={styles.avatarCircle}>
              <Image
                source={require("@/assets/images/avatar/courier.jpg")}
                style={styles.avatar}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.courierName}>Ahmet Yılmaz</Text>
              <View style={styles.courierMetaRow}>
                <Ionicons name="star" size={16} color={colors.primary} />
                <Text style={styles.courierMetaText}>4.9</Text>
                <Text style={styles.courierMetaMuted}>(124 trips)</Text>
              </View>
            </View>
          </View>

          <Pressable onPress={onCall} hitSlop={12} style={styles.callBtn}>
            <Ionicons name="call" size={18} color={colors.primary} />
          </Pressable>
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <Pressable style={styles.ctaBtn} onPress={onCall}>
          <Text style={styles.ctaText}>Contact Courier</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },

  header: {
    height: 52,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.background,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerTitle: { fontSize: 18, fontWeight: "900", color: colors.text },

  content: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 18 },

  bigTitle: {
    fontSize: 42,
    fontWeight: "900",
    color: colors.text,
    letterSpacing: -1,
  },
  eta: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "900",
    color: colors.primary,
  },
  etaStrong: { color: colors.primary, fontWeight: "900" },

  mapCard: {
    marginTop: 18,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#EEF2F7",
  },
  mapImage: { width: "100%", height: 190, resizeMode: "cover" },
  mapPin: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: [{ translateX: -26 }, { translateY: -26 }],
    width: 52,
    height: 52,
    borderRadius: 999,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },

  timelineWrap: { marginTop: 18 },

  stepRow: { flexDirection: "row", gap: 14, paddingVertical: 10 },
  rail: { width: 42, alignItems: "center" },
  dot: {
    width: 34,
    height: 34,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  line: { width: 3, flex: 1, borderRadius: 99, marginTop: 10 },
  lineSpacer: { flex: 1, marginTop: 10 },

  stepContent: { flex: 1, paddingTop: 2 },
  stepTitle: { fontSize: 22, letterSpacing: -0.2 },
  stepTime: { marginTop: 6, fontSize: 14, fontWeight: "800" },

  courierCard: {
    marginTop: 18,
    backgroundColor: "#fff",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#EEF2F7",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  courierLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  avatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 999,
    overflow: "hidden",
    backgroundColor: "#F2F2F2",
  },
  avatar: { width: "100%", height: "100%" },

  courierName: { fontSize: 20, fontWeight: "900", color: colors.text },
  courierMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },
  courierMetaText: { fontWeight: "900", color: colors.text },
  courierMetaMuted: { color: colors.muted ?? "#8B8F9A", fontWeight: "800" },

  callBtn: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 18,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: "#E8E2D8",
  },
  ctaBtn: {
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
  ctaText: { color: "#fff", fontSize: 18, fontWeight: "900" },
});
