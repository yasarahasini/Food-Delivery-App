import React from "react";
import {
  View,
  Text,
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
const COLUMN_WIDTH = (width - 50) / 2;

const allCategories = [
  { id: 1, name: 'Healthy', icon: 'leaf', color: ['#4CAF50', '#2E7D32'], count: '12 Places' },
  { id: 2, name: 'Fast Food', icon: 'fast-food', color: ['#FF9800', '#F57C00'], count: '28 Places' },
  { id: 3, name: 'Beverages', icon: 'wine', color: ['#2196F3', '#1976D2'], count: '15 Places' },
  { id: 4, name: 'Desserts', icon: 'ice-cream', color: ['#E91E63', '#C2185B'], count: '10 Places' },
  { id: 5, name: 'Asian', icon: 'restaurant', color: ['#9C27B0', '#7B1FA2'], count: '22 Places' },
  { id: 6, name: 'Bakery', icon: 'pizza', color: ['#795548', '#5D4037'], count: '18 Places' },
  { id: 7, name: 'Sea Food', icon: 'fish', color: ['#00BCD4', '#0097A7'], count: '8 Places' },
  { id: 8, name: 'Burgers', icon: 'flame', color: ['#FF5252', '#D32F2F'], count: '31 Places' },
];

export default function CategoriesScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </Pressable>
        <Text style={styles.headerTitle}>All Categories</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.subTitle}>What are you craving today?</Text>
        
        <View style={styles.grid}>
          {allCategories.map((item) => (
            <Pressable 
              key={item.id} 
              style={styles.cardContainer}
              onPress={() => router.push(`/explore?category=${item.name.toLowerCase()}`)}
            >
              <LinearGradient
                colors={item.color}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.categoryCard}
              >
                <View style={styles.iconCircle}>
                  <Ionicons name={item.icon as any} size={28} color={item.color[0]} />
                </View>
                
                <View style={styles.textContainer}>
                  <Text style={styles.categoryName}>{item.name}</Text>
                  <Text style={styles.categoryCount}>{item.count}</Text>
                </View>

                <View style={styles.arrowContainer}>
                   <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.6)" />
                </View>
              </LinearGradient>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  backButton: {
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
  },
  scrollContent: {
    padding: 20,
  },
  subTitle: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: COLUMN_WIDTH,
    marginBottom: 15,
    borderRadius: 20,
    // Shadow for iOS/Android
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  categoryCard: {
    padding: 15,
    borderRadius: 20,
    height: 160,
    justifyContent: 'space-between',
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 10,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  categoryCount: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  arrowContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
  }
});