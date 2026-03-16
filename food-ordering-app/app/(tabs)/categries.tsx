import { View, Text, ScrollView, Image, Pressable, Platform, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { categories } from "../types/Food";

export default function CategoriesScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
        </Pressable>
        <Text style={styles.headerTitle}>All Categories</Text>
        <View style={{ width: 40 }} /> 
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>What are you looking for?</Text>
        
        <View style={styles.grid}>
          {categories.map((cat) => (
            <Pressable
              key={cat.name} 
              onPress={() => router.push({ pathname: "/", params: { filter: cat.name } })}
              style={styles.categoryCard}
            >
              <View style={styles.cardContent}>
                <View style={styles.iconCircle}>
                  <Ionicons name="fast-food" size={30} color="#ff7a00" />
                </View>
                <Text style={styles.categoryText}>{cat.name}</Text>
                <Text style={styles.itemCount}>Explore items</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbfbfe",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: "48%", 
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardContent: {
    alignItems: "center",
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff4eb",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  itemCount: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
});