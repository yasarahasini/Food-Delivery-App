import { View, Text, ScrollView, Image, Pressable, StyleSheet, Platform, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { foods } from "../types/Food";

const { width } = Dimensions.get("window");

export default function CartScreen() {
  const router = useRouter();
  const cartItems = [foods[0], foods[1]];
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
 
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back-outline" size={22} color="#1A1A1A" />
        </Pressable>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Order Basket</Text>
          <Text style={styles.headerSubtitle}>{cartItems.length} items selected</Text>
        </View>
        <Pressable style={styles.trashBtn}>
          <Ionicons name="trash-outline" size={20} color="#FF4D4D" />
        </Pressable>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollPadding}
      >
        {cartItems.map((item, index) => (
          <View key={index} style={styles.cartCard}>
       
            <View style={styles.imageWrapper}>
              <Image source={item.image} style={styles.itemImage} />
            </View>

            <View style={styles.detailsContainer}>
              <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.itemCategory}>{item.category}</Text>
              
              <View style={styles.priceRow}>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                
           
                <View style={styles.qtyControl}>
                  <Pressable style={styles.qtyAction}><Ionicons name="remove" size={16} color="#333" /></Pressable>
                  <Text style={styles.qtyVal}>1</Text>
                  <Pressable style={[styles.qtyAction, styles.qtyAdd]}><Ionicons name="add" size={16} color="#fff" /></Pressable>
                </View>
              </View>
            </View>
          </View>
        ))}

      
        <Pressable style={styles.promoButton}>
          <Ionicons name="pricetag-outline" size={20} color="#FF7A00" />
          <Text style={styles.promoText}>Apply Voucher Code</Text>
          <Ionicons name="chevron-forward" size={18} color="#CCC" />
        </Pressable>
      </ScrollView>

 
      <View style={styles.floatingFooter}>
        <View style={styles.totalInfo}>
          <Text style={styles.totalLabel}>Grand Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
        
        <Pressable 
          style={styles.checkoutBtn}
          onPress={() => router.push("/checkout/page")}
        >
          <Text style={styles.checkoutText}>Checkout</Text>
          <View style={styles.btnIcon}>
            <Ionicons name="arrow-forward" size={18} color="#FF7A00" />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F7FA" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 25,
    paddingBottom: 20,
    backgroundColor: "#F4F7FA",
  },
  headerTextContainer: { flex: 1, marginLeft: 15 },
  headerTitle: { fontSize: 22, fontWeight: "900", color: "#1A1A1A" },
  headerSubtitle: { fontSize: 13, color: "#999", fontWeight: "600" },
  backBtn: { backgroundColor: "#fff", padding: 10, borderRadius: 15, elevation: 2, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 5 },
  trashBtn: { padding: 10 },

  scrollPadding: { paddingHorizontal: 25, paddingBottom: 150 },

  cartCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 15,
    marginBottom: 18,
    alignItems: "center",
    shadowColor: "#5E6C84",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 5,
  },
  imageWrapper: {
    backgroundColor: "#F0F0F0",
    borderRadius: 18,
    padding: 5,
  },
  itemImage: { width: 85, height: 85, borderRadius: 15 },
  detailsContainer: { flex: 1, marginLeft: 18 },
  itemName: { fontSize: 17, fontWeight: "800", color: "#1A1A1A" },
  itemCategory: { fontSize: 12, color: "#AAA", marginVertical: 4, fontWeight: "600" },
  
  priceRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 },
  itemPrice: { fontSize: 18, fontWeight: "900", color: "#1A1A1A" },

  qtyControl: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#F4F7FA", 
    borderRadius: 12,
    padding: 4 
  },
  qtyAction: { width: 28, height: 28, justifyContent: "center", alignItems: "center" },
  qtyAdd: { backgroundColor: "#1A1A1A", borderRadius: 8 },
  qtyVal: { marginHorizontal: 12, fontWeight: "800", fontSize: 14 },

  promoButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#EEE",
    borderStyle: "dashed",
  },
  promoText: { flex: 1, marginLeft: 12, color: "#666", fontWeight: "600" },

  floatingFooter: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "#1A1A1A",
    borderRadius: 30,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  totalInfo: { flex: 1 },
  totalLabel: { color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: "600" },
  totalValue: { color: "#fff", fontSize: 24, fontWeight: "800" },
  
  checkoutBtn: { 
    backgroundColor: "#fff", 
    paddingVertical: 12, 
    paddingHorizontal: 22, 
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  checkoutText: { color: "#1A1A1A", fontSize: 16, fontWeight: "800" },
  btnIcon: { backgroundColor: "#F4F7FA", padding: 4, borderRadius: 8 }
});