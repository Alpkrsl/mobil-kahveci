import { colors } from "@/src/theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

type CategoryKey = "Hot" | "Cold" | "Signature";

type Product = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  image: any; // require(...)
};

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("Hot");

  const categories: CategoryKey[] = ["Hot", "Cold", "Signature"];

  // Görselleri sen assets içine koyacaksın (aşağıda yol verdim)
  const hero = useMemo(
    () => ({
      badge: "SEASONAL EXCLUSIVE",
      title: "Caramel Macchiato",
      subtitle: "Rich espresso meets sweet caramel.",
      image: require("@/assets/images/home/hero-caramel.jpg"),
    }),
    [],
  );

  const popularNow: Product[] = useMemo(
    () => [
      {
        id: "1",
        title: "Dark Mocha",
        subtitle: "Nutty, Chocolatey",
        price: 5.5,
        image: require("@/assets/images/products/dark-mocha.jpg"),
      },
      {
        id: "2",
        title: "Vanilla Latte",
        subtitle: "Smooth, Sweet",
        price: 4.75,
        image: require("@/assets/images/products/vanilla-latte.jpg"),
      },
      {
        id: "3",
        title: "Iced Coffee",
        subtitle: "Bold, Refreshing",
        price: 4.2,
        image: require("@/assets/images/products/iced-coffee.jpg"),
      },
    ],
    [],
  );

  const onPressProduct = (id: string) => {
    router.push(`/product/${id}`);
  };

  const onPressAdd = (id: string) => {
    // şimdilik UI aksiyonu (cart store ekleyince bağlarız)
    router.push("/(tabs)/cart");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.userRow}>
            <View style={styles.avatarCircle}>
              <Image
                source={require("@/assets/images/avatar/user.jpg")}
                style={styles.avatar}
              />
            </View>
            <View>
              <Text style={styles.greeting}>Good morning, Alex</Text>
            </View>
          </View>

          <Pressable
            hitSlop={12}
            onPress={() => router.push("/notifications")}
            style={styles.bellBtn}
          >
            <Ionicons
              name="notifications-outline"
              size={22}
              color={colors.text}
            />
          </Pressable>
        </View>

        {/* Search */}
        <View style={styles.searchWrap}>
          <Ionicons name="search" size={18} color="#9AA3AF" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search premium coffee..."
            placeholderTextColor="#9AA3AF"
            style={styles.searchInput}
          />
        </View>

        {/* Category Chips */}
        <View style={styles.chipsRow}>
          {categories.map((c) => {
            const active = c === activeCategory;
            return (
              <Pressable
                key={c}
                onPress={() => setActiveCategory(c)}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Text
                  style={[styles.chipText, active && styles.chipTextActive]}
                >
                  {c}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Hero Banner */}
        <Pressable
          style={styles.heroCard}
          onPress={() => onPressProduct("hero")}
        >
          <Image source={hero.image} style={styles.heroImage} />

          <View style={styles.heroOverlay} />

          <View style={styles.heroContent}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>{hero.badge}</Text>
            </View>

            <Text style={styles.heroTitle}>{hero.title}</Text>
            <Text style={styles.heroSubtitle}>{hero.subtitle}</Text>
          </View>
        </Pressable>

        {/* Section title */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Popular Now</Text>
          <Pressable onPress={() => router.push("/(tabs)/menu")}>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </View>

        {/* Horizontal cards */}
        <FlatList
          data={popularNow}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
          style={{ marginBottom: 24 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => onPressProduct(item.id)}
              style={styles.productCard}
            >
              <Image source={item.image} style={styles.productImage} />

              <View style={styles.productBody}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productSubtitle}>{item.subtitle}</Text>

                <View style={styles.productBottomRow}>
                  <Text style={styles.productPrice}>
                    ${item.price.toFixed(2)}
                  </Text>

                  <Pressable
                    onPress={() => onPressAdd(item.id)}
                    hitSlop={10}
                    style={styles.addBtn}
                  >
                    <Ionicons name="add" size={18} color="#fff" />
                  </Pressable>
                </View>
              </View>
            </Pressable>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const CARD_W = Math.min(200, width * 0.52);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 28 },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  userRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 999,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  avatar: { width: "100%", height: "100%" },
  greeting: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
  },
  bellBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },

  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DCE3EF",
    borderRadius: 18,
    paddingHorizontal: 14,
    height: 54,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  searchInput: { flex: 1, fontSize: 16, color: colors.text },

  chipsRow: {
    flexDirection: "row",
    gap: 14,
    marginTop: 18,
    marginBottom: 18,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#DCE3EF",
    backgroundColor: "#fff",
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  chipText: { fontSize: 16, fontWeight: "700", color: colors.text },
  chipTextActive: { color: "#fff" },

  heroCard: {
    borderRadius: 26,
    overflow: "hidden",
    height: 200,
    marginBottom: 22,
    backgroundColor: "#111",
  },
  heroImage: { width: "100%", height: "100%" },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.38)",
  },
  heroContent: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 18,
  },
  heroBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    marginBottom: 12,
  },
  heroBadgeText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 12,
    letterSpacing: 0.3,
  },
  heroTitle: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: -1,
  },
  heroSubtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 16,
    marginTop: 6,
    fontWeight: "600",
  },

  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
    marginTop: 2,
  },
  sectionTitle: { fontSize: 26, fontWeight: "900", color: colors.text },
  seeAll: { fontSize: 16, fontWeight: "800", color: colors.primary },

  productCard: {
    width: CARD_W,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#EEF2F7",
    marginRight: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  productImage: { width: "100%", height: 120 },
  productBody: { padding: 14 },
  productTitle: { fontSize: 18, fontWeight: "900", color: colors.text },
  productSubtitle: {
    marginTop: 6,
    color: colors.muted ?? "#8B8F9A",
    fontWeight: "700",
  },

  productBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  productPrice: { fontSize: 18, fontWeight: "900", color: colors.text },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
