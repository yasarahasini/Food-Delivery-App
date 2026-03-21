import { View, Text, ScrollView, TextInput, Pressable, StyleSheet, Platform, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const { width } = Dimensions.get("window");

export default function CheckoutScreen() {
  const router = useRouter();

 
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [promoCode, setPromoCode] = useState("");

  const placeOrder = async () => {
    if (!name || !phone || !address || !city) {
      alert("Please fill all required fields");
      return;
    }

    const orderData = {
      name,
      phone,
      address,
      city,
      notes,
      paymentMethod,
      promoCode: promoCode || null,
    };

    try {
      const res = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error('Failed to place order');
      const data = await res.json();
      console.log('Order created:', data);
      router.push('/driver/page');
    } catch (err) {
      console.error(err);
      alert('Failed to place order');
    }
  };

  return (
    <View style={styles.container}>

    
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backCircle}>
          <Ionicons name="chevron-back" size={22} color="#1a1a1a" />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Checkout</Text>
          <Text style={styles.headerStep}>Step 2 of 3</Text>
        </View>
        <View style={{ width: 45 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollBody}>

  
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Delivery to</Text>
          <Pressable><Text style={styles.editLink}>Change</Text></Pressable>
        </View>

        <View style={styles.addressCard}>
          <View style={styles.addressIconBox}>
            <Ionicons name="home-outline" size={22} color="#FF7A00" />
          </View>
          <View style={styles.addressInfo}>
            <Text style={styles.addressLabel}>Home Address</Text>
            <Text style={styles.addressSubtext}>No. 123, Galle Road, Colombo 03</Text>
          </View>
        </View>


        <Text style={[styles.sectionTitle, { marginTop: 25 }]}>Delivery Details</Text>
        <View style={styles.formCard}>
          <TextInput placeholder="Full Name" style={styles.input} value={name} onChangeText={setName} />
          <TextInput placeholder="Phone Number" keyboardType="phone-pad" style={styles.input} value={phone} onChangeText={setPhone} />
          <TextInput placeholder="Address" style={styles.input} value={address} onChangeText={setAddress} />
          <TextInput placeholder="City" style={styles.input} value={city} onChangeText={setCity} />
          <TextInput
            placeholder="Additional Notes (optional)"
            style={[styles.input, { height: 80 }]}
            multiline
            value={notes}
            onChangeText={setNotes}
          />
        </View>

      
        <Text style={[styles.sectionTitle, { marginTop: 30, marginBottom: 15 }]}>Payment Method</Text>
        <View style={styles.paymentGrid}>
          <Pressable
            style={[styles.payItem, paymentMethod === 'creditCard' && styles.payItemActive]}
            onPress={() => setPaymentMethod('creditCard')}
          >
            <Ionicons name="card" size={24} color={paymentMethod === 'creditCard' ? "#fff" : "#555"} />
            <Text style={[styles.payItemText, { color: paymentMethod === 'creditCard' ? "#fff" : "#555" }]}>Credit Card</Text>
            {paymentMethod === 'creditCard' && (
              <View style={styles.activeCheck}>
                <Ionicons name="checkmark-circle" size={16} color="#fff" />
              </View>
            )}
          </Pressable>

          <Pressable
            style={[styles.payItem, paymentMethod === 'gpay' && styles.payItemActive]}
            onPress={() => setPaymentMethod('gpay')}
          >
            <Ionicons name="logo-google" size={24} color={paymentMethod === 'gpay' ? "#fff" : "#555"} />
            <Text style={[styles.payItemText, { color: paymentMethod === 'gpay' ? "#fff" : "#555" }]}>G-Pay</Text>
          </Pressable>

          <Pressable
            style={[styles.payItem, paymentMethod === 'cash' && styles.payItemActive]}
            onPress={() => setPaymentMethod('cash')}
          >
            <Ionicons name="wallet-outline" size={24} color={paymentMethod === 'cash' ? "#fff" : "#555"} />
            <Text style={[styles.payItemText, { color: paymentMethod === 'cash' ? "#fff" : "#555" }]}>Cash</Text>
          </Pressable>
        </View>

        <View style={styles.promoWrapper}>
          <Ionicons name="ticket-outline" size={20} color="#999" style={{ marginLeft: 15 }} />
          <TextInput
            placeholder="Promo code here..."
            placeholderTextColor="#999"
            style={styles.promoInput}
            value={promoCode}
            onChangeText={setPromoCode}
          />
          <Pressable style={styles.applyBtn}>
            <Text style={styles.applyBtnText}>Apply</Text>
          </Pressable>
        </View>

     
        <View style={styles.receiptContainer}>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Basket Total</Text>
            <Text style={styles.receiptValue}>$24.50</Text>
          </View>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Delivery Charge</Text>
            <Text style={styles.receiptValue}>$2.00</Text>
          </View>
          <View style={styles.dottedDivider} />
          <View style={styles.receiptRow}>
            <Text style={styles.totalLabel}>Grand Total</Text>
            <Text style={styles.totalPrice}>$26.50</Text>
          </View>
        </View>
      </ScrollView>

   
      <View style={styles.footer}>
        <Pressable style={styles.mainOrderBtn} onPress={placeOrder}>
          <View style={{ flex: 1, alignItems: 'center', marginLeft: 40 }}>
            <Text style={styles.orderBtnText}>PLACE ORDER</Text>
          </View>
          <View style={styles.orderBtnIcon}>
            <Ionicons name="arrow-forward" size={20} color="#FF7A00" />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FB" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: Platform.OS === 'ios' ? 60 : 40, paddingHorizontal: 20, backgroundColor: "#F8F9FB", paddingBottom: 20 },
  backCircle: { backgroundColor: "#fff", width: 45, height: 45, borderRadius: 22.5, justifyContent: "center", alignItems: "center", elevation: 3, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10 },
  headerCenter: { alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: "800", color: "#1a1a1a" },
  headerStep: { fontSize: 12, color: "#999", fontWeight: "600", marginTop: 2 },
  scrollBody: { paddingHorizontal: 20, paddingBottom: 140 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { fontSize: 17, fontWeight: "800", color: "#1a1a1a" },
  editLink: { color: "#FF7A00", fontWeight: "700", fontSize: 14 },
  addressCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 18, borderRadius: 24, shadowColor: "#000", shadowOpacity: 0.03, shadowRadius: 15, elevation: 2 },
  addressIconBox: { backgroundColor: '#FFF5EE', padding: 12, borderRadius: 16 },
  addressInfo: { marginLeft: 15, flex: 1 },
  addressLabel: { fontSize: 15, fontWeight: '700', color: '#1a1a1a' },
  addressSubtext: { color: '#888', fontSize: 13, marginTop: 3 },
  formCard: { backgroundColor: "#fff", borderRadius: 20, padding: 15, marginTop: 15 },
  input: { borderWidth: 1, borderColor: "#eee", borderRadius: 12, padding: 12, marginBottom: 12, backgroundColor: "#F9F9F9", fontWeight: "600" },
  paymentGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  payItem: { width: (width - 60) / 3, backgroundColor: '#fff', paddingVertical: 20, borderRadius: 20, alignItems: 'center', borderWidth: 1.5, borderColor: 'transparent' },
  payItemActive: { backgroundColor: '#1a1a1a', borderColor: '#1a1a1a' },
  payItemText: { marginTop: 10, fontWeight: '700', fontSize: 11 },
  activeCheck: { position: 'absolute', top: 8, right: 8 },
  promoWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 20, marginTop: 25, height: 60, paddingRight: 8 },
  promoInput: { flex: 1, paddingHorizontal: 12, fontWeight: '600', color: '#1a1a1a' },
  applyBtn: { backgroundColor: '#FF7A00', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 14 },
  applyBtnText: { color: '#fff', fontWeight: '800', fontSize: 13 },
  receiptContainer: { marginTop: 30, backgroundColor: '#fff', borderRadius: 24, padding: 20 },
  receiptRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  receiptLabel: { color: '#999', fontWeight: '600' },
  receiptValue: { color: '#1a1a1a', fontWeight: '700' },
  dottedDivider: { borderBottomWidth: 1, borderBottomColor: '#eee', borderStyle: 'dashed', marginVertical: 5, marginBottom: 15 },
  totalLabel: { fontSize: 16, fontWeight: '800', color: '#1a1a1a' },
  totalPrice: { fontSize: 22, fontWeight: '900', color: '#FF7A00' },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingTop: 20, paddingBottom: Platform.OS === 'ios' ? 40 : 25, paddingHorizontal: 25, backgroundColor: '#fff', borderTopLeftRadius: 35, borderTopRightRadius: 35 },
  mainOrderBtn: { backgroundColor: '#1a1a1a', height: 64, borderRadius: 22, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 },
  orderBtnText: { color: '#fff', fontSize: 16, fontWeight: '900', letterSpacing: 1 },
  orderBtnIcon: { backgroundColor: '#fff', width: 44, height: 44, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
});