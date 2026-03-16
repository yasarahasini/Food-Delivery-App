import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { API_URL } from "../config/api";

export default function LoginScreen() {

  const router = useRouter();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async () => {

    if(!email || !password){
      alert("Enter email and password");
      return;
    }

    try{

      const response = await fetch(`${API_URL}/auth/login`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email,
          password
        })
      })

      const data = await response.json();

      if(!response.ok){
        alert(data.message);
        return;
      }

      alert("Login success");

      router.replace("/home/page");

    }catch(err){
      console.log(err)
      alert("Server error");
    }

  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
container:{flex:1,justifyContent:"center",padding:24},
title:{fontSize:28,fontWeight:"bold",marginBottom:20},
input:{borderWidth:1,borderColor:"#ccc",padding:12,borderRadius:10,marginBottom:15},
button:{backgroundColor:"#ff7a00",padding:15,borderRadius:10,alignItems:"center"},
buttonText:{color:"#fff",fontWeight:"bold"}
});