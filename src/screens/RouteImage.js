import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Box, Center, Image, Pressable } from "native-base";
import routeStaticImage from "../constants/routeImages";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import { colors } from "../theme/colors";
// ICONS
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function RouteImage({ navigation, route, routeNumber }) {
  const data = route.params.routeNumber;
  const img = routeStaticImage[data];
  return (
    <SafeAreaView style={styles.container}>
      <Box shadow={2}>
        <Pressable
          style={styles.backIconContainer}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="md-arrow-back-outline"
            size={24}
            color={colors.darkGrey}
            style={styles.backIcon}
          />
        </Pressable>
      </Box>
      <Box flex={1} w="full">
        <ReactNativeZoomableView
          maxZoom={15}
          minZoom={1}
          zoomStep={0.5}
          initialZoom={1}
          bindToBorders={true}
          // onZoomAfter={this.logOutZoomState}
          style={{
            padding: 10,
          }}
        >
          <Image source={img} alt="Alternate Text" size="2xl" w="full" />
        </ReactNativeZoomableView>
      </Box>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors["white"],
  },
  routeDetailsButton: {
    height: 45,
  },
  backIconContainer: {
    paddingTop: StatusBar.currentHeight,
  },
  backIcon: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
