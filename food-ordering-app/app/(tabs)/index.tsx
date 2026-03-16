import { View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        
      
        <View style={styles.logoCircle}>
          <Ionicons name="fast-food" size={50} color="#ff7a00" />
        </View>

        <Text style={styles.welcomeText}>Welcome Back!</Text>
        <Text style={styles.subText}>Login to your account to continue</Text>

     
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#999"
            keyboardType="email-address"
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            style={styles.input}
          />
        </View>

        <Pressable style={{ alignSelf: 'flex-end', marginBottom: 25 }}>
          <Text style={{ color: '#ff7a00', fontWeight: '600' }}>Forgot Password?</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/home/page")}
          style={({ pressed }) => [
            styles.loginBtn,
            { opacity: pressed ? 0.9 : 1 }
          ]}
        >
          <Text style={styles.loginBtnText}>Login</Text>
        </Pressable>

    
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don’t have an account? </Text>
          <Pressable onPress={() => router.push("/auth/signup")}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </Pressable>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#fff5ed",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  subText: {
    fontSize: 15,
    color: "#777",
    marginBottom: 40,
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 60,
    marginBottom: 16,
    width: "100%",
    borderWidth: 1,
    borderColor: "#eee",
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  loginBtn: {
    backgroundColor: "#ff7a00",
    width: "100%",
    height: 60,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#ff7a00",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  loginBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    marginTop: 30,
  },
  footerText: {
    color: "#777",
    fontSize: 15,
  },
  signUpText: {
    color: "#ff7a00",
    fontWeight: "bold",
    fontSize: 15,
  },
});