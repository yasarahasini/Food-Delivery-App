import { View, Text, ScrollView, TextInput, Pressable, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function CheckoutScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
    
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </Pressable>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        
     
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <Pressable><Text style={styles.editLink}>Change</Text></Pressable>
          </View>
          <View style={styles.addressCard}>
            <View style={styles.iconCircle}>
              <Ionicons name="location" size={20} color="#ff7a00" />
            </View>
            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={styles.addressName}>Home</Text>
              <Text style={styles.addressText}>No. 123, Galle Road, Colombo 03, Sri Lanka</Text>
            </View>
          </View>
        </View>

    
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentRow}>
            <Pressable style={[styles.paymentBtn, styles.activePayment]}>
              <Ionicons name="card" size={24} color="#fff" />
              <Text style={[styles.paymentText, { color: '#fff' }]}>Card</Text>
            </Pressable>
            <Pressable style={styles.paymentBtn}>
              <Ionicons name="logo-paypal" size={24} color="#333" />
              <Text style={styles.paymentText}>PayPal</Text>
            </Pressable>
            <Pressable style={styles.paymentBtn}>
              <Ionicons name="cash" size={24} color="#333" />
              <Text style={styles.paymentText}>Cash</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>$24.50</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>$2.00</Text>
          </View>
          <View style={[styles.summaryRow, { marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#eee' }]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>$26.50</Text>
          </View>
        </View>

     
        <View style={styles.promoContainer}>
          <TextInput 
            placeholder="Enter Promo Code" 
            style={styles.promoInput}
          />
          <Pressable style={styles.promoBtn}>
            <Text style={styles.promoBtnText}>Apply</Text>
          </Pressable>
        </View>

      </ScrollView>

      <View style={styles.footer}>
       <Pressable 
  style={styles.placeOrderBtn}
  onPress={() => router.push("/driver/page")} 
>
  <Text style={styles.placeOrderText}>Place Order • $26.50</Text>
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
  section: { marginBottom: 25 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#1a1a1a" },
  editLink: { color: "#ff7a00", fontWeight: "600" },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eee'
  },
  iconCircle: { backgroundColor: '#fff5ed', padding: 10, borderRadius: 15 },
  addressName: { fontSize: 16, fontWeight: '700', marginBottom: 2 },
  addressText: { color: '#777', fontSize: 13 },
  paymentRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  paymentBtn: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#eee'
  },
  activePayment: { backgroundColor: '#ff7a00', borderColor: '#ff7a00' },
  paymentText: { marginTop: 8, fontWeight: '600', fontSize: 12 },
  summaryCard: { backgroundColor: '#fff', padding: 20, borderRadius: 20, marginBottom: 20 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { color: '#888' },
  summaryValue: { fontWeight: '600' },
  totalLabel: { fontSize: 18, fontWeight: 'bold' },
  totalValue: { fontSize: 20, fontWeight: 'bold', color: '#ff7a00' },
  promoContainer: { flexDirection: 'row', marginBottom: 30 },
  promoInput: { 
    flex: 1, 
    backgroundColor: '#fff', 
    paddingHorizontal: 15, 
    borderRadius: 15, 
    height: 50,
    borderWidth: 1,
    borderColor: '#eee'
  },
  promoBtn: { backgroundColor: '#1a1a1a', paddingHorizontal: 20, borderRadius: 15, justifyContent: 'center', marginLeft: 10 },
  promoBtnText: { color: '#fff', fontWeight: 'bold' },
  footer: { padding: 25, backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  placeOrderBtn: { backgroundColor: '#ff7a00', padding: 20, borderRadius: 20, alignItems: 'center' },
  placeOrderText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});