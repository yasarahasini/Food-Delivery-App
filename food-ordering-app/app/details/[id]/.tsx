import { View, Text, Image, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { foods } from "@/app/data/food";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "@/app/context/CartContext";

export default function FoodDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const food = foods.find((f) => f.id === Number(id));

  if (!food) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Food not found</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    addToCart({ id: food.id, name: food.name, price: food.price, image: food.image });
    router.push("/cart/page");
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <Pressable onPress={() => router.back()} style={{ marginBottom: 16 }}>
        <Ionicons name="arrow-back" size={28} color="#333" />
      </Pressable>

      <Image source={food.image} style={{ width: "100%", height: 250, borderRadius: 12 }} resizeMode="cover" />

      <Text style={{ fontSize: 24, fontWeight: "bold", marginVertical: 12 }}>{food.name}</Text>
      <Text style={{ fontSize: 18, color: "#777", marginBottom: 8 }}>Category: {food.category}</Text>
      <Text style={{ fontSize: 18, color: "#777", marginBottom: 12 }}>Price: ${food.price}</Text>

      <Pressable
        onPress={handleAddToCart}
        style={{ backgroundColor: "#ff6b00", padding: 16, borderRadius: 12, alignItems: "center" }}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>Add to Cart</Text>
      </Pressable>
    </ScrollView>
  );
}
