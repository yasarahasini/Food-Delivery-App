import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const categories = [
  { id: 1, title: "Shipping", icon: "bus", color: ["#FF9A8B", "#FF6A88"] },
  { id: 2, title: "Payments", icon: "card", color: ["#4facfe", "#00f2fe"] },
  { id: 3, title: "Returns", icon: "refresh", color: ["#43e97b", "#38f9d7"] },
  { id: 4, title: "Account", icon: "person", color: ["#fa709a", "#fee140"] },
];

export default function ColorfulHelpCenter() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
  
      <LinearGradient
        colors={["#ff7a00", "#ff1e00"]}
        style={styles.headerGradient}
      >
        <View style={styles.headerTop}>
          <Pressable onPress={() => router.back()} style={styles.iconBtn}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>
          <Text style={styles.headerTitle}>Support Hub</Text>
          <Pressable style={styles.iconBtn}>
            <Ionicons name="chatbubbles" size={24} color="#fff" />
          </Pressable>
        </View>

        <Text style={styles.headerSubtitle}>How can we help you today?</Text>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#FF7A00" />
          <TextInput
            placeholder="Search topics, orders..."
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </LinearGradient>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.sectionTitle}>Browse Categories</Text>
        
      
        <View style={styles.grid}>
          {categories.map((cat) => (
            <Pressable key={cat.id} style={styles.cardWrapper}>
              <LinearGradient
                colors={cat.color}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.categoryCard}
              >
                <Ionicons name={cat.icon as any} size={30} color="#fff" />
                <Text style={styles.cardText}>{cat.title}</Text>
              </LinearGradient>
            </Pressable>
          ))}
        </View>

   
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Popular Questions</Text>
          
          {[
            "Where is my package?",
            "I received a damaged item",
            "How to use my points?",
            "Change my phone number"
          ].map((item, index) => (
            <Pressable key={index} style={styles.faqRow}>
              <View style={styles.faqBullet} />
              <Text style={styles.faqText}>{item}</Text>
              <Ionicons name="chevron-forward" size={16} color="#DDD" />
            </Pressable>
          ))}
        </View>

     
        <LinearGradient
          colors={["#673AB7", "#512DA8"]}
          style={styles.contactBanner}
        >
          <View>
            <Text style={styles.bannerTitle}>Still stuck?</Text>
            <Text style={styles.bannerSub}>Our team is online 24/7</Text>
          </View>
          <Pressable style={styles.chatBtn}>
            <Text style={styles.chatBtnText}>Chat Now</Text>
          </Pressable>
        </LinearGradient>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerGradient: {
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  headerSubtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 16,
    marginTop: 15,
    marginBottom: 20,
    textAlign: 'center',
  },
  iconBtn: {
    padding: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  scrollContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  cardWrapper: {
    width: "47%",
    marginBottom: 15,
  },
  categoryCard: {
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 110,
  },
  cardText: {
    color: "#fff",
    fontWeight: "bold",
    marginTop: 8,
    fontSize: 14,
  },
  faqSection: {
    marginBottom: 30,
  },
  faqRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  faqBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FF7A00",
    marginRight: 15,
  },
  faqText: {
    flex: 1,
    fontSize: 15,
    color: "#555",
  },
  contactBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 30,
  },
  bannerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  bannerSub: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
  },
  chatBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
  },
  chatBtnText: {
    color: "#673AB7",
    fontWeight: "bold",
    fontSize: 14,
  },
});