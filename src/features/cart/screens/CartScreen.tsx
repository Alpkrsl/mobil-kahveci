import { colors } from "@/src/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

type CartItem = {
  id: string;
  title: string;
  price: number;
  meta: string;
  qty: number;
  image: any; // require(...)
};

export default function CartScreen() {
  const router = useRouter();

  const [promo, setPromo] = useState("");
  const [items, setItems] = useState<CartItem[]>(() => [
    {
      id: "1",
      title: "Caramel\nMacchiato",
      price: 6.5,
      meta: "Oat Milk, Extra Shot",
      qty: 1,
      image: require("@/assets/images/products/caramel-macchiato.jpg"),
    },
    {
      id: "2",
      title: "Espresso\nTruffle",
      price: 4.0,
      meta: "Default",
      qty: 2,
      image: require("@/assets/images/products/espresso-truffle.jpg"),
    },
    {
      id: "3",
      title: "Almond\nCroissant",
      price: 5.5,
      meta: "Warm",
      qty: 1,
      image: require("@/assets/images/products/almond-croissant.jpg"),
    },
  ]);

  const deliveryFee = 2.5;

  const subtotal = useMemo(() => {
    return items.reduce((sum, it) => sum + it.price * it.qty, 0);
  }, [items]);

  const total = useMemo(() => subtotal + deliveryFee, [subtotal]);

  const changeQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, qty: Math.max(0, it.qty + delta) } : it,
      ),
    );
  };

  const onCheckout = () => {
    router.push("/checkout");
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
        <Text style={styles.headerTitle}>Cart</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Items */}
        {items.map((it) => (
          <View key={it.id} style={styles.itemCard}>
            <Image source={it.image} style={styles.itemImage} />

            <View style={styles.itemMid}>
              <Text style={styles.itemTitle}>{it.title}</Text>
              <Text style={styles.itemPrice}>${it.price.toFixed(2)}</Text>
              <Text style={styles.itemMeta}>{it.meta}</Text>
            </View>

            <View style={styles.qtyWrap}>
              <Pressable
                onPress={() => changeQty(it.id, -1)}
                hitSlop={10}
                style={styles.qtyBtn}
              >
                <Text style={styles.qtyBtnText}>−</Text>
              </Pressable>

              <Text style={styles.qtyValue}>{it.qty}</Text>

              <Pressable
                onPress={() => changeQty(it.id, +1)}
                hitSlop={10}
                style={[styles.qtyBtn, styles.qtyBtnPlus]}
              >
                <Text style={[styles.qtyBtnText, styles.qtyBtnTextPlus]}>
                  +
                </Text>
              </Pressable>
            </View>
          </View>
        ))}

        {/* Promo */}
        <View style={styles.promoCard}>
          <TextInput
            value={promo}
            onChangeText={setPromo}
            placeholder="Promo Code"
            placeholderTextColor="#9AA3AF"
            style={styles.promoInput}
          />
          <Pressable onPress={() => {}} hitSlop={10}>
            <Text style={styles.promoApply}>APPLY</Text>
          </Pressable>
        </View>

        {/* Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.row}>
            <Text style={styles.sumLabel}>Subtotal</Text>
            <Text style={styles.sumValue}>${subtotal.toFixed(2)}</Text>
          </View>

          <View style={[styles.row, { marginTop: 10 }]}>
            <Text style={styles.sumLabel}>Delivery</Text>
            <Text style={styles.sumValue}>${deliveryFee.toFixed(2)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={[styles.row, { marginTop: 6 }]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <Pressable style={styles.ctaBtn} onPress={onCheckout}>
          <Text style={styles.ctaText}>Proceed to Checkout</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
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

  scroll: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 18 },

  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#fff",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#EEF2F7",
    padding: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  itemImage: {
    width: 64,
    height: 64,
    borderRadius: 14,
    resizeMode: "cover",
    backgroundColor: "#F2F2F2",
  },
  itemMid: { flex: 1 },
  itemTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.text,
    lineHeight: 24,
  },
  itemPrice: {
    color: colors.primary,
    fontWeight: "900",
    fontSize: 16,
    marginTop: 6,
  },
  itemMeta: {
    marginTop: 8,
    color: colors.muted ?? "#8B8F9A",
    fontWeight: "700",
  },

  qtyWrap: { alignItems: "center", gap: 10 },
  qtyBtn: {
    width: 38,
    height: 38,
    borderRadius: 999,
    backgroundColor: "#F1F5FB",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtnPlus: { backgroundColor: colors.primary },
  qtyBtnText: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.text,
    marginTop: -1,
  },
  qtyBtnTextPlus: { color: "#fff" },
  qtyValue: { fontSize: 16, fontWeight: "900", color: colors.text },

  promoCard: {
    height: 64,
    backgroundColor: "#fff",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#EEF2F7",
    paddingHorizontal: 16,
    marginTop: 6,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  promoInput: { flex: 1, fontSize: 16, color: colors.text },
  promoApply: { color: colors.primary, fontWeight: "900", letterSpacing: 1 },

  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#EEF2F7",
    padding: 18,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sumLabel: {
    color: colors.muted ?? "#8B8F9A",
    fontWeight: "800",
    fontSize: 16,
  },
  sumValue: { color: colors.text, fontWeight: "900", fontSize: 16 },

  divider: {
    height: 1,
    backgroundColor: "#E8E2D8",
    marginTop: 14,
    marginBottom: 10,
  },

  totalLabel: { color: colors.text, fontWeight: "900", fontSize: 24 },
  totalValue: { color: colors.primary, fontWeight: "900", fontSize: 24 },

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
    flexDirection: "row",
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  ctaText: { color: "#fff", fontSize: 18, fontWeight: "900" },
});
