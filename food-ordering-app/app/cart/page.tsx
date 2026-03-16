import { View, Text, ScrollView, Image, Pressable } from "react-native";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "expo-router"; 

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const router = useRouter(); 

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Your cart is empty</Text>
      </View>
    );

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      {cart.map((item) => (
        <View
          key={item.id}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 12,
            backgroundColor: "#f2f2f2",
            padding: 12,
            borderRadius: 12,
          }}
        >
          <Image
            source={item.image}
            style={{ width: 80, height: 80, borderRadius: 12, marginRight: 12 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.name}</Text>
            <Text style={{ fontSize: 14, color: "#777" }}>
              ${item.price} x {item.quantity}
            </Text>
          </View>
          <Pressable onPress={() => removeFromCart(item.id)}>
            <Text style={{ color: "red", fontWeight: "bold" }}>Remove</Text>
          </Pressable>
        </View>
      ))}

      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 16 }}>
        Total: ${totalPrice.toFixed(2)}
      </Text>

      <Pressable
        onPress={() => router.push("/checkout/page")} // navigate to Checkout page
        style={{
          backgroundColor: "#28a745",
          padding: 16,
          borderRadius: 12,
          alignItems: "center",
          marginTop: 12,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
          Buy Now
        </Text>
      </Pressable>
    </ScrollView>
  );
}
