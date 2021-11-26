import React from "react";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import {
  Button,
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Stars from "../components/Stars";

export default function HomeScreen({ setToken }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator color="#F2565A" size="large" />
  ) : (
    <View>
      <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
        }}
      />
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Room", { id: item._id });
              }}
              style={styles.card}
            >
              <View>
                <Image
                  style={styles.picture}
                  source={{ uri: item.photos[0].url }}
                />
                <Text style={styles.price}>{item.price}€</Text>
              </View>
              <View>
                <Text numberOfLines={1} style={styles.title}>
                  {item.title}
                </Text>
                <View style={styles.rateReviews}>
                  <Stars ratingValue={item.ratingValue} />
                  <Text>&nbsp;{item.reviews}</Text>
                  <Text>&nbsp;Reviews</Text>
                </View>
              </View>
              <Image
                style={styles.avatar}
                source={{ uri: item.user.account.photo.url }}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  logo: { width: 50, height: 50 },
  card: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: "grey",
    paddingBottom: 20,
  },
  picture: { width: 360, height: 200 },
  price: {
    position: "absolute",
    backgroundColor: "black",
    color: "white",
    fontSize: 20,
    paddingVertical: 10,
    width: 80,
    bottom: 20,
    textAlign: "center",
  },
  title: { fontSize: 18, marginVertical: 15, width: 200 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    position: "absolute",
    bottom: 5,
    right: 70,
  },
  rateReviews: { flexDirection: "row", alignItems: "center" },
});
