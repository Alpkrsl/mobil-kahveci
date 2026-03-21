import { colors } from "@/src/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    FlatList,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from "react-native";

type TabKey = "past" | "upcoming";

type OrderStatus = "DELIVERED" | "CANCELLED";

type Order = {
  id: string;
  status: OrderStatus;
  date: string;
  title: string;
  itemsText: string;
  price: number;
};

export default function OrdersScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<TabKey>("past");

  const pastOrders: Order[] = useMemo(
    () => [
      {
        id: "o1",
        status: "DELIVERED",
        date: "Oct 12, 2023",
        title: "Signature Blend Espresso,\nCortado",
        itemsText: "2 items",
        price: 12.5,
      },
      {
        id: "o2",
        status: "DELIVERED",
        date: "Oct 05, 2023",
        title: "Ethiopian Yirgacheffe Pour\nOver",
        itemsText: "1 Item",
        price: 6.0,
      },
      {
        id: "o3",
        status: "CANCELLED",
        date: "Sep 28, 2023",
        title: "Iced Caramel Macchiato",
        itemsText: "3 items",
        price: 18.25,
      },
    ],
    [],
  );

  const upcomingOrders: Order[] = useMemo(
    () => [
      {
        id: "u1",
        status: "DELIVERED",
        date: "Today",
        title: "Signature Gold Latte",
        itemsText: "1 item",
        price: 6.5,
      },
    ],
    [],
  );

  const data = tab === "past" ? pastOrders : upcomingOrders;

  const onReorder = (orderId: string) => {
    // şimdilik cart’a gönderiyoruz (store ekleyince gerçek reorder yapılır)
    router.push("/(tabs)/cart");
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          style={styles.headerBtn}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </Pressable>

        <Text style={styles.headerTitle}>Order History</Text>

        <View style={{ width: 40 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        <Pressable style={styles.tabBtn} onPress={() => setTab("past")}>
          <Text
            style={[styles.tabText, tab === "past" && styles.tabTextActive]}
          >
            Past Orders
          </Text>
          {tab === "past" ? <View style={styles.tabUnderline} /> : null}
        </Pressable>

        <Pressable style={styles.tabBtn} onPress={() => setTab("upcoming")}>
          <Text
            style={[styles.tabText, tab === "upcoming" && styles.tabTextActive]}
          >
            Upcoming
          </Text>
          {tab === "upcoming" ? <View style={styles.tabUnderline} /> : null}
        </Pressable>
      </View>

      <FlatList
        data={data}
        keyExtractor={(it) => it.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* top row */}
            <View style={styles.cardTopRow}>
              <View
                style={[
                  styles.statusPill,
                  item.status === "DELIVERED"
                    ? styles.statusDelivered
                    : styles.statusCancelled,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    item.status === "DELIVERED"
                      ? styles.statusTextDelivered
                      : styles.statusTextCancelled,
                  ]}
                >
                  {item.status}
                </Text>
              </View>

              <Text style={styles.dateText}>{item.date}</Text>
            </View>

            {/* mid row */}
            <View style={styles.cardMidRow}>
              <View
                style={[
                  styles.iconBox,
                  item.status === "CANCELLED" && styles.iconBoxCancelled,
                ]}
              >
                <Ionicons
                  name="cafe"
                  size={26}
                  color={
                    item.status === "CANCELLED" ? "#9AA3AF" : colors.primary
                  }
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.orderTitle}>{item.title}</Text>
                <Text style={styles.itemsText}>{item.itemsText}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* bottom row */}
            <View style={styles.cardBottomRow}>
              <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>

              <Pressable
                onPress={() => onReorder(item.id)}
                style={[
                  styles.reorderBtn,
                  item.status === "CANCELLED" && styles.reorderBtnOutline,
                ]}
              >
                <Text
                  style={[
                    styles.reorderText,
                    item.status === "CANCELLED" && styles.reorderTextOutline,
                  ]}
                >
                  Reorder
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const BG = "#251B12"; // koyu kahve arka plan
const CARD = "#2C2116";

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },

  header: {
    height: 56,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: BG,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "900" },

  tabsRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 22,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  tabBtn: { paddingTop: 8, paddingBottom: 6 },
  tabText: { color: "rgba(255,255,255,0.55)", fontWeight: "900", fontSize: 18 },
  tabTextActive: { color: colors.primary },
  tabUnderline: {
    marginTop: 10,
    height: 4,
    borderRadius: 99,
    backgroundColor: colors.primary,
    width: 140,
  },

  list: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 20 },

  card: {
    backgroundColor: CARD,
    borderRadius: 22,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },
  statusDelivered: { backgroundColor: "rgba(232,149,10,0.16)" },
  statusCancelled: { backgroundColor: "rgba(148,163,184,0.18)" },
  statusText: { fontWeight: "900", fontSize: 12, letterSpacing: 1 },
  statusTextDelivered: { color: colors.primary },
  statusTextCancelled: { color: "#CBD5E1" },

  dateText: { color: "rgba(255,255,255,0.55)", fontWeight: "800" },

  cardMidRow: {
    flexDirection: "row",
    gap: 14,
    marginTop: 14,
    alignItems: "center",
  },
  iconBox: {
    width: 66,
    height: 66,
    borderRadius: 16,
    backgroundColor: "rgba(232,149,10,0.10)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(232,149,10,0.18)",
  },
  iconBoxCancelled: {
    backgroundColor: "rgba(148,163,184,0.10)",
    borderColor: "rgba(148,163,184,0.18)",
  },

  orderTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
    lineHeight: 28,
  },
  itemsText: {
    marginTop: 8,
    color: "rgba(255,255,255,0.6)",
    fontWeight: "800",
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginTop: 16,
    marginBottom: 14,
  },

  cardBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceText: { color: "#fff", fontSize: 26, fontWeight: "900" },

  reorderBtn: {
    height: 46,
    paddingHorizontal: 22,
    borderRadius: 23,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  reorderText: { color: "#fff", fontWeight: "900", fontSize: 16 },

  reorderBtnOutline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: colors.primary,
  },
  reorderTextOutline: { color: colors.primary },
});
