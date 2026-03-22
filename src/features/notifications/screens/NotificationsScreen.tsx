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
    View,
} from "react-native";

type SectionKey = "Yeni" | "Bu Hafta";

type NotificationItem = {
  id: string;
  section: SectionKey;
  title: string;
  body: string;
  timeLabel: string; // "Şimdi", "1 saat önce", "Salı" ...
  unread: boolean;
  kind: "photo" | "star" | "cup" | "check";
  avatar?: any; // require(...)
};

export default function NotificationsScreen() {
  const router = useRouter();
  const [items, setItems] = useState<NotificationItem[]>(() => [
    {
      id: "n1",
      section: "Yeni",
      title: "Siparişiniz yola çıktı!",
      body: "Latte ve kruvasanınız kuryemize teslim edildi. Afiyet olsun!",
      timeLabel: "Şimdi",
      unread: true,
      kind: "photo",
      avatar: require("@/assets/images/notifications/coffee-avatar.jpg"),
    },
    {
      id: "n2",
      section: "Yeni",
      title: "Tebrikler, 50 puan!",
      body: "Kahve tutkunu seviyesine ulaştınız. Puanlarınızı hemen kullanın.",
      timeLabel: "1 saat önce",
      unread: true,
      kind: "star",
    },
    {
      id: "n3",
      section: "Bu Hafta",
      title: "Haftanın Kahvesi %20 İndirimli",
      body: "Etiyopya çekirdekleriyle hazırlanan filtre kahveyi denediniz mi?",
      timeLabel: "Salı",
      unread: false,
      kind: "cup",
    },
    {
      id: "n4",
      section: "Bu Hafta",
      title: "Siparişiniz teslim edildi",
      body: "Bizi tercih ettiğiniz için teşekkür ederiz. Deneyiminizi puanlayın.",
      timeLabel: "Pzt",
      unread: false,
      kind: "check",
    },
  ]);

  const grouped = useMemo(() => {
    const g: Record<SectionKey, NotificationItem[]> = {
      Yeni: [],
      "Bu Hafta": [],
    };
    for (const it of items) g[it.section].push(it);
    return g;
  }, [items]);

  const markAllRead = () => {
    setItems((prev) => prev.map((x) => ({ ...x, unread: false })));
  };

  const iconFor = (kind: NotificationItem["kind"]) => {
    switch (kind) {
      case "star":
        return { name: "star", bg: colors.primarySoft, color: colors.primary };
      case "cup":
        return { name: "cafe", bg: "#EEF2F7", color: "#64748B" };
      case "check":
        return { name: "checkmark", bg: "#D1FADF", color: "#16A34A" };
      default:
        return { name: "cafe", bg: "#111", color: "#fff" };
    }
  };

  const Row = ({ item }: { item: NotificationItem }) => {
    const icon = iconFor(item.kind);

    return (
      <Pressable style={styles.row}>
        {/* left avatar/icon */}
        {item.kind === "photo" && item.avatar ? (
          <View style={styles.avatarCircle}>
            <Image source={item.avatar} style={styles.avatarImg} />
          </View>
        ) : (
          <View style={[styles.iconCircle, { backgroundColor: icon.bg }]}>
            <Ionicons name={icon.name as any} size={18} color={icon.color} />
          </View>
        )}

        {/* middle text */}
        <View style={styles.rowMid}>
          <Text style={styles.rowTitle}>{item.title}</Text>
          <Text style={styles.rowBody}>{item.body}</Text>
        </View>

        {/* right time + unread */}
        <View style={styles.rowRight}>
          <Text style={[styles.time, item.unread && styles.timeActive]}>
            {item.timeLabel}
          </Text>
          <View
            style={[styles.dot, item.unread ? styles.dotOn : styles.dotOff]}
          />
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bildirimler</Text>

        <Pressable onPress={markAllRead} hitSlop={10}>
          <Text style={styles.headerAction}>Tümünü okundu işaretle</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Section: Yeni */}
        <Text style={styles.sectionTitle}>Yeni</Text>
        <View style={styles.card}>
          {grouped["Yeni"].map((n, idx) => (
            <View key={n.id}>
              <Row item={n} />
              {idx !== grouped["Yeni"].length - 1 ? (
                <View style={styles.sep} />
              ) : null}
            </View>
          ))}
        </View>

        {/* Section: Bu Hafta */}
        <Text style={[styles.sectionTitle, { marginTop: 22 }]}>Bu Hafta</Text>
        <View style={styles.card}>
          {grouped["Bu Hafta"].map((n, idx) => (
            <View key={n.id}>
              <Row item={n} />
              {idx !== grouped["Bu Hafta"].length - 1 ? (
                <View style={styles.sep} />
              ) : null}
            </View>
          ))}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Back button (optional) */}
      <Pressable
        onPress={() => router.back()}
        style={styles.fabBack}
        hitSlop={10}
      >
        <Ionicons name="chevron-back" size={22} color={colors.text} />
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },

  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 14,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#EFE7DC",
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "900",
    color: colors.text,
    letterSpacing: -0.6,
  },
  headerAction: { fontSize: 14, fontWeight: "900", color: colors.primary },

  content: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 20 },

  sectionTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#EEF2F7",
    overflow: "hidden",
  },

  row: {
    flexDirection: "row",
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: "center",
  },

  avatarCircle: {
    width: 50,
    height: 50,
    borderRadius: 999,
    overflow: "hidden",
    backgroundColor: "#111",
  },
  avatarImg: { width: "100%", height: "100%" },

  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },

  rowMid: { flex: 1 },
  rowTitle: { fontSize: 18, fontWeight: "900", color: colors.text },
  rowBody: {
    marginTop: 6,
    color: colors.muted ?? "#8B8F9A",
    fontWeight: "700",
    lineHeight: 20,
  },

  rowRight: { alignItems: "flex-end", gap: 8, minWidth: 70 },
  time: { color: colors.muted ?? "#8B8F9A", fontWeight: "900" },
  timeActive: { color: colors.primary },

  dot: { width: 10, height: 10, borderRadius: 999 },
  dotOn: { backgroundColor: colors.primary },
  dotOff: { backgroundColor: "transparent" },

  sep: { height: 1, backgroundColor: "#EEF2F7", marginLeft: 16 },

  fabBack: {
    position: "absolute",
    left: 14,
    top: 14,
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderWidth: 1,
    borderColor: "#EEF2F7",
    alignItems: "center",
    justifyContent: "center",
  },
});
