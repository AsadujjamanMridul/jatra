import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Pressable,
  View,
} from "react-native";
import {
  Text,
  Center,
  HStack,
  ScrollView,
  VStack,
  Divider,
  Button,
  Box,
} from "native-base";

// ICONS
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

// THEMES
import { colors } from "../theme/colors";
import { useEffect } from "react";
import { useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase.config";
import { ActivityIndicator } from "react-native";
import allRoutes from "../data/allRoutes";
import { busList } from "../data/bus-list";
import { async } from "@firebase/util";

export default function SearchResult({ navigation, route, useNet }) {
  const data = route.params.data;
  const { source, destination } = data;

  const searchBus = busList.filter((item) => {
    return (
      item.route.find((i) => {
        return i.toLowerCase().includes(source?.toLowerCase());
      }) &&
      item.route.find((i) => {
        return i.toLowerCase().includes(destination?.toLowerCase());
      })
    );
  });

  const [buses, setBuses] = useState(searchBus);

  const [result, setResult] = useState(null);
  const [searching, setSearching] = useState(true);

  const searchRoute = allRoutes.filter((item) => {
    return (
      (item.source.toLowerCase() === source?.toLowerCase() &&
        item.destination.toLowerCase() === destination?.toLowerCase()) ||
      (item.source.toLowerCase() === destination?.toLowerCase() &&
        item.destination.toLowerCase() === source?.toLowerCase())
    );
  });

  useEffect(() => {
    if (useNet && result === null) {
      setSearching(true);
      const q = query(
        collection(db, "allRoutes"),
        where("source", "==", source.toLowerCase()),
        where("destination", "==", destination.toLowerCase())
      );

      const q2 = query(
        collection(db, "allRoutes"),
        where("destination", "==", source.toLowerCase()),
        where("source", "==", destination.toLowerCase())
      );

      const searchListener = onSnapshot(q, (querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
        });
        setResult(list);
        setSearching(false);
      });

      return searchListener;
    }

    if (!useNet && result === null) {
      setResult(searchRoute);
    }
  }, []);

  if (result === null) {
    return (
      <Center flex="1">
        <ActivityIndicator color="black" size="small" />
      </Center>
    );
  }

  const handleRouteDetails = (routeNumber) => {
    navigation.navigate("Route Image", { routeNumber: routeNumber });
  };

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
      <ScrollView>
        <VStack
          space={3}
          alignItems="center"
          style={{ paddingTop: 5, paddingBottom: 20 }}
        >
          {/* SOURCE - DESTINATION SECTION */}
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

            <Box>
              <HStack
                flex="1"
                justifyContent="center"
                alignItems="center"
                pt="2"
                space="3"
                // px="3"
              >
                <Button
                  flex="1"
                  variant="subtle"
                  colorScheme="teal"
                  py="2.5"
                  onPress={() =>
                    navigation.navigate("SR Listed", {
                      list: buses,
                      source: source,
                      destination: destination,
                      bus: true,
                    })
                  }
                >
                  <HStack alignItems="center" justifyContent="center">
                    <Text bold color="coolGray.800" mr="2">
                      {buses?.length} Bus
                    </Text>
                    <Feather
                      bold
                      name="chevron-right"
                      size={16}
                      color="#374151"
                    />
                  </HStack>
                </Button>

                <Button
                  flex="1"
                  variant="subtle"
                  colorScheme="info"
                  py="2.5"
                  onPress={() =>
                    navigation.navigate("SR Listed", {
                      // list: data.routes,
                      list: result,
                      source: source,
                      destination: destination,
                      bus: false,
                    })
                  }
                >
                  <HStack alignItems="center" justifyContent="center">
                    <Text bold color="coolGray.800" mr="2">
                      {/* {data.routes.length} Route */}
                      {result.length} Route
                    </Text>
                    <Feather
                      bold
                      name="chevron-right"
                      size={16}
                      color="#374151"
                    />
                  </HStack>
                </Button>
              </HStack>
            </Box>
          </VStack>

          {/* FARE RESULT SECITON */}
          {/* {data.routes.length > 0 ? ( */}
          {result?.length > 0 ? (
            <VStack w="80" space={2}>
              <HStack
                p="5"
                space={2}
                rounded="md"
                shadow="2"
                mt="3"
                justifyContent="center"
                alignItems="center"
                bg="teal.400"
              >
                <Text bold fontSize="md" color="black">
                  {/* {data.routes.length} Route(s) Found */}
                  {result.length} Route(s) Found
                </Text>
              </HStack>
            </VStack>
          ) : (
            <VStack
              w="80"
              p="5"
              flex={1}
              space={4}
              rounded="md"
              shadow="3"
              mt="3"
              justifyContent="center"
              alignItems="center"
              bg="rose.500"
            >
              <Text bold fontSize="md" color="white">
                No Routes Found
              </Text>
            </VStack>
          )}

          {/* {data.routes.map((item) => { */}
          {result ? (
            result?.map((item) => {
              return (
                <VStack
                  key={item.routeNumber}
                  w="80"
                  p="5"
                  flex={1}
                  space={4}
                  rounded="md"
                  shadow="3"
                  mt="3"
                  justifyContent="center"
                  alignItems="center"
                  bg="coolGray.50"
                  borderColor={colors.darkGrey}
                  borderWidth="1.5"
                >
                  <HStack
                    flex={1}
                    alignItems="center"
                    space={4}
                    w="full"
                    bg={colors.darkGrey}
                    rounded="md"
                    shadow={3}
                    style={styles.fareContainer}
                  >
                    <MaterialCommunityIcons
                      name="ticket-confirmation-outline"
                      size={24}
                      color={colors.grey}
                    />
                    <Center flex={1} flexDir="row">
                      <Text fontSize="6xl" color="white">
                        {item.fare}
                      </Text>
                      <Text fontSize="2xl" color={colors.grey}>
                        {" "}
                        ৳
                      </Text>
                    </Center>
                  </HStack>

                  {/* STUDENT FARE AVAILIBILITY */}

                  {item.studentFare == "true" || item.studentFare == true ? (
                    <Text bold fontSize={"sm"} color="emerald.500">
                      *Student Fare Available
                    </Text>
                  ) : (
                    <Text bold fontSize={"sm"} color="rose.500">
                      *Student Fare Not Available
                    </Text>
                  )}

                  {/* Route Details */}

                  <VStack
                    w="full"
                    space={4}
                    flex={1}
                    bg={colors.white}
                    rounded="md"
                    shadow={3}
                    style={styles.srcDestContainer}
                  >
                    <HStack space={3} alignItems="center">
                      <MaterialCommunityIcons
                        name="map-marker-distance"
                        size={20}
                        color={colors.darkGrey}
                      />
                      <VStack space={1}>
                        <Text fontSize="xs" color={colors.grey}>
                          Distance
                        </Text>
                        <Text
                          bold
                          fontSize="md"
                          style={{ color: colors.darkGrey }}
                        >
                          {item.distance} Km
                        </Text>
                      </VStack>
                    </HStack>
                    <Divider my={0.8} />
                    <HStack space={3} alignItems="center">
                      <MaterialCommunityIcons
                        name="routes"
                        size={20}
                        color={colors.darkGrey}
                      />
                      <VStack space={1}>
                        <Text fontSize="xs" color={colors.grey}>
                          Route Name
                        </Text>
                        <Text
                          bold
                          fontSize="md"
                          style={{ color: colors.darkGrey }}
                        >
                          {item.routeName}
                        </Text>
                      </VStack>
                    </HStack>
                    <Divider my={0.8} />
                    <HStack space={3} alignItems="center">
                      <MaterialCommunityIcons
                        name="road-variant"
                        size={20}
                        color={colors.darkGrey}
                      />
                      <VStack space={1}>
                        <Text fontSize="xs" color={colors.grey}>
                          Route Number
                        </Text>
                        <Text
                          bold
                          fontSize="md"
                          style={{ color: colors.darkGrey }}
                        >
                          {item.routeNumber}
                        </Text>
                      </VStack>
                    </HStack>
                  </VStack>

                  <Button
                    w="full"
                    size="sm"
                    variant="subtle"
                    colorScheme="info"
                    style={styles.routeDetailsButton}
                    Label="See Route Details"
                    onPress={() => handleRouteDetails(item.routeNumber)}
                  >
                    <Text bold color="blueGray.900">
                      See Route Details
                    </Text>
                  </Button>
                </VStack>
              );
            })
          ) : (
            <Center flex="1" py="auto">
              <ActivityIndicator color="black" size="small" />
            </Center>
          )}
        </VStack>
      </ScrollView>
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
    // borderColor: "#cbd5e1",
    // borderWidth: 1,
  },
  backIconContainer: {
    paddingTop: StatusBar.currentHeight,
  },
  backIcon: {
    paddingVertical: 10,
    paddingHorizontal: 15,
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
