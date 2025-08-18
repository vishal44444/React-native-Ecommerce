import React, { useState, useEffect,useContext, } from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider,AuthContext } from './AuthContext';
import SignupScreen from './Screen/Signup';
import LoginScreen from './Screen/login';
import HomeScreen from './home';
import {ActivityIndicator,View} from 'react-native'
const Stack = createNativeStackNavigator();

export function AppNavigator() {



  const { IsLoggedIn, loading } = useContext(AuthContext);
   if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }




  function Authstack(){
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />

      

    </Stack.Navigator>
    )
  }
  function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

  return (

    <NavigationContainer>
      {IsLoggedIn ? <HomeStack /> : <Authstack/>}
    </NavigationContainer>
  );
   
}
export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}



