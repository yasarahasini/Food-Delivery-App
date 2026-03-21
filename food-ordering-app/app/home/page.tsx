import { View, Text, ScrollView, TextInput, Image, Pressable, Platform, StyleSheet, Dimensions } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { categories, foods } from "../types/Food";

const { width } = Dimensions.get("window");

const FoodCard = ({ item, onPress }: any) => (
  <Pressable onPress={onPress} style={styles.foodCard}>
    <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
    <View style={styles.cardContent}>
      <View>
        <Text numberOfLines={1} style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardSubtitle}>⭐ 4.8 • 20-30 min</Text>
      </View>
      <View style={styles.priceTag}>
        <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>
      </View>
    </View>
  </Pressable>
);

export default function HomeScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("home");

  const filteredFoods = foods.filter((food) => {
    const matchCategory = selectedCategory === "All" || food.category === selectedCategory;
    const matchSearch = food.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <View style={styles.container}>
     
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Good Morning,</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={16} color="#fff" />
              <Text style={styles.locationText}>Colombo, Sri Lanka</Text>
              <Ionicons name="chevron-down" size={14} color="#fff" />
            </View>
          </View>
          <Pressable onPress={() => router.push("/profile")}>
            <Image 
              source={require("../../assets/images/yasara.png")} 
              style={styles.profileImg} 
            />
          </Pressable>
        </View>

      
        <View style={styles.searchWrapper}>
          <Ionicons name="search-outline" size={20} color="#999" />
          <TextInput
            placeholder="Search cravings..."
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
          <View style={styles.filterCircle}>
            <Ionicons name="options-outline" size={20} color="#ff7a00" />
          </View>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
       
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((cat) => (
            <Pressable
              key={cat.id}
              onPress={() => setSelectedCategory(cat.name)}
              style={[
                styles.catChip,
                selectedCategory === cat.name && styles.catChipActive
              ]}
            >
              <Text style={[
                styles.catText,
                selectedCategory === cat.name && styles.catTextActive
              ]}>
                {cat.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

    
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Now</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>

        <View style={styles.foodGrid}>
          {filteredFoods.map((item) => (
            <FoodCard
              key={item.id}
              item={item}
              onPress={() => router.push({ pathname: "/details/[id]/", params: { id: item.id } })}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.floatingTabs}>
        <Pressable onPress={() => setActiveTab("home")} style={styles.tabItem}>
          <Ionicons name={activeTab === "home" ? "home" : "home-outline"} size={22} color={activeTab === "home" ? "#ff7a00" : "#999"} />
          {activeTab === "home" && <View style={styles.activeDot} />}
        </Pressable>
        
        <Pressable onPress={() => router.push("/cart/page")} style={styles.cartCenterBtn}>
            <View style={styles.cartInner}>
                <Ionicons name="cart" size={26} color="#fff" />
            </View>
        </Pressable>

        <Pressable onPress={() => { setActiveTab("profile"); router.push("/profile"); }} style={styles.tabItem}>
          <Ionicons name={activeTab === "profile" ? "person" : "person-outline"} size={22} color={activeTab === "profile" ? "#ff7a00" : "#999"} />
          {activeTab === "profile" && <View style={styles.activeDot} />}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fbfbfe" },
  header: {
    backgroundColor: "#ff7a00",
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 25 },
  greeting: { color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: "600" },
  locationRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 2 },
  locationText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  profileImg: { width: 48, height: 48, borderRadius: 16, borderWidth: 2, borderColor: "rgba(255,255,255,0.3)" },
  
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 55,
    position: 'absolute',
    bottom: -27,
    left: 20,
    right: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 15, fontWeight: "500" },
  filterCircle: { backgroundColor: "#fff5ed", padding: 8, borderRadius: 12 },

  categoryContainer: { paddingHorizontal: 20, marginTop: 45, marginBottom: 20 },
  catChip: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 15, backgroundColor: "#fff", marginRight: 10, borderWidth: 1, borderColor: "#f0f0f0" },
  catChipActive: { backgroundColor: "#1a1a1a", borderColor: "#1a1a1a" },
  catText: { color: "#888", fontWeight: "700", fontSize: 13 },
  catTextActive: { color: "#fff" },

  sectionHeader: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, marginBottom: 15, alignItems: 'center' },
  sectionTitle: { fontSize: 20, fontWeight: "800", color: "#1a1a1a" },
  seeAll: { color: "#ff7a00", fontWeight: "700" },

  foodGrid: { paddingHorizontal: 20 },
  foodCard: { 
    backgroundColor: "#fff", 
    borderRadius: 24, 
    marginBottom: 20, 
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5
  },
  cardImage: { width: "100%", height: 180 },
  cardContent: { padding: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 17, fontWeight: "800", color: "#1a1a1a", marginBottom: 4 },
  cardSubtitle: { fontSize: 12, color: "#999", fontWeight: "600" },
  priceTag: { backgroundColor: "#1a1a1a", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  priceText: { color: "#fff", fontWeight: "800", fontSize: 14 },

  floatingTabs: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    height: 70,
    backgroundColor: "#fff",
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 15,
  },
  tabItem: { alignItems: "center" },
  activeDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: "#ff7a00", marginTop: 4 },
  cartCenterBtn: { 
    marginTop: -40, 
    backgroundColor: "#ff7a00", 
    width: 65, 
    height: 65, 
    borderRadius: 32.5, 
    justifyContent: "center", 
    alignItems: "center",
    borderWidth: 6,
    borderColor: "#fbfbfe"
  },
  cartInner: { alignItems: 'center', justifyContent: 'center' }
});