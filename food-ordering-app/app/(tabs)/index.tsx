import { View, Text, TextInput, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 24,
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 24 }}>
        Login
      </Text>

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 14,
          borderRadius: 10,
          marginBottom: 16,
        }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 14,
          borderRadius: 10,
          marginBottom: 24,
        }}
      />

      <Pressable
        onPress={() => router.push("/home/page")}
        style={{
          backgroundColor: "#ff6b00",
          padding: 16,
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
          Login
        </Text>
      </Pressable>

      <Pressable onPress={() => router.push("/auth/signup")}>
        <Text
          style={{
            marginTop: 20,
            textAlign: "center",
            color: "#555",
          }}
        >
          Don’t have an account? Sign up
        </Text>
      </Pressable>
    </View>
  );
}
