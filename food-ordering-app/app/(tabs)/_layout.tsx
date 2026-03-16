
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  return (

      <Tabs screenOptions={{ 
        tabBarShowLabel: false,
        headerShown: false
      }}>
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="fast-food" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="cart/page"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart" size={size} color={color} />
            ),
          }}
        />
      </Tabs>

  );
}