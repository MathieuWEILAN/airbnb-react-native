import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import { Callout } from "react-native-maps";
import MyCustomCalloutView from "../components/MyCustomCalloutView";

export default function AroundMeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [coords, setCoords] = useState();
  const [data, setData] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    const askPermission = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        console.log(status);
        if (status === "granted") {
          let location = await Location.getCurrentPositionAsync({});
          console.log("my location", location);
          const myLocation = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };
          setCoords(myLocation);
          const response = await axios.get(
            "https://express-airbnb-api.herokuapp.com/rooms/around"
          );
          console.log("my data =====>", response.data);
          setData(response.data);
        } else {
          setError(true);
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    askPermission();
  }, []);

  return isLoading ? (
    <Text>En chargement</Text>
  ) : error ? (
    <Text>Permission Refusée</Text>
  ) : (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
      showsUserLocation={true}
      provider={PROVIDER_GOOGLE}
    >
      {data.map((elem, i) => {
        return (
          <MapView.Marker
            key={elem._id}
            coordinate={{
              latitude: elem.location[1],
              longitude: elem.location[0],
            }}
            onCalloutPress={() => {
              navigation.navigate("Room", { id: elem._id });
            }}
          >
            <Callout>
              <MyCustomCalloutView {...elem} />
            </Callout>
          </MapView.Marker>
        );
      })}
    </MapView>
  );
}
