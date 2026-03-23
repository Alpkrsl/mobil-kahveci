import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors } from "@/src/theme/colors";

type Reward = {
  id: string;
  title: string;
  desc: string;
  points: number;
  icon: keyof typeof Ionicons.glyphMap;
  locked?: boolean;
};

type Activity = {
  id: string;
  title: string;
  time: string;
  delta: number; // + / -
};

export default function RewardsScreen() {
  const router = useRouter();

  const points = 450;
  const nextTarget = 600;
  const progress = Math.min(1, points / nextTarget);

  const rewards: Reward[] = useMemo(
    () => [
      {
        id: "r1",
        title: "Free Premium Pa...",
        desc: "Any croissant or\nmuffin",
        points: 200,
        icon: "nutrition",
      },
      {
        id: "r2",
        title: "Size Upgrade",
        desc: "Complimentary size\nup",
        points: 100,
        icon: "cafe",
      },
      {
        id: "r3",
        title: "Free Coffee Be...",
        desc: "250g signature\nblend",
        points: 800,
        icon: "leaf",
        locked: true,
      },
    ],
    []
  );

  const activity: Activity[] = useMemo(
    () => [
      {
        id: "a1",
        title: "Iced Caramel Macchiato",
        time: "Today, 09:41 AM",
        delta: +45,
      },
      {
        id: "a2",
        title: "Claimed: Free Cookie",
        time: "Yesterday",
        delta: -150,
      },
    ],
    []
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mobil Kahveci</Text>

        <Pressable onPress={() => router.push("/search")} hitSlop={12} style={styles.searchBtn}>
          <Ionicons name="search" size={22} color="#fff" />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Gold card */}
        <View style={styles.goldCard}>
          <Text style={styles.cardTopSmall}>MOBIL KAHVECI</Text>

          <View style={styles.cardTopRow}>
            <Text style={styles.cardTitle}>Gold Reserve</Text>
            <View style={styles.badge}>
              <Ionicons name="ribbon" size={18} color="#3B241A" />
            </View>
          </View>

          <Text style={styles.pointsBig}>{points}</Text>
          <Text style={styles.pointsLabel}>Available Points</Text>

          <View style={styles.cardBottomRow}>
            <Text style={styles.cardBottomText}>ID : 4829 1042</Text>
            <Text style={styles.cardBottomText}>Valid Thru 12/25</Text>
          </View>
        </View>

        {/* Progress */}
        <View style={styles.progressWrap}>
          <View style={styles.progressRow}>
            <Text style={styles.progressTitle}>Next: Free Artisanal Drink</Text>
            <Text style={styles.progressValue}>
              <Text style={{ color: colors.primary, fontWeight: "900" }}>{points}</Text> / {nextTarget}
            </Text>
          </View>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>

          <Text style={styles.progressHint}>
            Earn {Math.max(0, nextTarget - points)} more points for a free handcrafted beverage.
          </Text>
        </View>

        {/* Available Rewards */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Available Rewards</Text>
          <Pressable onPress={() => {}} hitSlop={10}>
            <Text style={styles.viewAll}>View All</Text>
          </Pressable>
        </View>

        <View style={styles.rewardsList}>
          {rewards.map((r) => (
            <View key={r.id} style={[styles.rewardCard, r.locked && styles.rewardCardLocked]}>
              <View style={[styles.rewardIconBox, r.locked && styles.rewardIconBoxLocked]}>
                <Ionicons
                  name={r.icon as any}
                  size={24}
                  color={r.locked ? "#64748B" : colors.primary}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={[styles.rewardTitle, r.locked && styles.muted]}>
                  {r.title}
                </Text>
                <Text style={[styles.rewardDesc, r.locked && styles.muted]}>
                  {r.desc}
                </Text>
                <Text style={[styles.rewardPoints, r.locked && styles.muted]}>
                  {r.points} Points
                </Text>
              </View>

              {r.locked ? (
                <View style={styles.lockedPill}>
                  <Ionicons name="lock-closed" size={14} color="#94A3B8" />
                  <Text style={styles.lockedText}>Locked</Text>
                </View>
              ) : (
                <Pressable style={styles.claimBtn} onPress={() => {}}>
                  <Text style={styles.claimText}>Claim</Text>
                </Pressable>
              )}
            </View>
          ))}
        </View>

        {/* Recent Activity */}
        <Text style={[styles.sectionTitle, { marginTop: 26 }]}>Recent Activity</Text>

        <View style={styles.activityList}>
          {activity.map((a) => (
            <View key={a.id} style={styles.activityRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.activityTitle}>{a.title}</Text>
                <Text style={styles.activityTime}>{a.time}</Text>
              </View>

              <Text style={[styles.delta, a.delta >= 0 ? styles.deltaPlus : styles.deltaMinus]}>
                {a.delta >= 0 ? `+${a.delta}` : `${a.delta}`} pts
              </Text>
            </View>
          ))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const BG = "#22180F";
const CARD = "#2B2016";

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },

  header: {
    height: 56,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: BG,
  },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "900" },
  searchBtn: { width: 42, height: 42, borderRadius: 999, alignItems: "center", justifyContent: "center" },

  content: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 20 },

  goldCard: {
    borderRadius: 22,
    padding: 18,
    backgroundColor: "#D8B35C",
    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  cardTopSmall: { color: "#3B241A", fontWeight: "900", letterSpacing: 2, opacity: 0.9 },
  cardTopRow: { marginTop: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  cardTitle: { color: "#3B241A", fontWeight: "900", fontSize: 26 },
  badge: {
    width: 34,
    height: 34,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  pointsBig: { marginTop: 14, fontSize: 58, fontWeight: "900", color: "#3B241A" },
  pointsLabel: { marginTop: 2, fontWeight: "900", color: "#3B241A", opacity: 0.85 },
  cardBottomRow: { marginTop: 12, flexDirection: "row", justifyContent: "space-between" },
  cardBottomText: { fontWeight: "900", color: "#3B241A", opacity: 0.85 },

  progressWrap: { marginTop: 16 },
  progressRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  progressTitle: { color: "rgba(255,255,255,0.85)", fontWeight: "900" },
  progressValue: { color: "rgba(255,255,255,0.7)", fontWeight: "900" },

  progressTrack: {
    marginTop: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.12)",
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: colors.primary, borderRadius: 999 },

  progressHint: {
    marginTop: 10,
    color: "rgba(255,255,255,0.55)",
    fontWeight: "800",
  },

  sectionHeader: {
    marginTop: 26,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: { color: "#fff", fontSize: 22, fontWeight: "900" },
  viewAll: { color: colors.primary, fontWeight: "900" },

  rewardsList: { marginTop: 14, gap: 14 },
  rewardCard: {
    backgroundColor: CARD,
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  rewardCardLocked: { opacity: 0.65 },
  rewardIconBox: {
    width: 54,
    height: 54,
    borderRadius: 14,
    backgroundColor: "rgba(232,149,10,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  rewardIconBoxLocked: { backgroundColor: "rgba(148,163,184,0.16)" },

  rewardTitle: { color: "#fff", fontWeight: "900", fontSize: 18 },
  rewardDesc: { marginTop: 6, color: "rgba(255,255,255,0.65)", fontWeight: "800", lineHeight: 18 },
  rewardPoints: { marginTop: 8, color: colors.primary, fontWeight: "900" },
  muted: { color: "rgba(255,255,255,0.5)" },

  claimBtn: {
    height: 40,
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  claimText: { color: "#fff", fontWeight: "900" },

  lockedPill: {
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  lockedText: { color: "#94A3B8", fontWeight: "900" },

  activityList: { marginTop: 12 },
  activityRow: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  activityTitle: { color: "#fff", fontWeight: "900", fontSize: 16 },
  activityTime: { marginTop: 6, color: "rgba(255,255,255,0.55)", fontWeight: "800" },

  delta: { fontWeight: "900", fontSize: 16 },
  deltaPlus: { color: "#22C55E" },
  deltaMinus: { color: "#EF4444" },
});