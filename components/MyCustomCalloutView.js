import React from "react";
import { View, Text, Image } from "react-native";
import Stars from "../components/Stars";
import { Svg, Image as ImageSvg } from "react-native-svg";

export default function MyCustomCalloutView(props) {
  return (
    <View width={280}>
      <Svg width={300} height={140}>
        <ImageSvg
          width={"100%"}
          height={"100%"}
          preserveAspectRatio="xMidYMid slice"
          href={{ uri: props.photos[0].url }}
        />
      </Svg>
      <View style={{ width: 310 }}>
        <Text>{props.title}</Text>
        <Text numberOfLines={4} ellipsizeMode="tail">
          {props.description}
        </Text>
        <Stars ratingValue={props.ratingValue} />
        <Text>{props.reviews} Reviews</Text>
      </View>
    </View>
  );
}
