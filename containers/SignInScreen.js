import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AntDesign } from "@expo/vector-icons";

import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function SignInScreen({ setToken, setUserId }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eyes, setEyes] = useState(true);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../img/airbnb-logo.png")} />
        <Text style={styles.title}>Sign in</Text>
        <TextInput
          value={email}
          style={styles.input}
          placeholder="email"
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <View style={{ flex: 1, flexDirection: "row" }}>
          <TextInput
            value={password}
            style={styles.input}
            placeholder="password"
            secureTextEntry={eyes ? true : false}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          <AntDesign
            name="eyeo"
            size={24}
            color="black"
            style={{ position: "absolute", right: 5, bottom: 23 }}
            onPress={() => {
              setEyes(!eyes);
            }}
          />
        </View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View>
            <Button
              style={styles.button}
              title="Sign in"
              onPress={async () => {
                try {
                  if (!email || !password) {
                    return alert(
                      "Veuillez indiquer l'email et le mot de passe"
                    );
                  } else {
                    const response = await axios.post(
                      "https://express-airbnb-api.herokuapp.com/user/log_in",
                      { email: email, password: password }
                    );

                    const userToken = response.data.token;
                    console.log(response.data);
                    setUserId(response.data.id);

                    setToken(userToken);
                  }
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              <Text>Sign in</Text>
            </Button>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text>Create an account</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", marginTop: 70 },
  logo: { height: 120, width: 100, resizeMode: "cover" },
  title: { fontSize: 18, marginTop: 16, color: "grey", marginBottom: 70 },
  input: {
    width: 300,
    borderBottomColor: "red",
    textAlign: "left",
    borderBottomWidth: 1,
    paddingBottom: 5,
    paddingLeft: 5,
    marginBottom: 20,
  },
});
