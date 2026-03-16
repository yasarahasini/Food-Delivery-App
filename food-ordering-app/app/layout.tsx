import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useColorScheme } from "react-native";


export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
  
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="details" options={{ title: "Food Details" }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>

  );
}
