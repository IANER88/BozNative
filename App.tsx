/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import {
  StatusBar,
} from "react-native";
import { Provider } from "react-redux"
import { legacy_createStore } from "redux"
import Store from "./static/ts/store"
import TabStack, { PagesStack } from "./router/main"
import { NavigationContainer } from "@react-navigation/native";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack"

const store = legacy_createStore(Store)
export default function App(): JSX.Element {
  const Stack = createStackNavigator()
  return (
    <Provider store={store}>
      <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}>
          <Stack.Screen name="tab" component={TabStack} />
          {
            PagesStack.map(item => <Stack.Screen name={item.name} component={item.element} key={item.name} />)
          }
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
