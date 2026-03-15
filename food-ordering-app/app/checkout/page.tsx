import { View, Text, TextInput, Pressable, ScrollView, Alert } from "react-native";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "expo-router";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState(""); // new
  const [zip, setZip] = useState("");   // new
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  // Credit card fields
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = () => {
    if (!name || !email || !phone || !address || !city || !zip) {
      Alert.alert("Please fill all details");
      return;
    }

    if (paymentMethod === "Credit Card" && (!cardNumber || !expiry || !cvv)) {
      Alert.alert("Please fill credit card details");
      return;
    }

    // Simulate payment success
    Alert.alert("Payment Successful", `Thank you ${name} for your order!`);
    clearCart();
    router.push("/"); // Navigate back to home
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 12 }}>Checkout</Text>

      {/* Customer Details */}
      <Text>Name</Text>
      <TextInput value={name} onChangeText={setName} style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 8 }} />

      <Text style={{ marginTop: 8 }}>Email</Text>
      <TextInput value={email} onChangeText={setEmail} style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 8 }} />

      <Text style={{ marginTop: 8 }}>Phone</Text>
      <TextInput value={phone} onChangeText={setPhone} style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 8 }} />

      {/* Location */}
      <Text style={{ marginTop: 8 }}>Address</Text>
      <TextInput value={address} onChangeText={setAddress} style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 8 }} />
      
      <Text style={{ marginTop: 8 }}>City</Text>
      <TextInput value={city} onChangeText={setCity} style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 8 }} />

      <Text style={{ marginTop: 8 }}>ZIP Code</Text>
      <TextInput value={zip} onChangeText={setZip} style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 8 }} />

      {/* Payment Method */}
      <Text style={{ marginTop: 8 }}>Payment Method</Text>
      <Pressable onPress={() => setPaymentMethod("Credit Card")} style={{ padding: 8, backgroundColor: paymentMethod === "Credit Card" ? "#7fc545ff" : "#f2f2f2", marginTop: 4, borderRadius: 8 }}>
        <Text style={{ color: paymentMethod === "Credit Card" ? "#fff" : "#000" }}>Credit Card</Text>
      </Pressable>
      <Pressable onPress={() => setPaymentMethod("Cash on Delivery")} style={{ padding: 8, backgroundColor: paymentMethod === "Cash on Delivery" ? "#7fc545ff" : "#f2f2f2", marginTop: 4, borderRadius: 8 }}>
        <Text style={{ color: paymentMethod === "Cash on Delivery" ? "#fff" : "#000" }}>Cash on Delivery</Text>
      </Pressable>

      {/* Credit Card Details */}
      {paymentMethod === "Credit Card" && (
        <>
          <Text style={{ marginTop: 8 }}>Card Number</Text>
          <TextInput value={cardNumber} onChangeText={setCardNumber} keyboardType="numeric" style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 8 }} />

          <Text style={{ marginTop: 8 }}>Expiry (MM/YY)</Text>
          <TextInput value={expiry} onChangeText={setExpiry} style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 8 }} />

          <Text style={{ marginTop: 8 }}>CVV</Text>
          <TextInput value={cvv} onChangeText={setCvv} keyboardType="numeric" style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 8 }} />
        </>
      )}

      <Text style={{ marginTop: 16, fontSize: 18, fontWeight: "bold" }}>Total: ${totalPrice.toFixed(2)}</Text>

      <Pressable
        onPress={() => router.push("/track-order/page")} // navigate to Checkout page
        style={{
          backgroundColor: "#28a745",
          padding: 16,
          borderRadius: 12,
          alignItems: "center",
          marginTop: 12,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
          Pay Now
        </Text>
      </Pressable>
    </ScrollView>
  );
}
