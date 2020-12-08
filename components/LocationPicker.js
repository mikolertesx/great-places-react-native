import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Colors from "../constants/Colors";
import MapPreview from "./MapPreview";

const noPermissionAlert = () => {
  Alert.alert(
    "Insufficient permissions!",
    "You need to grant location permissions to use this app.",
    [{ text: "Okay" }]
  );
};
const LocationPicker = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();
  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      noPermissionAlert();
      return;
    }
    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeimeout: 5000,
      });
      console.log(location);
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        "Could not fetch location!",
        "Please try again later or pick a location ont he map.",
        [{ text: "Okay" }]
      );
    }
    setIsFetching(false);
  };

  const verifyPermissions = async () => {
    let result;
    result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      noPermissionAlert();
      return false;
    }
    return true;
  };
  return (
    <View style={styles.locationPicker}>
      <MapPreview style={styles.mapPreview} location={pickedLocation}>
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}
      </MapPreview>
      <Button
        title="Get user location"
        color={Colors.primary}
        onPress={getLocationHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});

export default LocationPicker;
