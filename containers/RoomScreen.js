import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { Ionicons } from "@expo/vector-icons";
import Stars from "../components/Stars";
import MapView from "react-native-maps";
import LottieView from "lottie-react-native";

const RoomScreen = ({ route }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showText, setShowText] = useState(false);
  const [location, setLocation] = useState();
  console.log("my route is===>", route);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
        );
        setData(response.data);
        console.log("This is a object ======>", response.data);
        setLocation(response.data.location);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const onPressShow = () => setShowText(true);
  const onPressHide = () => setShowText(false);

  return isLoading ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        color: "#FD5B60",
      }}
    >
      <LottieView
        source={require("../img/lottie.json")}
        autoPlay
        loop
        style={{ color: "#FD5B60" }}
      />
    </View>
  ) : (
    <ScrollView>
      <View>
        <SwiperFlatList
          autoplay
          autoplayDelay={5}
          autoplayLoop
          index={0}
          showPagination
          data={data.photos}
          renderItem={({ item }) => (
            <View>
              <Image style={styles.image} source={{ uri: item.url }} />
            </View>
          )}
        />
        <Text style={styles.price}>{data.price}€</Text>
      </View>

      <View style={{ marginHorizontal: 10 }}>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
          {data.title}
        </Text>
        <View style={styles.rateReviews}>
          <Stars ratingValue={data.ratingValue} />
          <Text>&nbsp;{data.reviews}&nbsp;reviews</Text>
        </View>
        <Image
          source={{ uri: data.user.account.photo.url }}
          style={styles.avatar}
        />
        <View>
          <Text
            style={{ marginTop: 20 }}
            numberOfLines={showText ? null : 3}
            ellipsizeMode="tail"
          >
            {data.description}
          </Text>
          {!showText ? (
            <TouchableOpacity
              style={{ marginTop: 10, justifyContent: "center" }}
              onPress={onPressShow}
            >
              <Text>
                Show more <Ionicons name="caret-down" size={12} color="black" />
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{ marginTop: 10, justifyContent: "center" }}
              onPress={onPressHide}
            >
              <Text>
                Show less <Ionicons name="caret-up" size={12} color="black" />
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <MapView
          style={{ width: 300, height: 290 }}
          initialRegion={{
            latitude: 48.856614,
            longitude: 2.3522219,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          showsUserLocation={true}
        >
          <MapView.Marker
            coordinate={{
              latitude: location[1],
              longitude: location[0],
            }}
            title={data.title}
          />
        </MapView>
      </View>
    </ScrollView>
  );
};

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
    bottom: 10,
    textAlign: "center",
  },
  title: { fontSize: 18, marginVertical: 15, width: 200 },
  rate: { flexDirection: "row" },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    position: "absolute",
    top: 5,
    right: 0,
  },
  rateReviews: { flexDirection: "row", alignItems: "center" },
  image: {
    height: 300,
    width: 500,
  },
});

export default RoomScreen;
