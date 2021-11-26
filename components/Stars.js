import React from "react";

import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Stars({ ratingValue }) {
  let rating = ratingValue;
  let stars = [];
  for (let i = 1; i <= 5; i++) {
    let path = <Ionicons name="md-star-sharp" size={22} color="orange" />;
    if (i > rating) {
      path = <Ionicons name="md-star-sharp" size={22} color="grey" />;
    }
    stars.push(path);
  }
  return <View style={{ flexDirection: "row" }}>{stars}</View>;
}
