import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect } from "react";
import {
  Text,
  Box,
  Image,
  Pressable,
  VStack,
  HStack,
  Button,
  Center,
  TextArea,
  FormControl,
  Input,
  Divider,
  Switch,
} from "native-base";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { StatusBar } from "react-native";
import { colors } from "../theme/colors";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";

import { onAuthStateChanged, signOut, deleteUser } from "firebase/auth";
import { auth } from "../../firebase.config";

export default function Settings({ navigation, useNet, setUseNet }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authSubscription = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(false);
        setLoading(false);
      }
    });

    return authSubscription;
  }, []);

  if (loading) {
    return (
      <Center flex="1">
        <ActivityIndicator color="black" size="small" />
      </Center>
    );
  }

  const handleSignOut = () => {
    try {
      signOut(auth);
      showMessage({
        message: "Signed out successfully!",
        type: "success",
        color: "white",
        backgroundColor: "#10b981",
        textStyle: { fontWeight: "bold" },
        icon: (props) => (
          <Feather name="check" size={16} color="white" {...props} />
        ),
      });
      navigation.navigate("Home");
    } catch (err) {
      showMessage({
        message: { err },
        type: "danger",
        color: "white",
        backgroundColor: "#f43f5e",
        textStyle: { fontWeight: "bold" },
        icon: (props) => (
          <Feather name="check" size={16} color="white" {...props} />
        ),
      });
    }
  };

  const handleDeleteUser = () => {
    deleteUser(user)
      .then(() => {
        // User deleted.
        showMessage({
          message: "User deleted successfully!",
          type: "success",
          color: "white",
          backgroundColor: "#10b981",
          textStyle: { fontWeight: "bold" },
          icon: (props) => (
            <Feather name="check" size={16} color="white" {...props} />
          ),
        });
      })
      .catch((error) => {
        // An error ocurred
        showMessage({
          message: { err },
          type: "danger",
          color: "white",
          backgroundColor: "#f43f5e",
          textStyle: { fontWeight: "bold" },
          icon: (props) => (
            <Feather name="check" size={16} color="white" {...props} />
          ),
        });
      });
  };

  const handleUseNetToggle = () => {
    setUseNet(!useNet);
  };

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

      {user ? (
        <>
          <VStack alignItems="center" space="3">
            <Box
              w="80"
              borderColor={colors.darkGrey}
              borderWidth="1.5"
              rounded="md"
              shadow="3"
              bg="info.50"
              pt="1"
            >
              <HStack space="1">
                <Box p="4">
                  <Feather name="user" size={22} color="black" />
                </Box>

                <VStack justifyContent="center">
                  <Text fontSize={"xs"}>You're signed as</Text>
                  <Text bold fontSize={"md"}>
                    {user.email}
                  </Text>
                </VStack>
              </HStack>

              <VStack alignItems="center">
                <Divider my="2" w="90%" />
              </VStack>

              <HStack>
                <Box p="4">
                  <Feather name="shield" size={22} color="black" />
                </Box>

                <VStack justifyContent="center">
                  <Text fontSize={"xs"}>UID</Text>
                  <Text fontSize={"sm"} color="emerald.600">
                    {user.uid}
                  </Text>
                </VStack>
              </HStack>

              <VStack alignItems="center">
                <Divider my="2" w="90%" />
              </VStack>

              <HStack>
                <HStack
                  flex="1"
                  justifyContent="center"
                  alignItems="center"
                  pb="4"
                  pt="2"
                  space="3"
                  px="3"
                >
                  <Button
                    flex="1"
                    variant="subtle"
                    colorScheme="rose"
                    py="2.5"
                    onPress={() => handleDeleteUser()}
                  >
                    <Text bold color="coolGray.800">
                      Delete Account
                    </Text>
                  </Button>

                  <Button
                    flex="1"
                    variant="subtle"
                    colorScheme="darkBlue"
                    py="2.5"
                    onPress={() => handleSignOut()}
                  >
                    <Text bold color="coolGray.800">
                      Sign Out
                    </Text>
                  </Button>
                </HStack>
              </HStack>
            </Box>
          </VStack>
          <VStack alignItems="center">
            <Divider mt="8" mb="4" w="80" />
          </VStack>
        </>
      ) : (
        <></>
      )}

      <VStack>
        <Center mb="5">
          <HStack w="80" alignItems="center" justifyContent="space-between" px="1">
            <HStack alignItems="center" space="3">
              {useNet ? (
                <Feather name="cloud" size={20} color="#059669" />
              ) : (
                <Feather name="cloud-off" size={20} color="#e11d48" />
              )}
              <Text>Use internet connection to fetch data</Text>
            </HStack>
            <Switch
              offTrackColor="blueGray.200"
              onTrackColor="blueGray.400"
              offThumbColor="blueGray.800"
              onThumbColor="blueGray.800"
              size="sm"
              isChecked={useNet}
              onToggle={() => handleUseNetToggle()}
            />
          </HStack>
        </Center>
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
          >
            <MaterialIcons name="error-outline" size={18} color="#fb923c" />
            <VStack flex={1}>
              <Text>
                If you want to fetch data with the internet connection turned
                off, then inconsistency may be seen.{" "}
              </Text>
              <Text bold fontWeight="semibold" color="orange.900" mt="1">
                Offline data may not be up to date with the latest notices and
                fares!
              </Text>
            </VStack>
          </HStack>
        </Center>
      </VStack>
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
  routeDetailsButton: {
    height: 45,
  },
  routeDetailsButton: {
    height: 45,
  },
  homeInputField: {
    height: 45,
  },
  homeSearchButton: {
    marginTop: 30,
    backgroundColor: colors.darkGrey,
    // color: colors.white,
    height: 45,
  },
});
