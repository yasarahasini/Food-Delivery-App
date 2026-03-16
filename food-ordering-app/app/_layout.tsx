import { CartProvider } from "@/app/context/CartContext";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <CartProvider>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="fast-food" size={size} color={color} />
            ),
          }}
        />

        {/* Hide cart from tab bar but keep screen accessible */}
        <Tabs.Screen
          name="cart/page"
          options={{
            tabBarButton: () => null,
          }}
        />
      </Tabs>
    </CartProvider>
  );
}