import React, { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { AntDesign } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

export default function SignUpScreen({ setToken }) {
  const [user, setUser] = useState();
  const [eyes, setEyes] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../img/airbnb-logo.png")} />
        <Text style={styles.title}>Sign up </Text>
        <TextInput
          placeholder="email"
          style={styles.input}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          placeholder="username"
          style={styles.input}
          onChangeText={(text) => {
            setUsername(text);
          }}
        />
        <TextInput
          placeholder="describe yourself in few words"
          style={styles.input2}
          multiline={true}
          numberOfLines={40}
          onChangeText={(text) => {
            setDescription(text);
          }}
        />
        <View>
          <TextInput
            placeholder="password"
            secureTextEntry={eyes ? true : false}
            style={styles.input}
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

        <View>
          <TextInput
            placeholder="confirm password"
            style={styles.input}
            secureTextEntry={eyes ? true : false}
            onChangeText={(text) => {
              setConfirm(text);
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
              title="Sign up"
              onPress={async () => {
                if (
                  username.length !== 0 &&
                  email.length !== 0 &&
                  description.length !== 0 &&
                  password.length !== 0 &&
                  confirm.length !== 0
                ) {
                  if (password === confirm) {
                    try {
                      console.log("saali");
                      const newUser = {
                        email: email,
                        username: username,
                        description: description,
                        password: password,
                      };
                      console.log(newUser);
                      const response = await axios.post(
                        "https://express-airbnb-api.herokuapp.com/user/sign_up",
                        newUser
                      );
                      setUser(response.data);
                      console.log("data", response.data);
                      const userToken = response.data.token;
                      setToken(userToken);
                    } catch (error) {
                      console.log(error.message);
                    }
                  } else {
                    alert("mdp différents");
                  }
                }
              }}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text>Already an acccount ? Sign in</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", marginTop: 20 },
  logo: { height: 120, width: 100, resizeMode: "cover" },
  title: { fontSize: 18, marginTop: 16, color: "grey", marginBottom: 30 },
  input: {
    width: 300,
    borderBottomColor: "red",
    textAlign: "left",
    borderBottomWidth: 1,
    paddingBottom: 5,
    paddingLeft: 5,
    marginBottom: 20,
    marginTop: 10,
  },
  input2: {
    width: 300,
    borderColor: "red",
    textAlign: "left",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    paddingBottom: 5,
    paddingLeft: 5,
    marginBottom: 20,
    marginTop: 10,
    height: 100,
  },
});
