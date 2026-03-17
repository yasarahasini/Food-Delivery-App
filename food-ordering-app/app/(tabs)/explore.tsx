import { View, Text, ScrollView, TextInput, Image, Pressable, Platform, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; 
import { foods } from "../types/Food";

const { width } = Dimensions.get("window");


const categories = [
  { id: 1, name: 'Healthy', icon: 'leaf', color: '#E8F5E9', iconColor: '#4CAF50' },
  { id: 2, name: 'Fast Food', icon: 'fast-food', color: '#FFF3E0', iconColor: '#FF9800' },
  { id: 3, name: 'Beverages', icon: 'wine', color: '#E3F2FD', iconColor: '#2196F3' },
  { id: 4, name: 'Desserts', icon: 'ice-cream', color: '#FCE4EC', iconColor: '#E91E63' },
  { id: 5, name: 'Asian', icon: 'restaurant', color: '#F3E5F5', iconColor: '#9C27B0' },
  { id: 6, name: 'Bakery', icon: 'pizza', color: '#EFEBE9', iconColor: '#795548' },
];

export default function ExploreScreen() {
  const router = useRouter();
  const featured = foods.slice(0, 3);
  const trending = foods.slice(3, 7);

  return (
    <View style={styles.container}>
  
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput 
            placeholder="Search for restaurants or dishes..." 
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
     
        <Text style={styles.sectionTitle}>Today s Special Offers</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          snapToInterval={width * 0.85 + 16}
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {featured.map((item) => (
            <Pressable key={item.id} style={styles.featuredCard}>
              <Image source={item.image} style={styles.featuredImage} />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.featuredOverlay}
              >
                <View style={styles.promoBadge}>
                  <Text style={styles.promoText}>50% OFF</Text>
                </View>
                <Text style={styles.featuredName}>{item.name}</Text>
                <Text style={styles.featuredPrice}>Limited time offer • Ends soon</Text>
              </LinearGradient>
            </Pressable>
          ))}
        </ScrollView>

      
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Discovery</Text>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoryScroll}
        >
          {categories.map((cat) => (
            <Pressable key={cat.id} style={styles.categoryCard}>
              <View style={[styles.categoryIconCircle, { backgroundColor: cat.color }]}>
                <Ionicons name={cat.icon as any} size={26} color={cat.iconColor} />
              </View>
              <Text style={styles.categoryLabel}>{cat.name}</Text>
            </Pressable>
          ))}
        </ScrollView>

     
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Near You</Text>
          <Pressable><Text style={styles.seeAll}></Text></Pressable>
        </View>

        <View style={styles.trendingGrid}>
          {trending.map((item) => (
            <Pressable 
              key={item.id} 
              style={styles.trendingItem}
              onPress={() => router.push(`/details/${item.id}`)}
            >
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.trendingImage} />
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={10} color="#fff" />
                  <Text style={styles.ratingText}>4.8</Text>
                </View>
              </View>
              <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.itemMeta}>20-30 min • Free Delivery</Text>
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
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 16,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 16,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    paddingHorizontal: 16,
    marginVertical: 15,
  },
  seeAll: {
    color: '#ff7a00',
    fontWeight: '600',
  },
  featuredCard: {
    width: width * 0.85,
    height: 200,
    marginRight: 16,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 20,
    justifyContent: 'flex-end',
  },
  promoBadge: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: '#ff7a00',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  promoText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  featuredName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  featuredPrice: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    marginTop: 4,
  },

  categoryScroll: {
    paddingHorizontal: 16,
    paddingBottom: 5,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryIconCircle: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
 
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  categoryLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444',
  },

  trendingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  trendingItem: {
    width: '50%',
    padding: 8,
  },
  imageContainer: {
    position: 'relative',
  },
  trendingImage: {
    width: '100%',
    height: 130,
    borderRadius: 20,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  ratingText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
    marginLeft: 3,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 10,
    color: '#222',
  },
  itemMeta: {
    fontSize: 12,
    color: '#777',
    marginTop: 3,
  },
});