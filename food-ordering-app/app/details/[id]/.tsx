import React from "react";
import { View, Text, ImageBackground, ScrollView, Pressable, StyleSheet, Platform, Dimensions } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { foods } from "../../types/Food";

const { height } = Dimensions.get("window");

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const item = foods.find((f) => f.id.toString() === id);

  if (!item) {
    return (
      <View style={styles.center}>
        <Text>Food item not found!</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      
      <ImageBackground source={item.image} style={styles.heroImage}>
        <View style={styles.overlay} />
        
   
        <View style={styles.headerNav}>
          <Pressable onPress={() => router.back()} style={styles.glassButton}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </Pressable>
          <Pressable style={styles.glassButton}>
            <Ionicons name="heart-outline" size={24} color="#ff4d4d" />
          </Pressable>
        </View>

    
        <View style={styles.floatingPrice}>
          <Text style={styles.currency}>$</Text>
          <Text style={styles.priceValue}>{item.price.toFixed(0)}</Text>
          <Text style={styles.priceCents}>{(item.price % 1).toFixed(2).substring(1)}</Text>
        </View>
      </ImageBackground>

    
      <View style={styles.sheetContainer}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={styles.indicator} />
          
          <View style={styles.metaRow}>
            <Text style={styles.categoryBadge}>{item.category.toUpperCase()}</Text>
            <View style={styles.ratingBox}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.ratingText}> 4.8</Text>
            </View>
          </View>

          <Text style={styles.mainTitle}>{item.name}</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={20} color="#888" />
              <Text style={styles.statText}>25 min</Text>
            </View>
            <View style={[styles.statItem, { borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#eee' }]}>
              <Ionicons name="flame-outline" size={20} color="#888" />
              <Text style={styles.statText}>450 Cal</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="leaf-outline" size={20} color="#888" />
              <Text style={styles.statText}>Organic</Text>
            </View>
          </View>

          <Text style={styles.descriptionHeader}>The Story</Text>
          <Text style={styles.descriptionBody}>
            Experience the artisanal craft of our {item.name}. Every layer is designed to 
            provoke the senses, using locally sourced ingredients and traditional slow-cooking 
            techniques that define our kitchen's philosophy.
          </Text>
        </ScrollView>

    
        <View style={styles.footer}>
          <View style={styles.quantityControl}>
            <Pressable style={styles.qtyBtn}><Text style={styles.qtyBtnText}>-</Text></Pressable>
            <Text style={styles.qtyText}>1</Text>
            <Pressable style={styles.qtyBtn}><Text style={styles.qtyBtnText}>+</Text></Pressable>
          </View>
          
          <Pressable 
            style={styles.ctaButton}
            onPress={() => router.push("/cart/page")}
          >
            <Text style={styles.ctaText}>Add to Order</Text>
            <View style={styles.ctaIconCircle}>
              <Ionicons name="chevron-forward" size={18} color="#FF7A00" />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#000" },
  heroImage: { height: height * 0.55, width: "100%", justifyContent: 'space-between' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.15)' },
  
  headerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  glassButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 12,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  
  floatingPrice: {
    position: 'absolute',
    bottom: 50,
    right: 25,
    backgroundColor: '#FF7A00',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'flex-start',
    elevation: 8,
    shadowColor: "#FF7A00",
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  currency: { color: '#fff', fontSize: 16, fontWeight: '600', marginTop: 4 },
  priceValue: { color: '#fff', fontSize: 32, fontWeight: '800' },
  priceCents: { color: '#fff', fontSize: 16, fontWeight: '600', marginTop: 4 },

  sheetContainer: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: -40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 25,
  },
  indicator: {
    width: 40,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 25,
  },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  categoryBadge: { letterSpacing: 1.5, fontSize: 12, fontWeight: '800', color: '#FF7A00' },
  ratingBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF9E5', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  ratingText: { fontWeight: 'bold', color: '#F1C40F', fontSize: 13 },
  
  mainTitle: { fontSize: 32, fontWeight: '900', color: '#1A1A1A', marginBottom: 20 },
  
  statsRow: { 
    flexDirection: 'row', 
    backgroundColor: '#F8F9FA', 
    borderRadius: 20, 
    paddingVertical: 15, 
    marginBottom: 25 
  },
  statItem: { flex: 1, alignItems: 'center', gap: 5 },
  statText: { fontSize: 13, color: '#666', fontWeight: '600' },

  descriptionHeader: { fontSize: 18, fontWeight: '800', color: '#1A1A1A', marginBottom: 10 },
  descriptionBody: { fontSize: 15, color: '#777', lineHeight: 24, marginBottom: 100 },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 110,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderColor: '#F0F0F0'
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 5,
    marginRight: 15,
  },
  qtyBtn: { width: 35, height: 35, justifyContent: 'center', alignItems: 'center' },
  qtyBtnText: { fontSize: 20, fontWeight: '600', color: '#333' },
  qtyText: { paddingHorizontal: 15, fontSize: 16, fontWeight: '700' },

  ctaButton: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    height: 60,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  ctaText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  ctaIconCircle: { backgroundColor: '#fff', padding: 4, borderRadius: 10 },
});