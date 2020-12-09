import React from "react";
import { Image, View, TouchableOpacity, StyleSheet } from "react-native";
import MapView from "react-native-maps";

import ENV from "../env";

const MapPreview = (props) => {
  let imagePreviewUrl;

  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${ENV.googleApiKey}`;
  }

  /* 
    I can't use billing for the google api.
    So I made it optional, and have a native map instead.
    Switching between the two should be seamless if I ever get the money.
  */
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ ...styles.mapPreview, ...props.style }}
    >
      {props.location ? (
        props.useStaticMap ? (
          <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
        ) : (
          <MapView
            scrollEnabled={false}
            region={{
              latitude: props.location.lat,
              longitude: props.location.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={styles.mapImage}
          />
        )
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});

export default MapPreview;
