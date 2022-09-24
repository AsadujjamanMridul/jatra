import { StyleSheet, View, SafeAreaView, StatusBar, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { colors } from "../theme/colors";
import {
  Text,
  Box,
  Image,
  Pressable,
  VStack,
  HStack,
  Button,
  FormControl,
  Input,
  Center,
  useToast,
} from "native-base";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import logo from "../../assets/logo.png";

// Firebase Config
import { firebaseConfig, app, auth } from "../../firebase.config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { showMessage } from "react-native-flash-message";
import { ScrollView } from "react-native";

export default function SignIn({ route, navigation }) {
  const state = route.params.state;

  const toast = useToast();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const createUser = async () => {
    setSubmitting(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        showMessage({
          message: "User has been created",
          type: "error",
          color: "white",
          backgroundColor: "#10b981",
          textStyle: { fontWeight: "bold" },
          icon: (props) => (
            <Feather name="check" size={16} color="white" {...props} />
          ),
        });
        setSubmitting(false);
        navigation.navigate("Feedback");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        showMessage({
          message: errorMessage,
          type: "error",
          color: "white",
          backgroundColor: "#e11d48",
          textStyle: { fontWeight: "bold" },
          icon: (props) => (
            <MaterialIcons name="error" size={17} color="white" {...props} />
          ),
        });
        setSubmitting(false);
      });
  };

  const signInUser = async () => {
    setSubmitting(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        showMessage({
          message: "Logged In",
          type: "error",
          color: "white",
          backgroundColor: "#10b981",
          textStyle: { fontWeight: "bold" },
          icon: (props) => (
            <Feather name="check" size={16} color="white" {...props} />
          ),
        });
        setSubmitting(false);
        navigation.navigate("Home");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        showMessage({
          message: errorMessage,
          type: "error",
          color: "white",
          backgroundColor: "#e11d48",
          textStyle: { fontWeight: "bold" },
          icon: (props) => (
            <MaterialIcons name="error" size={17} color="white" {...props} />
          ),
        });
        setSubmitting(false);
      });
  };

  const handleSignIn = () => {
    email && password
      ? state === "create"
        ? createUser()
        : signInUser()
      : !email
      ? showMessage({
          message: "Enter Email",
          type: "error",
          color: "white",
          backgroundColor: "#e11d48",
          textStyle: { fontWeight: "bold" },
          icon: (props) => (
            <MaterialIcons name="error" size={17} color="white" {...props} />
          ),
        })
      : showMessage({
          message: "Enter Password",
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
      <ScrollView>
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

        <VStack
          alignItems="center"
          justifyContent="space-between"
          space="10"
          pt="6"
          pb="20"
        >
          <VStack alignItems={"center"} justifyContent="center">
            <Center w="80" h="8">
              <Image
                source={logo}
                alt={"Jatra"}
                style={{
                  resizeMode: "contain",
                  width: "35%",
                }}
              />
            </Center>
          </VStack>
        </VStack>

        <Center flex={1}>
          <VStack alignItems="center" flex="1" justifyContent="center">
            <Box alignItems="center">
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  autoCapitalize="none"
                  variant="filled"
                  placeholder="type your email address"
                  w="80%"
                  type="email"
                  style={styles.homeInputField}
                  onChangeText={(text) => setEmail(text)}
                />

                <FormControl.Label style={{ marginTop: 15 }}>
                  Password
                </FormControl.Label>
                <Input
                  autoCapitalize="none"
                  variant="filled"
                  placeholder="type your password"
                  w="80%"
                  type="password"
                  style={styles.homeInputField}
                  onChangeText={(text) => setPassword(text)}
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
                  disabled={submitting}
                  onPress={handleSignIn}
                >
                  {submitting ? (
                    <Center flex="1">
                      <ActivityIndicator color="white" size="small" />
                    </Center>
                  ) : (
                    <Text style={{ color: colors.white }}>
                      {state === "signIn"
                        ? "Log In"
                        : state == "create"
                        ? "Sign Up"
                        : "Go back"}
                    </Text>
                  )}
                </Button>
              </FormControl>
            </Box>
          </VStack>
        </Center>
      </ScrollView>
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
