import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/core";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

export default function ProfileScreen({ userId, userToken, setUserToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState();
  const [data, setData] = useState();
  console.log("my id", userId);

  console.log("token", userToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("hello");
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${userId}
          `,
          { headers: { Authorization: "Bearer " + userToken } }
        );

        console.log("my response", response.data);
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={{ alignItems: "center" }}>
      <View>
        <TouchableOpacity
          style={{
            width: 140,
            height: 140,
            borderWidth: 1,
            borderColor: "red",
            padding: 10,
            marginTop: 20,
            borderRadius: 100,
          }}
        >
          <View></View>
        </TouchableOpacity>
        <View style={{ position: "absolute", right: -50, top: 60 }}>
          <TouchableOpacity style={{ marginBottom: 10 }}>
            <Ionicons name="ios-image-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="camera-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <TextInput
          placeholder="email"
          style={{
            width: 270,
            borderBottomWidth: 1,
            borderColor: "red",
            padding: 5,
          }}
        ></TextInput>
        <TextInput
          placeholder="username"
          style={{
            width: 270,
            borderBottomWidth: 1,
            borderColor: "red",
            padding: 5,
          }}
        ></TextInput>
        <TextInput
          numberOfLines={10}
          multiline={true}
          textAlignVertical="top"
          style={{
            width: 270,
            borderWidth: 1,
            borderColor: "red",
            padding: 5,
            marginTop: 20,
            height: 100,
          }}
          placeholder="description"
        ></TextInput>
      </View>
      <View>
        <TouchableOpacity
          style={{
            width: 170,
            borderWidth: 1,
            borderColor: "red",
            padding: 10,
            marginTop: 20,
            borderRadius: 20,
          }}
        >
          <Text>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 170,
            borderWidth: 1,
            borderColor: "red",
            padding: 10,
            marginTop: 20,
            borderRadius: 20,
          }}
          onPress={() => {
            setUserToken(null);
          }}
        >
          <Text>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
