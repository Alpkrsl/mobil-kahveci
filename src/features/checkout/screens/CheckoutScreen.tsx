import { colors } from "@/src/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

type Mode = "Delivery" | "Pickup";

export default function CheckoutScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("Delivery");

  const summary = useMemo(
    () => ({
      subtotal: 24.0,
      deliveryFee: mode === "Delivery" ? 3.5 : 0,
      taxes: 2.15,
    }),
    [mode],
  );

  const total = useMemo(
    () => summary.subtotal + summary.deliveryFee + summary.taxes,
    [summary],
  );

  const onPlaceOrder = () => {
    router.push("/checkout/success");
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
        <Text style={styles.headerTitle}>Secure Checkout</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Toggle */}
        <View style={styles.toggleWrap}>
          <Pressable
            onPress={() => setMode("Delivery")}
            style={[
              styles.toggleBtn,
              mode === "Delivery" && styles.toggleActive,
            ]}
          >
            <Text
              style={[
                styles.toggleText,
                mode === "Delivery" && styles.toggleTextActive,
              ]}
            >
              Delivery
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setMode("Pickup")}
            style={[styles.toggleBtn, mode === "Pickup" && styles.toggleActive]}
          >
            <Text
              style={[
                styles.toggleText,
                mode === "Pickup" && styles.toggleTextActive,
              ]}
            >
              Pickup
            </Text>
          </Pressable>
        </View>

        {/* Delivery Address */}
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <View style={styles.addressCard}>
          <View style={styles.addressIcon}>
            <Ionicons name="location" size={18} color={colors.primary} />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.addressTitle}>Home</Text>
            <Text style={styles.addressSub}>
              123 Luxury Avenue, Beverly Hills,{"\n"}CA
            </Text>
          </View>

          <Pressable hitSlop={12} onPress={() => router.push("/settings")}>
            <Ionicons name="pencil" size={18} color={colors.primary} />
          </Pressable>
        </View>

        {/* Payment Method */}
        <Text style={styles.sectionTitle}>Payment Method</Text>

        <View style={styles.card}>
          <View style={styles.cardTopRow}>
            <Text style={styles.cardBrandLeft}>
              Mobil<Text style={styles.cardBrandAccent}>Kahveci</Text>
            </Text>

            <View style={styles.cardPayIcon}>
              <Ionicons name="wifi" size={18} color="rgba(255,255,255,0.9)" />
            </View>
          </View>

          <View style={styles.cardMidRow}>
            <Text style={styles.cardDots}>•••• •••• ••••</Text>
            <Text style={styles.cardLast}>4242</Text>
          </View>

          <View style={styles.cardBottomRow}>
            <Text style={styles.cardName}>John Doe</Text>
            <Text style={styles.cardExp}>12/25</Text>
          </View>
        </View>

        <Pressable style={styles.addCardBtn} onPress={() => {}}>
          <Ionicons name="add" size={22} color={colors.text} />
          <Text style={styles.addCardText}>Add New Card</Text>
        </Pressable>

        {/* Order Summary */}
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.summaryCard}>
          <View style={styles.row}>
            <Text style={styles.sumLabel}>Subtotal</Text>
            <Text style={styles.sumValue}>${summary.subtotal.toFixed(2)}</Text>
          </View>

          <View style={[styles.row, { marginTop: 10 }]}>
            <Text style={styles.sumLabel}>Delivery Fee</Text>
            <Text style={styles.sumValue}>
              ${summary.deliveryFee.toFixed(2)}
            </Text>
          </View>

          <View style={[styles.row, { marginTop: 10 }]}>
            <Text style={styles.sumLabel}>Taxes</Text>
            <Text style={styles.sumValue}>${summary.taxes.toFixed(2)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={[styles.row, { marginTop: 6 }]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <Pressable style={styles.placeBtn} onPress={onPlaceOrder}>
          <Ionicons name="lock-closed" size={18} color="#fff" />
          <Text style={styles.placeText}>
            Place Order • ${total.toFixed(2)}
          </Text>
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

  toggleWrap: {
    height: 58,
    borderRadius: 18,
    backgroundColor: "#EEF2F7",
    padding: 6,
    flexDirection: "row",
    gap: 8,
    marginBottom: 18,
  },
  toggleBtn: {
    flex: 1,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleActive: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DCE3EF",
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.muted ?? "#8B8F9A",
  },
  toggleTextActive: { color: colors.primary },

  sectionTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: colors.text,
    marginTop: 10,
    marginBottom: 12,
  },

  addressCard: {
    height: 92,
    backgroundColor: "#fff",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#EEF2F7",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 18,
  },
  addressIcon: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  addressTitle: { fontSize: 18, fontWeight: "900", color: colors.text },
  addressSub: {
    marginTop: 4,
    color: colors.muted ?? "#8B8F9A",
    fontWeight: "700",
  },

  card: {
    height: 150,
    borderRadius: 22,
    padding: 18,
    backgroundColor: "#0B1526",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 7,
    marginBottom: 12,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardBrandLeft: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 22,
    letterSpacing: 0.2,
  },
  cardBrandAccent: { color: colors.primary },
  cardPayIcon: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
  },
  cardMidRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginTop: 30,
  },
  cardDots: {
    color: "rgba(255,255,255,0.85)",
    fontWeight: "900",
    fontSize: 18,
    letterSpacing: 1,
  },
  cardLast: {
    color: "rgba(255,255,255,0.95)",
    fontWeight: "900",
    fontSize: 20,
    letterSpacing: 2,
  },
  cardBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
  },
  cardName: { color: "rgba(255,255,255,0.8)", fontWeight: "800" },
  cardExp: { color: "rgba(255,255,255,0.8)", fontWeight: "800" },

  addCardBtn: {
    height: 62,
    borderRadius: 18,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#CBD5E1",
    backgroundColor: "rgba(255,255,255,0.65)",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
  },
  addCardText: { fontSize: 18, fontWeight: "900", color: colors.text },

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
  totalValue: { color: colors.text, fontWeight: "900", fontSize: 24 },

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
  placeBtn: {
    height: 64,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  placeText: { color: "#fff", fontSize: 18, fontWeight: "900" },
});
