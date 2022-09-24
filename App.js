import React from "react";
import { Center, HStack, NativeBaseProvider, useColorMode } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";

// COMPONENTS
import Home from "./src/screens/Home";
import BusList from "./src/screens/BusList";
import Routes from "./src/screens/Routes";
import Feedback from "./src/screens/Feedback";
import Settings from "./src/screens/Settings";
import SearchResult from "./src/screens/SearchResult";
import RouteImage from "./src/screens/RouteImage";
import BusRoute from "./src/screens/BusRoute";
import NotSignedIn from "./src/screens/NotSignedIn";
import SignIn from "./src/screens/SignIn";

// THEMES & ICONS
import {
  FontAwesome5,
  Foundation,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { colors } from "./src/theme/colors";

// BOTTOM NAV --- SCREEN STACKS
const Tab = createBottomTabNavigator();
const SearchStack = createNativeStackNavigator();
const RouteStack = createNativeStackNavigator();
const BusStack = createNativeStackNavigator();
const FeedbackStack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyARbTzZV71VeVDfAZLekBgEr6n6b3FgUgw",
  authDomain: "jatra-39833.firebaseapp.com",
  projectId: "jatra-39833",
  storageBucket: "jatra-39833.appspot.com",
  messagingSenderId: "600625273486",
  appId: "1:600625273486:web:bcac6238d073458b4187df",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

import FlashMessage from "react-native-flash-message";
import SRListed from "./src/screens/SRListed";
import { StyleSheet } from "react-native";

console.disableYellowBox = true;

export default function App() {
  const [useNet, setUseNet] = useState(false);

  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: styles.bottomNavigator,
            tabBarActiveTintColor: colors["white"],
            tabBarInactiveTintColor: colors["darkGrey"],
            tabBarShowLabel: false,
          }}
        >
          <Tab.Screen
            name="Search"
            options={{
              headerShown: false,
              tabBarIconStyle: styles.tabBarIconStyle,
              tabBarIcon: (props) => (
                <Foundation name="home" size={24} color={props.color} />
              ),
            }}
          >
            {(props) => <SearchScreenStack {...props} useNet={useNet} />}
          </Tab.Screen>

          <Tab.Screen
            name="Bus"
            component={BusScreenStack}
            options={{
              headerShown: false,
              tabBarIconStyle: styles.tabBarIconStyle,
              tabBarIcon: (props) => (
                <FontAwesome5 name="bus" size={20} color={props.color} />
              ),
            }}
          />
          <Tab.Screen
            name="Route"
            component={RouteScreenStack}
            options={{
              headerShown: false,
              tabBarIconStyle: styles.tabBarIconStyle,
              tabBarIcon: (props) => (
                <FontAwesome5 name="route" size={20} color={props.color} />
              ),
            }}
          />
          <Tab.Screen
            name="FeedbackStack"
            component={FeedbackScreenStack}
            options={{
              headerShown: false,
              tabBarIconStyle: styles.tabBarIconStyle,
              tabBarIcon: (props) => (
                <MaterialIcons name="feedback" size={24} color={props.color} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            options={{
              headerShown: false,
              tabBarIconStyle: styles.tabBarIconStyle,
              tabBarIcon: (props) => (
                <Ionicons name="settings-sharp" size={22} color={props.color} />
              ),
            }}
          >
            {(props) => (
              <Settings {...props} useNet={useNet} setUseNet={setUseNet} />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </NativeBaseProvider>
      <FlashMessage position={"bottom"} style={{ marginBottom: 59 }} />
      <StatusBar style="dark" />
    </NavigationContainer>
  );
}

// Color Switch Component
function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === "light"}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}

function SearchScreenStack({ useNet }) {
  return (
    <SearchStack.Navigator screenOptions={{ headerShown: false }}>
      <SearchStack.Screen name="Home">
        {(props) => <Home {...props} useNet={useNet} />}
      </SearchStack.Screen>
      <SearchStack.Screen name="Search Result">
        {(props) => <SearchResult {...props} useNet={useNet} />}
      </SearchStack.Screen>
      <SearchStack.Screen name="SR Listed" component={SRListed} />
      <SearchStack.Screen name="Bus Route" component={BusRoute} />
      <SearchStack.Screen name="Route Image" component={RouteImage} />
    </SearchStack.Navigator>
  );
}

function RouteScreenStack() {
  return (
    <RouteStack.Navigator screenOptions={{ headerShown: false }}>
      <RouteStack.Screen name="Routes" component={Routes} />
      <RouteStack.Screen name="Route Image" component={RouteImage} />
    </RouteStack.Navigator>
  );
}

function BusScreenStack() {
  return (
    <BusStack.Navigator screenOptions={{ headerShown: false }}>
      <BusStack.Screen name="Bus List" component={BusList} />
      <BusStack.Screen name="Bus Route" component={BusRoute} />
    </BusStack.Navigator>
  );
}

function FeedbackScreenStack() {
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

  return (
    <FeedbackStack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <FeedbackStack.Screen name="Feedback" component={Feedback} />
        </>
      ) : (
        <>
          <FeedbackStack.Screen name="Not Signed In" component={NotSignedIn} />
          <FeedbackStack.Screen name="Sign In" component={SignIn} />
        </>
      )}
    </FeedbackStack.Navigator>
  );
}

const styles = StyleSheet.create({
  bottomNavigator: {
    backgroundColor: colors["black"],
    height: 60,
  },
  tabBarIconStyle: {
    justifyContent: "center",
  },
});
