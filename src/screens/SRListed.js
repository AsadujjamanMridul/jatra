import { StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { colors } from "../theme/colors";
import { StatusBar } from "react-native";
import {
  Box,
  Center,
  Divider,
  FlatList,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";

// ICONS
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

export default function SRListed({ navigation, route }) {
  const list = route.params.list;
  const source = route.params.source;
  const destination = route.params.destination;
  const bus = route.params.bus;

  const handleFlatList = bus ? (
    <FlatList
      keyExtractor={(item, index) => index}
      data={list}
      renderItem={({ item }) => {
        return (
          <Pressable
            onPress={() => navigation.navigate("Bus Route", { data: item })}
          >
            {({ isHovered, isFocused, isPressed }) => {
              return (
                <Box
                  key={item.name}
                  shadow={2}
                  rounded="md"
                  w="80"
                  bg={isPressed ? "blueGray.100" : "white"}
                  mx="auto"
                  mt={1.5}
                  mb={2}
                  style={[
                    styles.busContainer,
                    {
                      transform: [
                        {
                          scale: isPressed ? 0.96 : 1,
                        },
                      ],
                    },
                  ]}
                >
                  <HStack flex={1} space={4} alignItems="center" py="3" px="3">
                    <Ionicons name="bus" size={20} color={colors.darkGrey} />
                    <HStack
                      flex={1}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <VStack space={1}>
                        <Text
                          bold
                          fontSize="md"
                          style={{ color: colors.darkGrey }}
                        >
                          {item.busName}
                        </Text>
                        <Text color={colors.grey}>
                          {item.source} - {item.destination}
                        </Text>
                      </VStack>
                      <Feather name="chevron-right" size={24} color="black" />
                    </HStack>
                  </HStack>
                </Box>
              );
            }}
          </Pressable>
        );
      }}
    />
  ) : (
    <FlatList
      keyExtractor={(item, index) => index}
      data={list}
      // ItemSeparatorComponent={() => (
      //   // <Divider h={0} w={80} my={2} mx={"auto"} />
      // )}
      renderItem={({ item }) => {
        return (
          <Pressable
            onPress={() =>
              navigation.navigate("Route Image", {
                routeNumber: item.routeNumber,
              })
            }
          >
            {({ isHovered, isFocused, isPressed }) => {
              return (
                <Box
                  shadow={2}
                  rounded="md"
                  w="80"
                  bg={isPressed ? "blueGray.100" : "white"}
                  mx="auto"
                  mt={1.5}
                  mb={2}
                  style={[
                    styles.routeContainer,
                    {
                      transform: [
                        {
                          scale: isPressed ? 0.96 : 1,
                        },
                      ],
                    },
                  ]}
                >
                  <HStack flex={1} space={4} alignItems="center" py="3" px="3">
                    <MaterialCommunityIcons
                      name="map-marker-distance"
                      size={20}
                      color={colors.darkGrey}
                    />
                    <HStack
                      flex={1}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <VStack space={1}>
                        <Text color={colors.grey}>{item.routeNumber}</Text>
                        <Text
                          bold
                          fontSize="md"
                          style={{ color: colors.darkGrey }}
                        >
                          {item.routeName}
                        </Text>
                      </VStack>
                      <Feather name="chevron-right" size={24} color="black" />
                    </HStack>
                  </HStack>
                </Box>
              );
            }}
          </Pressable>
        );
      }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Box shadow={2}>
        <Pressable
          style={styles.backIconContainer}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons
            name="md-arrow-back-outline"
            size={24}
            color={colors.darkGrey}
            style={styles.backIcon}
          />
        </Pressable>
      </Box>

      <VStack
        space={4}
        alignItems="center"
        style={{ paddingTop: 5, paddingBottom: 20 }}
      >
        <VStack
          space={4}
          w="80"
          bg="info.50"
          rounded="md"
          shadow={3}
          style={styles.srcDestContainer}
        >
          <HStack space={3} alignItems="center">
            <Ionicons name="bus-outline" size={20} color={colors.darkGrey} />
            <Text bold fontSize="md" style={{ color: colors.darkGrey }}>
              {source}
            </Text>
          </HStack>
          <Divider my={0.8} />
          <HStack space={3} alignItems="center">
            <Ionicons
              name="md-location-outline"
              size={20}
              color={colors.darkGrey}
            />
            <Text bold fontSize="md" style={{ color: colors.darkGrey }}>
              {destination}
            </Text>
          </HStack>
        </VStack>
      </VStack>

      {handleFlatList}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors["white"],
  },
  backIconContainer: {
    paddingTop: StatusBar.currentHeight,
  },
  backIcon: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  busContainer: {
    // borderColor: colors.darkGrey,
    // borderWidth: 1.2,
  },
  srcDestContainer: {
    padding: 12,
    borderColor: colors.darkGrey,
    borderWidth: 1.5,
  },
  fareContainer: {
    padding: 12,
  },
});
