import { View, Text, ScrollView, TextInput, Image, Pressable, Platform, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { foods } from "../types/Food";

const { width } = Dimensions.get("window");

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
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        <Text style={styles.sectionTitle}>Todays Special Offers</Text>
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
              <View style={styles.featuredOverlay}>
                <View style={styles.promoBadge}>
                  <Text style={styles.promoText}>50% OFF</Text>
                </View>
                <Text style={styles.featuredName}>{item.name}</Text>
                <Text style={styles.featuredPrice}>Limited time offer</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

   
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending Near You</Text>
          <Pressable><Text style={styles.seeAll}>View all</Text></Pressable>
        </View>

        <View style={styles.trendingGrid}>
          {trending.map((item) => (
            <Pressable 
              key={item.id} 
              style={styles.trendingItem}
              onPress={() => router.push(`/details/${item.id}`)}
            >
              <Image source={item.image} style={styles.trendingImage} />
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={10} color="#fff" />
                <Text style={styles.ratingText}>4.8</Text>
              </View>
              <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.itemMeta}>20-30 min • Free Delivery</Text>
            </Pressable>
          ))}
        </View>

      
        <Text style={styles.sectionTitle}>Quick Discovery</Text>
        <View style={styles.chipContainer}>
          {['Healthy', 'Fast Food', 'Beverages', 'Desserts', 'Asian', 'Bakery'].map((tag) => (
            <Pressable key={tag} style={styles.chip}>
              <Text style={styles.chipText}>{tag}</Text>
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
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 16,
    marginTop: 25,
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
    height: 180,
    marginRight: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 20,
    justifyContent: 'flex-end',
  },
  promoBadge: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: '#ff7a00',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
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
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
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
  trendingImage: {
    width: '100%',
    height: 120,
    borderRadius: 15,
  },
  ratingBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
  },
  ratingText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 3,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 8,
    color: '#333',
  },
  itemMeta: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
 
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
  },
  chip: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 10,
  },
  chipText: {
    color: '#555',
    fontWeight: '500',
  },
});