import { View, Text, Image, ScrollView, Pressable, StyleSheet, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { foods } from "../../types/Food"; // Ensure this path matches your project

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Find the food item that matches the ID in the URL
  const item = foods.find((f) => f.id.toString() === id);

  if (!item) {
    return (
      <View style={styles.center}>
        <Text>Food item not found!</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* HEADER IMAGE */}
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.mainImage} resizeMode="cover" />
        
        {/* BACK BUTTON */}
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </Pressable>
      </View>

      {/* CONTENT CARD */}
      <ScrollView 
        style={styles.contentScroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.infoContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.titleText}>{item.name}</Text>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}> 4.8</Text>
            </View>
          </View>

          <Text style={styles.categoryText}>{item.category} • Fresh Ingredients</Text>
          
          <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>
            Enjoy our world-class {item.name}, prepared with the freshest 
            ingredients and delivered hot to your doorstep. Perfect for 
            any time of the day.
          </Text>

          {/* ADD TO CART BUTTON */}
          <Pressable style={styles.addToCartBtn}>
            <Text style={styles.cartBtnText}>Add to Order</Text>
            <Ionicons name="cart-outline" size={20} color="#fff" style={{marginLeft: 10}} />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  imageContainer: { height: 350, width: "100%" },
  mainImage: { width: "100%", height: "100%" },
  backButton: {
    position: "absolute",
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  contentScroll: {
    marginTop: -30,
    backgroundColor: "#fff",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 25,
  },
  infoContainer: { paddingBottom: 50 },
  titleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  titleText: { fontSize: 26, fontWeight: "bold", color: "#1a1a1a", flex: 1 },
  ratingBadge: { flexDirection: "row", alignItems: "center", backgroundColor: "#fef9e7", padding: 6, borderRadius: 10 },
  ratingText: { fontWeight: "bold", color: "#f1c40f" },
  categoryText: { color: "#888", marginTop: 5, fontSize: 14 },
  priceText: { fontSize: 22, fontWeight: "bold", color: "#ff7a00", marginTop: 15 },
  divider: { height: 1, backgroundColor: "#eee", marginVertical: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#1a1a1a", marginBottom: 10 },
  descriptionText: { color: "#666", lineHeight: 22, fontSize: 15 },
  addToCartBtn: {
    backgroundColor: "#ff7a00",
    marginTop: 30,
    padding: 18,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cartBtnText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});