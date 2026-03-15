import { View, Text, Image, Button } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { foods } from "../data/food";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const food = foods.find((f) => f.id === Number(id));
  const { addToCart } = useContext(CartContext);

  if (!food) return null;

  return (
    <View style={{ padding: 15 }}>
      <Image source={{ uri: food.image }} style={{ height: 220, marginBottom: 10 }} />
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>{food.name}</Text>
      <Text>{food.description}</Text>
      <Text style={{ fontSize: 18 }}>Rs. {food.price}</Text>
      <Button title="Add to Cart" onPress={() => addToCart(food)} />
    </View>
  );
}
