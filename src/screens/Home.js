import { StyleSheet, View, SafeAreaView, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../theme/colors";
import {
  Text,
  Input,
  Box,
  FormControl,
  Button,
  HStack,
  WarningOutlineIcon,
  Image,
  Center,
  VStack,
  ScrollView,
} from "native-base";
import { useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";
import logo from "../../assets/logo.png";
import { collection, onSnapshot, query, where } from "firebase/firestore";

// ALL ROUTE LIST
import allRoutes from "../data/allRoutes";

// ALL BUS LIST
import { busList } from "../data/bus-list";
import { db } from "../../firebase.config";
import { async } from "@firebase/util";

export default function Home({ useNet }) {
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const [result, setResult] = useState([]);
  const toast = useToast();
  const [buses, setBuses] = useState([]);

  const navigation = useNavigation();

  const searchRoute = allRoutes.filter((item) => {
    return (
      (item.source.toLowerCase() === source?.toLowerCase() &&
        item.destination.toLowerCase() === destination?.toLowerCase()) ||
      (item.source.toLowerCase() === destination?.toLowerCase() &&
        item.destination.toLowerCase() === source?.toLowerCase())
    );
  });

  const searchBus = busList.filter((item) => {
    return item.route.find((i) => {
      return i
        .toLowerCase()
        .includes(source?.toLowerCase(), destination?.toLowerCase());
    });
  });

  const handleSearch = () => {
    setBuses(searchBus);

    const data = {
      source: source,
      destination: destination,
      // routes: searchRoute,
      // buses: buses,
    };

    source && destination
      ? navigation.navigate("Search Result", { data: data })
      : !source
      ? showMessage({
          message: "Enter source station!",
          type: "error",
          color: "white",
          backgroundColor: "#e11d48",
          textStyle: { fontWeight: "bold" },
          icon: (props) => (
            <MaterialIcons name="error" size={17} color="white" {...props} />
          ),
        })
      : showMessage({
          message: "Enter destination station!",
          type: "error",
          color: "white",
          backgroundColor: "#e11d48",
          textStyle: { fontWeight: "bold" },
          icon: (props) => (
            <MaterialIcons name="error" size={17} color="white" {...props} />
          ),
        });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Box alignItems="center">
        <Center w="80" h="8" mb="10">
          <Image
            source={logo}
            alt={"Jatra"}
            style={{
              resizeMode: "contain",
              width: "35%",
            }}
          />
        </Center>

        <FormControl>
          <FormControl.Label>Source</FormControl.Label>
          <Input
            variant="filled"
            placeholder="Source station"
            w="80%"
            style={styles.homeInputField}
            onChangeText={(text) => setSource(text)}
          />

          <FormControl.Label style={{ marginTop: 15 }}>
            Destination
          </FormControl.Label>
          <Input
            variant="filled"
            placeholder="Destination station"
            w="80%"
            style={styles.homeInputField}
            onChangeText={(text) => setDestination(text)}
          />

          <Button
            size="sm"
            variant="solid"
            colorScheme="blueGray"
            bg={colors.darkGrey}
            _pressed={{
              backgroundColor: "#334155",
              transform: [
                {
                  scale: 0.96,
                },
              ],
            }}
            style={styles.homeSearchButton}
            onPress={() => handleSearch()}
          >
            <Text style={{ color: colors.white }}>Search</Text>
          </Button>
        </FormControl>
        <Center>
          <HStack
            w="80"
            borderColor="orange.400"
            borderWidth=".75"
            rounded="md"
            bg="orange.50"
            alignItems="center"
            space="2"
            p="2"
            mt="10"
          >
            <MaterialIcons name="error-outline" size={18} color="#fb923c" />
            <VStack flex={1}>
              <Text fontSize="xs" color="muted.600">
                1. The chart has been prepared by calculating the minimum fare
                of Rs.10.00. Therefore, rent cannot be claimed by adding any
                amount to the above rent.
              </Text>
              <Text bold fontSize="xs" color="muted.700" mt="2">
                2. Latest Information Update: 11 August 2022 (as per BRTA
                Notification 7 August 2022)
              </Text>
            </VStack>
          </HStack>
        </Center>
      </Box>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors["white"],
    paddingTop: StatusBar.currentHeight,
  },
  homeInputField: {
    height: 45,
  },
  homeSearchButton: {
    marginTop: 30,
    // backgroundColor: colors.darkGrey,
    // color: colors.white,
    height: 45,
  },
});
