import { View, Text, ScrollView, Image, Pressable, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { foods } from "../types/Food"; 

export default function CartScreen() {
  const router = useRouter();
  
  const cartItems = [foods[0], foods[1]]; 
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
   
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </Pressable>
        <Text style={styles.headerTitle}>My Cart</Text>
        <View style={{ width: 40 }} /> 
      </View>

      <ScrollView style={{ flex: 1, padding: 20 }}>
        {cartItems.map((item, index) => (
          <View key={index} style={styles.cartItem}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.quantityContainer}>
              <Pressable style={styles.qtyBtn}><Ionicons name="remove" size={18} /></Pressable>
              <Text style={styles.qtyText}>1</Text>
              <Pressable style={styles.qtyBtn}><Ionicons name="add" size={18} /></Pressable>
            </View>
          </View>
        ))}
      </ScrollView>

   
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>


<Pressable 
  style={styles.checkoutBtn}
  onPress={() => router.push("/checkout/page")} // Add this line
>
  <Text style={styles.checkoutText}>Proceed to Checkout</Text>
  <Ionicons name="cart-outline" size={20} color="#fff" style={{marginLeft: 10}} />
</Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fbfbfe" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    paddingBottom: 15,
  },
  backBtn: { backgroundColor: "#f5f5f5", padding: 8, borderRadius: 12 },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 20,
    marginBottom: 15,
  },
  itemImage: { width: 70, height: 70, borderRadius: 15, marginRight: 15 },
  itemName: { fontSize: 16, fontWeight: "600" },
  itemPrice: { fontSize: 15, color: "#ff7a00", fontWeight: "700", marginTop: 4 },
  quantityContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#f9f9f9", borderRadius: 10, padding: 5 },
  qtyBtn: { padding: 5 },
  qtyText: { marginHorizontal: 10, fontWeight: "bold" },
  footer: { backgroundColor: "#fff", padding: 25, borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  totalLabel: { color: "#888", fontSize: 16 },
  totalValue: { fontSize: 22, fontWeight: "bold", color: "#1a1a1a" },
  checkoutBtn: { backgroundColor: "#ff7a00", padding: 20, borderRadius: 20, alignItems: "center" },
  checkoutText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});