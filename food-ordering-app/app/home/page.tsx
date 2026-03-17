import { View, Text, ScrollView, TextInput, Image, Pressable, Platform, StyleSheet } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { categories, foods } from "../types/Food";

const FoodCard = ({ item, onPress }: any) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => ({
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#fff",
      borderRadius: 16,
      padding: 10,
      marginBottom: 12,
      opacity: pressed ? 0.9 : 1,
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 10,
        },
        android: {
          elevation: 3,
        },
      }),
    })}
  >
    <Image
      source={item.image}
      style={{
        width: 70,
        height: 70,
        borderRadius: 12,
        marginRight: 12,
      }}
      resizeMode="cover"
    />

    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text
        numberOfLines={1}
        style={{
          fontSize: 16,
          fontWeight: "600",
          color: "#1a1a1a",
        }}
      >
        {item.name}
      </Text>

      <Text
        numberOfLines={1}
        style={{
          fontSize: 13,
          color: "#777",
          marginTop: 2,
        }}
      >
        Delicious & fresh
      </Text>

      <Text
        style={{
          fontSize: 15,
          fontWeight: "bold",
          marginTop: 6,
          color: "#ff7a00",
        }}
      >
        ${item.price.toFixed(2)}
      </Text>
    </View>

    <Ionicons name="chevron-forward" size={18} color="#ccc" style={{ marginLeft: 8 }} />
  </Pressable>
);

export default function HomeScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("home"); 

  const filteredFoods = foods.filter((food) => {
    const matchCategory = selectedCategory === "All" || food.category === selectedCategory;
    const matchSearch = food.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#fbfbfe" }}>
    
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
        contentContainerStyle={{ paddingBottom: 100 }} 
      >
       
        <View
          style={{
            padding: 20,
            paddingTop: Platform.OS === 'ios' ? 60 : 40,
            backgroundColor: "#ff7a00",
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
          }}
        >
          <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 14 }}>
            Deliver to
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 4,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              Colombo, Sri Lanka
            </Text>

            <Image
              source={require("../../assets/images/yasara.png")}
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                borderWidth: 2,
                borderColor: "#fff",
              }}
            />
          </View>
        </View>

     
        <View style={{ backgroundColor: '#fbfbfe', paddingTop: 10, paddingBottom: 5 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#fff",
              marginHorizontal: 16,
              borderRadius: 14,
              paddingHorizontal: 12,
              height: 48,
              borderWidth: 1,
              borderColor: '#eee',
            }}
          >
            <Ionicons name="search" size={18} color="#999" />
            <TextInput
              placeholder="Search your favorite food..."
              placeholderTextColor="#999"
              value={search}
              onChangeText={setSearch}
              style={{ marginLeft: 8, flex: 1, fontSize: 15, color: '#333' }}
            />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 15 }}
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
                  backgroundColor: selectedCategory === cat.name ? "#ff7a00" : "#fff",
                  borderWidth: selectedCategory === cat.name ? 0 : 1,
                  borderColor: '#eee',
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: selectedCategory === cat.name ? "#fff" : "#555",
                  }}
                >
                  {cat.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

      
        <View style={{ paddingHorizontal: 16 }}>
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

   
      <View style={styles.tabBar}>
        <Pressable 
          onPress={() => setActiveTab("/home/page")} 
          style={styles.tabItem}
        >
          <Ionicons 
            name={activeTab === "home" ? "home" : "home-outline"} 
            size={24} 
            color={activeTab === "home" ? "#ff7a00" : "#999"} 
          />
          <Text style={[styles.tabText, { color: activeTab === "home" ? "#ff7a00" : "#999" }]}>
            Home
          </Text>
        </Pressable>

        <Pressable 
          onPress={() => {
            setActiveTab("profile");
             router.push("/profile"); 
          }} 
          style={styles.tabItem}
        >
          <Ionicons 
            name={activeTab === "profile" ? "person" : "person-outline"} 
            size={24} 
            color={activeTab === "profile" ? "#ff7a00" : "#999"} 
          />
          <Text style={[styles.tabText, { color: activeTab === "profile" ? "#ff7a00" : "#999" }]}>
            Profile
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    height: Platform.OS === "ios" ? 85 : 65,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: Platform.OS === "ios" ? 20 : 0,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 10,
    elevation: 20,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
});