import { View, Text, Image, Pressable } from "react-native";
import { useRouter, SearchParams } from "expo-router";
import { foods } from "../../data/food";
import { useCart } from "@/app/context/CartContext"; // Make sure you have a CartContext
import { useSearchParams } from "expo-router/build/hooks";

export default function FoodDetails() {
  const router = useRouter();
  const { id } = useSearchParams();
  const { addToCart } = useCart(); // get addToCart function from context

  const foodItem = foods.find((f) => f.id === id);

  if (!foodItem) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Food not found!</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Image
        source={foodItem.image}
        style={{ width: "100%", height: 200, borderRadius: 12 }}
        resizeMode="cover"
      />

      <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 16 }}>
        {foodItem.name}
      </Text>

      <Text style={{ fontSize: 18, color: "#777", marginVertical: 8 }}>
        ${foodItem.price}
      </Text>

      <Text style={{ fontSize: 16, color: "#555" }}>{foodItem.description}</Text>

      <Pressable
        onPress={() => addToCart(foodItem)}
        style={{
          marginTop: 24,
          backgroundColor: "#FF6B6B",
          paddingVertical: 12,
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
          Add to Cart
        </Text>
      </Pressable>
    </View>
  );
}