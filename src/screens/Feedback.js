import { StyleSheet, View, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { colors } from "../theme/colors";
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
  ScrollView,
} from "native-base";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import logo from "../../assets/logo.png";
import { showMessage } from "react-native-flash-message";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ActivityIndicator } from "react-native";

export default function Feedback({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState(null);
  const [message, setMessage] = useState(null);

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

  const postMessage = async () => {
    setSubmitting(true);
    try {
      await addDoc(collection(db, "messages"), {
        title: title,
        message: message,
        email: user.email,
        uid: user.uid,
        date: new Date(),
      });
      setSubmitting(false);
      setTitle("");
      setMessage("");

      showMessage({
        message: "You feedback has been submitted",
        type: "error",
        color: "white",
        backgroundColor: "#10b981",
        textStyle: { fontWeight: "bold" },
        icon: (props) => (
          <Feather name="check" size={16} color="white" {...props} />
        ),
      });
    } catch (err) {
      showMessage({
        message: err,
        type: "error",
        color: "white",
        backgroundColor: "#e11d48",
        textStyle: { fontWeight: "bold" },
        icon: (props) => (
          <MaterialIcons name="error" size={17} color="white" {...props} />
        ),
      });
      setSubmitting(false);
    }
  };

  const handleFeedback = () => {
    title && message
      ? postMessage()
      : !title
      ? showMessage({
          message: "Please enter feedback's title!",
          type: "error",
          color: "white",
          backgroundColor: "#e11d48",
          textStyle: { fontWeight: "bold" },
          icon: (props) => (
            <MaterialIcons name="error" size={17} color="white" {...props} />
          ),
        })
      : showMessage({
          message: "Please enter your message!",
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

        <VStack alignItems="center" justifyContent="space-between" space="10">
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

          <Center flex={1}>
            <VStack alignItems="center" flex="1" justifyContent="center">
              <Box alignItems="center">
                <FormControl>
                  <FormControl.Label>Title</FormControl.Label>
                  <Input
                    autoCapitalize="none"
                    variant="filled"
                    placeholder="Type feedback's title"
                    w="80%"
                    type="email"
                    style={styles.homeInputField}
                    onChangeText={(text) => setTitle(text)}
                    value={title}
                  />

                  <FormControl.Label style={{ marginTop: 15 }}>
                    Feedback
                  </FormControl.Label>
                  <TextArea
                    autoCapitalize="none"
                    variant="filled"
                    placeholder="Give your feedback"
                    w="80%"
                    h={90}
                    type="password"
                    value={message}
                    // style={styles.homeInputField}
                    onChangeText={(text) => setMessage(text)}
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
                    onPress={handleFeedback}
                    disabled={submitting}
                  >
                    {/* <Text style={{ color: colors.white }}>
                      {submitting ? "Loading" : "Submit"}
                    </Text> */}
                    {submitting ? (
                      <Center flex="1">
                        <ActivityIndicator color="white" size="small" />
                      </Center>
                    ) : (
                      <Text style={{ color: colors.white }}>
                        {submitting ? "Loading" : "Submit"}
                      </Text>
                    )}
                  </Button>
                </FormControl>
              </Box>
            </VStack>
          </Center>

          <Center>
            <HStack
              w="80"
              borderColor="info.400"
              borderWidth=".75"
              rounded="md"
              bg="info.50"
              alignItems="center"
              space="2"
              p="2"
              mb="2"
            >
              <Feather name="info" size={17} color="#0284c7" />
              <VStack flex={1}>
                <Text fontSize="xs">
                  Feel free to give any feedback regarding our app
                </Text>
              </VStack>
            </HStack>
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
                <Text
                  bold
                  fontSize="xs"
                  fontWeight="semibold"
                  color="orange.900"
                >
                  Please add "Add Fare: Source - Destination" to the title for
                  new fare suggestions!
                </Text>
              </VStack>
            </HStack>
          </Center>
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
    // backgroundColor: colors.darkGrey,
    // color: colors.white,
    height: 45,
  },
});
