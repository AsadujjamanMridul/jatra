import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
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
  Divider,
  Center,
  ScrollView,
} from "native-base";
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";

import { colors } from "../theme/colors";
import { routeList } from "../data/route-list";
import { busList } from "../data/bus-list";
import { Entypo } from "@expo/vector-icons";

export default function BusRoute({ navigation, route }) {
  const data = route.params.data;
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

      <ScrollView>
        <VStack
          space={4}
          alignItems="center"
          style={{ paddingTop: 5, paddingBottom: 20 }}
        >
          <Center p={5} bg="blueGray.200" w="80" rounded="md" shadow="1">
            <Text bold fontSize="xl" color="gray.800">
              {data.busName}
            </Text>
          </Center>
          <VStack
            space={4}
            w="80"
            bg={colors.white}
            rounded="md"
            shadow={3}
            style={styles.srcDestContainer}
          >
            <HStack space={3} alignItems="center">
              <Ionicons name="bus-outline" size={20} color={colors.darkGrey} />
              <Text bold fontSize="md" style={{ color: colors.darkGrey }}>
                {data.source}
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
                {data.destination}
              </Text>
            </HStack>
          </VStack>

          {/* ROUTE LIST */}
          <VStack
            space={2}
            bg="blueGray.50"
            flex="1"
            w="80"
            p="3"
            rounded="md"
            shadow="2"
          >
            {data.route.map((item, index) => (
              <HStack key={index} alignItems="center" space={2}>
                {index == 0 ? (
                  <>
                    <MaterialCommunityIcons
                      name="source-commit-start"
                      size={26}
                      color={colors.green}
                    />
                    <Text bold fontSize="md" key={item}>
                      {item}
                    </Text>
                  </>
                ) : index != data.route.length - 1 ? (
                  <>
                    <MaterialCommunityIcons
                      name="source-commit-local"
                      size={26}
                      color={colors.grey}
                    />
                    <Text fontSize="md" key={item}>
                      {item}
                    </Text>
                  </>
                ) : (
                  <>
                    <MaterialCommunityIcons
                      name="source-commit-end"
                      size={26}
                      color={colors.red}
                    />
                    <Text bold fontSize="md" key={item}>
                      {item}
                    </Text>
                  </>
                )}
              </HStack>
            ))}
          </VStack>
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
  srcDestContainer: {
    padding: 12,
    borderColor: colors.darkGrey,
    borderWidth: 1.5,
  },
  backIconContainer: {
    paddingTop: StatusBar.currentHeight,
  },
  backIcon: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  busContainer: {
    borderColor: colors.darkGrey,
    borderWidth: 1.2,
  },
  list: {
    flex: 1,
    marginTop: 50,
  },
});
