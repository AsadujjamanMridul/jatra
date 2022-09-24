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
} from "native-base";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function NotSignedIn({ navigation }) {
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
      {/* <View>
        <forgotPassword/>
      </View> */}
      <VStack space={4} flex="1">
        <Box>
          <Image
            source={require("../../assets/illustrations/NotLoggedIn.png")}
            alt="Alternate Text"
            size="xl"
            w="full"
            h="300"
          />
        </Box>
        <HStack
          justifyContent="center"
          alignItems="center"
          bg="rose.600"
          p="3"
          mx="20"
          rounded="md"
        >
          <MaterialIcons name="error-outline" size={16} color="white" />
          <Text bold color="white" fontSize="sm" ml="2">
            Sorry, You're not logged in
          </Text>
        </HStack>
        <VStack
          space="2"
          alignItems="center"
          justifyContent="flex-end"
          flex="1"
          mb="5"
        >
          <Button
            w="80"
            size="sm"
            variant="subtle"
            colorScheme="blueGray"
            style={styles.routeDetailsButton}
            Label="See Route Details"
            color="dark.400"
            onPress={() => navigation.navigate("Sign In", {state: "signIn"})}
          >
            <Text bold color="blueGray.900">
              Login
            </Text>
          </Button>
          <Pressable onPress={()=>navigation.navigate("Sign In", {state: "create"})}>
            <Text fontSize="xs">
              Don't have an account?{" "}
              <Text bold color="teal.500">
                Sign Up
              </Text>
            </Text>
          </Pressable>
        </VStack>
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
});
