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

type Offer = {
  id: string;
  badge: string;
  title: string;
  desc: string;
  cta: string;
  ctaStyle: "primary" | "light" | "outline";
  image: any; // require(...)
};

export default function OffersScreen() {
  const router = useRouter();

  const offers: Offer[] = [
    {
      id: "seasonal",
      badge: "LIMITED EDITION",
      title: "Seasonal\nSpecials",
      desc: "Discover our limited time winter\nblends crafted for warmth.",
      cta: "Shop ...",
      ctaStyle: "primary",
      image: require("@/assets/images/offers/seasonal.jpg"),
    },
    {
      id: "first-order",
      badge: "WELCOME",
      title: "First Order\nRewards",
      desc: "Get 20% off your first premium\ncoffee order with us.",
      cta: "Claim",
      ctaStyle: "light",
      image: require("@/assets/images/offers/first-order.jpg"),
    },
    {
      id: "club",
      badge: "PREMIUM",
      title: "Join The Club",
      desc: "Exclusive access to rare beans\nand masterclasses.",
      cta: "Learn...",
      ctaStyle: "outline",
      image: require("@/assets/images/offers/club.jpg"),
    },
  ];

  const onOpenOffer = (id: string) => {
    // şimdilik menu’ya yönlendir (sonra offer detail sayfası açarız)
    router.push("/(tabs)/menu");
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
        <Text style={styles.headerTitle}>Exclusive Offers</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {offers.map((o) => (
          <Pressable
            key={o.id}
            style={styles.card}
            onPress={() => onOpenOffer(o.id)}
          >
            <Image source={o.image} style={styles.cardImg} />
            <View style={styles.overlay} />

            <View style={styles.cardInner}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{o.badge}</Text>
              </View>

              <Text style={styles.title}>{o.title}</Text>
              <Text style={styles.desc}>{o.desc}</Text>

              <View style={{ flex: 1 }} />

              <Pressable
                onPress={() => onOpenOffer(o.id)}
                style={[
                  styles.cta,
                  o.ctaStyle === "primary" && styles.ctaPrimary,
                  o.ctaStyle === "light" && styles.ctaLight,
                  o.ctaStyle === "outline" && styles.ctaOutline,
                ]}
              >
                <Text
                  style={[
                    styles.ctaText,
                    o.ctaStyle === "primary" && styles.ctaTextPrimary,
                    o.ctaStyle === "light" && styles.ctaTextLight,
                    o.ctaStyle === "outline" && styles.ctaTextOutline,
                  ]}
                >
                  {o.cta}
                </Text>
              </Pressable>
            </View>
          </Pressable>
        ))}

        <View style={{ height: 20 }} />
      </ScrollView>
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

  content: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },

  card: {
    height: 210,
    borderRadius: 26,
    overflow: "hidden",
    backgroundColor: "#111",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#EEF2F7",
  },
  cardImg: { width: "100%", height: "100%", resizeMode: "cover" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  cardInner: {
    ...StyleSheet.absoluteFillObject,
    padding: 18,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    marginBottom: 12,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 12,
    letterSpacing: 0.4,
  },

  title: { color: "#fff", fontSize: 34, fontWeight: "900", letterSpacing: -1 },
  desc: {
    marginTop: 10,
    color: "rgba(255,255,255,0.88)",
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 20,
  },

  cta: {
    alignSelf: "flex-end",
    minWidth: 110,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  ctaPrimary: { backgroundColor: colors.primary },
  ctaLight: { backgroundColor: "#fff" },
  ctaOutline: {
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: "transparent",
  },

  ctaText: { fontSize: 15, fontWeight: "900" },
  ctaTextPrimary: { color: "#fff" },
  ctaTextLight: { color: colors.text },
  ctaTextOutline: { color: colors.primary },
});
