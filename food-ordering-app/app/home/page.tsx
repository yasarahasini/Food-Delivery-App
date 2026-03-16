import { View, Text, ScrollView, TextInput, Image, Pressable } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { categories } from "../types/Food";
import { foods } from "../data/food";

const FoodCard = ({ item, onPress }: any) => (
  <Pressable
    onPress={onPress}
    style={{
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: item.bgColor || "#fff",
      borderRadius: 12,
      padding: 12,
      marginBottom: 12,
    }}
  >
    <Image
      source={item.image}
      style={{ width: 80, height: 80, borderRadius: 12, marginRight: 12 }}
      resizeMode="cover"
    />

    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.name}</Text>
      <Text style={{ fontSize: 14, color: "#777", marginTop: 4 }}>
        ${item.price}
      </Text>
    </View>
  </Pressable>
);

export default function HomeScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredFoods = foods.filter((food) => {
    const matchCategory =
      selectedCategory === "All" || food.category === selectedCategory;

    const matchSearch = food.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 14, color: "#777" }}>Deliver to</Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 4,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Colombo, Sri Lanka
          </Text>

          <Image
            source={require("../../assets/images/yasara.png")}
            style={{ width: 42, height: 42, borderRadius: 21 }}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#f2f2f2",
          marginHorizontal: 16,
          borderRadius: 12,
          paddingHorizontal: 12,
          height: 48,
        }}
      >
        <Ionicons name="search" size={20} color="#777" />

        <TextInput
          placeholder="Search foods"
          value={search}
          onChangeText={setSearch}
          style={{ marginLeft: 8, flex: 1 }}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 16, paddingLeft: 16 }}
      >
        {categories.map((cat) => (
          <Pressable
            key={cat.id}
            onPress={() => setSelectedCategory(cat.name)}
            style={{
              marginRight: 10,
              paddingHorizontal: 18,
              paddingVertical: 8,
              borderRadius: 20,
              backgroundColor:
                selectedCategory === cat.name ? cat.color : "#f2f2f2",
            }}
          >
            <Text
              style={{
                color: selectedCategory === cat.name ? "#fff" : "#333",
                fontWeight: "600",
              }}
            >
              {cat.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={{ padding: 16 }}>
        {filteredFoods.map((item) => (
          <FoodCard
            key={item.id}
            item={item}
            onPress={() =>
              router.push({
                pathname: "/details/[id]/",
                params: { id: item.id },
              })
            }
          />
        ))}
      </View>
    </ScrollView>
  );
}