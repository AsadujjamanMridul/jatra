import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import {
  Pressable,
  Text,
  Stack,
  Input,
  Icon,
  VStack,
  Box,
  FlatList,
  HStack,
} from "native-base";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { routeList } from "../data/route-list";

export default function Routes({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [list, setList] = useState(routeList);
  const searchHandeler = (text) => {
    if (text !== "") {
      const filteredList = routeList.filter((item) => {
        const routeName = item.routeName.toLowerCase();
        const routeNumber = item.routeNumber.toLowerCase();
        const userTypedText = text.toLowerCase();

        return (
          routeName.indexOf(userTypedText) > -1 ||
          routeNumber.indexOf(userTypedText) > -1
        );
      });
      setList(filteredList);
    } else {
      setList(routeList);
    }
    setSearchText(text);
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

      {/* SEARCH FIELD */}
      <VStack
        space={4}
        alignItems="center"
        style={{ paddingTop: 5, paddingBottom: 20 }}
      >
        <Input
          variant="filled"
          bg="muted.100"
          w="80"
          InputLeftElement={
            <Icon
              as={<Feather name="search" />}
              size={5}
              ml="2"
              color="blueGray.500"
            />
          }
          placeholder="Search Route"
          onChangeText={(text) => searchHandeler(text)}
        />
      </VStack>

      {/* ROUTE LIST */}
      
      <Box flex={1}>
        <FlatList
          keyExtractor={(item, index) => index}
          data={list}
          // ItemSeparatorComponent={() => (
          //   // <Divider h={0} w={80} my={2} mx={"auto"} />
          // )}
          renderItem={({ item }) => {
            return (
              <Pressable onPress={() => navigation.navigate("Route Image", {routeNumber: item.routeNumber})}>
                {({ isHovered, isFocused, isPressed }) => {
                  return (
                    <Box
                      shadow={2}
                      rounded="md"
                      w="80"
                      bg={isPressed ? "blueGray.100" : "white" }
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
                      <HStack
                        flex={1}
                        space={4}
                        alignItems="center"
                        py="3"
                        px="3"
                      >
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
                          <Feather
                            name="chevron-right"
                            size={24}
                            color="black"
                          />
                        </HStack>
                      </HStack>
                    </Box>
                  );
                }}
              </Pressable>
            );
          }}
        />
      </Box>
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
  routeContainer: {
    borderColor: colors.darkGrey,
    borderWidth: 1.2,
  },
});
