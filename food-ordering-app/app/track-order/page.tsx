import { View, Text, TextInput, Pressable, ScrollView, Alert } from "react-native";
import { useState } from "react";
import { router, useRouter } from "expo-router";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState<string | null>(null);

  const handleTrackOrder = () => {
    if (!orderId) {
      Alert.alert("Please enter your Order ID");
      return;
    }


    const mockStatuses: Record<string, string> = {
      "1001": "Preparing",
      "1002": "Out for Delivery",
      "1003": "Delivered",
    };

    const status = mockStatuses[orderId];
    if (status) {
      setOrderStatus(status);
    } else {
      setOrderStatus("Order not found");
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 12 }}>Track Your Order</Text>

      <Text>Enter Order ID</Text>
      <TextInput
        value={orderId}
        onChangeText={setOrderId}
        style={{ borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 8, marginTop: 4 }}
        keyboardType="numeric"
      />

    <Pressable
        onPress={() => router.push("/driver/page")} 
        style={{
          backgroundColor: "#28a745",
          padding: 16,
          borderRadius: 12,
          alignItems: "center",
          marginTop: 12,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
       Track Your order
        </Text>
      </Pressable>

      {orderStatus && (
        <View style={{ marginTop: 24, padding: 16, borderWidth: 1, borderColor: "#ccc", borderRadius: 8 }}>
          <Text style={{ fontSize: 18 }}>Order Status:</Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 8 }}>{orderStatus}</Text>
        </View>
      )}
    </ScrollView>
  );
}
