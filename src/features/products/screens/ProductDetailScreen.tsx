import { colors } from "@/src/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

type SizeKey = "Small" | "Medium" | "Large";
type MilkKey = "Whole Milk" | "Oat Milk" | "Almond Milk";

export default function ProductDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();

  // Şimdilik mock ürün (id’ye göre sonra değiştiririz)
  const product = useMemo(
    () => ({
      id: params.id ?? "1",
      title: "Signature Gold Latte",
      rating: 4.9,
      reviews: 128,
      desc: "An exquisite blend of our finest espresso roast, enriched with velvety milk and delicately adorned with edible gold flakes. A truly indulgent experience.",
      price: 6.5,
      image: require("@/assets/images/products/signature-gold-latte.jpg"),
    }),
    [params.id],
  );

  const [size, setSize] = useState<SizeKey>("Medium");
  const [milk, setMilk] = useState<MilkKey>("Whole Milk");
  const [extraShot, setExtraShot] = useState(1);

  const onAddToCart = () => {
    // şimdilik cart tabına gönder (store ekleyince gerçek add yapılır)
    router.push("/(tabs)/cart");
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
        <Text style={styles.headerTitle}>Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Image */}
        <View style={styles.imageWrap}>
          <Image source={product.image} style={styles.image} />
        </View>

        {/* Info */}
        <View style={styles.info}>
          <Text style={styles.title}>{product.title}</Text>

          <View style={styles.ratingRow}>
            <Ionicons name="star" size={18} color={colors.primary} />
            <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
            <Text style={styles.reviewsText}>({product.reviews} reviews)</Text>
          </View>

          <Text style={styles.desc}>{product.desc}</Text>
        </View>

        <View style={styles.divider} />

        {/* Size */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.sizeRow}>
            {(["Small", "Medium", "Large"] as SizeKey[]).map((s) => {
              const active = s === size;
              return (
                <Pressable
                  key={s}
                  onPress={() => setSize(s)}
                  style={[styles.sizePill, active && styles.sizePillActive]}
                >
                  <Text
                    style={[styles.sizeText, active && styles.sizeTextActive]}
                  >
                    {s}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Milk */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Milk Type</Text>

          {(["Whole Milk", "Oat Milk", "Almond Milk"] as MilkKey[]).map((m) => {
            const active = m === milk;
            return (
              <Pressable
                key={m}
                onPress={() => setMilk(m)}
                style={styles.radioRow}
              >
                <Text style={styles.radioText}>{m}</Text>

                <View
                  style={[styles.radioOuter, active && styles.radioOuterActive]}
                >
                  {active ? <View style={styles.radioInner} /> : null}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Extras */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Extras</Text>

          <View style={styles.extraRow}>
            <Text style={styles.extraText}>Extra Espresso Shot</Text>

            <View style={styles.counter}>
              <Pressable
                onPress={() => setExtraShot((v) => Math.max(0, v - 1))}
                style={styles.counterBtn}
                hitSlop={8}
              >
                <Text style={styles.counterBtnText}>−</Text>
              </Pressable>

              <Text style={styles.counterValue}>{extraShot}</Text>

              <Pressable
                onPress={() => setExtraShot((v) => v + 1)}
                style={[styles.counterBtn, styles.counterBtnPlus]}
                hitSlop={8}
              >
                <Text
                  style={[styles.counterBtnText, styles.counterBtnTextPlus]}
                >
                  +
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* Bottom spacer */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom bar */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        </View>

        <Pressable style={styles.addBtn} onPress={onAddToCart}>
          <Text style={styles.addBtnText}>Add to Cart</Text>
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
  headerTitle: { fontSize: 18, fontWeight: "800", color: colors.text },

  scroll: { paddingBottom: 10 },

  imageWrap: { backgroundColor: "#fff" },
  image: { width: "100%", height: 320, resizeMode: "cover" },

  info: {
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 34,
    fontWeight: "900",
    color: colors.text,
    letterSpacing: -1,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },
  ratingText: { fontSize: 16, fontWeight: "900", color: colors.text },
  reviewsText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.muted ?? "#8B8F9A",
  },

  desc: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
    color: colors.muted ?? "#8B8F9A",
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "#E8E2D8",
    marginTop: 18,
  },

  section: { paddingHorizontal: 20, paddingTop: 18 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 12,
  },

  sizeRow: { flexDirection: "row", gap: 12 },
  sizePill: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DCE3EF",
    alignItems: "center",
    justifyContent: "center",
  },
  sizePillActive: {
    borderColor: colors.primary,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  sizeText: { fontSize: 16, fontWeight: "800", color: colors.text },
  sizeTextActive: { color: colors.primary },

  radioRow: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E6EDF7",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  radioText: { fontSize: 16, fontWeight: "800", color: colors.text },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#C8D2E1",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterActive: { borderColor: colors.primary },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },

  extraRow: {
    height: 64,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E6EDF7",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  extraText: { fontSize: 16, fontWeight: "800", color: colors.text },

  counter: { flexDirection: "row", alignItems: "center", gap: 10 },
  counterBtn: {
    width: 34,
    height: 34,
    borderRadius: 999,
    backgroundColor: "#F1F5FB",
    alignItems: "center",
    justifyContent: "center",
  },
  counterBtnPlus: { backgroundColor: colors.primary },
  counterBtnText: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.text,
    marginTop: -1,
  },
  counterBtnTextPlus: { color: "#fff" },
  counterValue: {
    minWidth: 18,
    textAlign: "center",
    fontWeight: "900",
    color: colors.text,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceLabel: { color: colors.muted ?? "#8B8F9A", fontWeight: "700" },
  price: { fontSize: 26, fontWeight: "900", color: colors.text, marginTop: 2 },

  addBtn: {
    height: 56,
    paddingHorizontal: 26,
    borderRadius: 28,
    backgroundColor: "#3B241A", // koyu kahve tonu
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  addBtnText: { color: "#fff", fontSize: 18, fontWeight: "900" },
});
