import React, {useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";


export const LoginMobile = () => {

  const [name, setName] = useState("");

  const setText = (input: string) => {
    setName(input);
  }

  return (
        
    <View style={styles.background}>

    <Text style={styles.titleText}>
      This is the login() component
    </Text>

    <Text style={styles.titleText}>
      Please enter your UserName
    </Text>

    <TextInput
      style={styles.input}  
      onChangeText={(text) => setText(text)}
    />

    <Button
      title="Login"
      onPress={() => Alert.alert("Welcome " + name + "!")}
    />

    </View>
        
    );

}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "red",
    padding:  10,
  },
  background: {
    backgroundColor: "yellow"
  }
});

export default LoginMobile;