import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function EditProfileScreen() {
  const router = useRouter();


  const [name, setName] = useState("Yasara");
  const [email, setEmail] = useState("yasara@gmail.com");
  const [location, setLocation] = useState("Colombo, Sri Lanka");

  const handleSave = () => {
 
    Alert.alert("Success", "Profile updated successfully!", [
      { text: "OK", onPress: () => router.back() }
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#fff" }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
      
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="close" size={28} color="#333" />
          </Pressable>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <Pressable onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </Pressable>
        </View>

   
        <View style={styles.imageSection}>
          <View style={styles.imageWrapper}>
            <Image
              source={require("../../assets/images/yasara.png")}
              style={styles.avatar}
            />
            <Pressable style={styles.cameraIcon}>
              <Ionicons name="camera" size={20} color="#fff" />
            </Pressable>
          </View>
          <Text style={styles.changePhotoText}>Change Profile Photo</Text>
        </View>

     
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Enter your email"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder="City, Country"
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.infoText}>
            This information is used to personalize your experience and for delivery purposes.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  backButton: {
    padding: 4,
  },
  saveText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff7a00", 
  },
  imageSection: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  imageWrapper: {
    position: "relative",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#eee",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#ff7a00",
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  changePhotoText: {
    marginTop: 12,
    color: "#ff7a00",
    fontWeight: "600",
    fontSize: 14,
  },
  form: {
    paddingHorizontal: 25,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#eee",
  },
  footer: {
    padding: 30,
    alignItems: "center",
  },
  infoText: {
    textAlign: "center",
    color: "#aaa",
    fontSize: 12,
    lineHeight: 18,
  },
});