import { colors } from "@/src/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

type FilterKey = "All" | "Price" | "Type" | "Roast";

export default function SearchScreen() {
  const router = useRouter();

  const [query, setQuery] = useState("Cortado");
  const [active, setActive] = useState<FilterKey>("All");

  const filters: FilterKey[] = ["All", "Price", "Type", "Roast"];

  const onClear = () => setQuery("");

  const suggestions = useMemo(
    () => [
      { id: "s1", text: 'Try searching for "Latte"' },
      { id: "s2", text: 'Try searching for "Espresso"' },
    ],
    [],
  );

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
        <Text style={styles.headerTitle}>Search</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        {/* Search bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={colors.primary} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search..."
            placeholderTextColor="#9AA3AF"
            style={styles.searchInput}
          />
          {!!query && (
            <Pressable onPress={onClear} hitSlop={12} style={styles.clearBtn}>
              <Ionicons name="close" size={18} color="#fff" />
            </Pressable>
          )}
        </View>

        {/* Filter chips */}
        <View style={styles.filtersRow}>
          {filters.map((f) => {
            const isActive = f === active;
            return (
              <Pressable
                key={f}
                onPress={() => setActive(f)}
                style={[styles.chip, isActive && styles.chipActive]}
              >
                <Text
                  style={[styles.chipText, isActive && styles.chipTextActive]}
                >
                  {f}
                </Text>
                {f !== "All" ? (
                  <Ionicons
                    name="chevron-down"
                    size={16}
                    color={isActive ? "#fff" : colors.text}
                    style={{ marginLeft: 8 }}
                  />
                ) : null}
              </Pressable>
            );
          })}
        </View>

        {/* Empty State */}
        <View style={styles.emptyWrap}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="cafe" size={34} color={colors.primary} />
          </View>

          <Text style={styles.emptyTitle}>No results found</Text>
          <Text style={styles.emptyDesc}>
            We couldn’t find any coffee{"\n"}matching &quot;{query || "—"}&quot;
            with the{"\n"}
            current filters.
          </Text>
        </View>

        {/* Suggestions */}
        <Text style={styles.suggestTitle}>SUGGESTIONS</Text>

        <View style={styles.suggestCard}>
          {suggestions.map((s, idx) => (
            <Pressable
              key={s.id}
              style={styles.suggestRow}
              onPress={() => {
                const next = s.text.includes("Latte") ? "Latte" : "Espresso";
                setQuery(next);
              }}
            >
              <Ionicons name="search" size={18} color={colors.primary} />
              <Text style={styles.suggestText}>{s.text}</Text>
              <Ionicons name="chevron-forward" size={20} color="#AAB2BF" />
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const BG = "#F6F2EC";
const SOFT = "#F3E4CC";

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },

  header: {
    height: 52,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: BG,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerTitle: { fontSize: 18, fontWeight: "900", color: colors.text },

  content: { paddingHorizontal: 20, paddingTop: 10 },

  searchBar: {
    height: 56,
    borderRadius: 18,
    backgroundColor: SOFT,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchInput: { flex: 1, fontSize: 18, fontWeight: "800", color: colors.text },

  clearBtn: {
    width: 30,
    height: 30,
    borderRadius: 999,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  filtersRow: { flexDirection: "row", gap: 12, marginTop: 16 },
  chip: {
    height: 46,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DCE3EF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: 16, fontWeight: "900", color: colors.text },
  chipTextActive: { color: "#fff" },

  emptyWrap: { alignItems: "center", marginTop: 70, marginBottom: 30 },
  emptyIconCircle: {
    width: 110,
    height: 110,
    borderRadius: 999,
    backgroundColor: "#F4EADB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },
  emptyTitle: {
    fontSize: 30,
    fontWeight: "900",
    color: colors.text,
    letterSpacing: -0.5,
  },
  emptyDesc: {
    marginTop: 14,
    textAlign: "center",
    color: colors.muted ?? "#8B8F9A",
    fontWeight: "800",
    lineHeight: 22,
    fontSize: 16,
  },

  suggestTitle: {
    color: "#94A3B8",
    fontWeight: "900",
    letterSpacing: 2,
    marginTop: 20,
    marginBottom: 12,
  },
  suggestCard: {
    borderRadius: 18,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#EEF2F7",
    overflow: "hidden",
  },
  suggestRow: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F7",
  },
  suggestText: { flex: 1, fontSize: 16, fontWeight: "900", color: colors.text },
});
