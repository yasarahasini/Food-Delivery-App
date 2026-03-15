import { View, Text, Image, Pressable } from "react-native";

export default function FoodCard({ item, onPress }: any) {
  return (
    <Pressable onPress={onPress} style={{ marginBottom: 15 }}>
      <Image source={{ uri: item.image }} style={{ height: 160 }} />
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.name}</Text>
      <Text>Rs. {item.price}</Text>
    </Pressable>
  );
}
