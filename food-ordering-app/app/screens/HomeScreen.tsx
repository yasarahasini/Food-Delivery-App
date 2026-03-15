import { View, FlatList } from "react-native";
import FoodCard from "@/components/FoodCard";
import { foods } from "../data/food";

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={{ padding: 15 }}>
      <FlatList
        data={foods}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FoodCard
            item={item}
            onPress={() => navigation.navigate("Details", { food: item })}
          />
        )}
      />
    </View>
  );
}
