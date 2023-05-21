/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from "react";
import type { PropsWithChildren } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
  Dimensions,
  Animated,
  TouchableOpacity
} from "react-native";

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";
import { Provider, useSelector } from "react-redux"
import { createStore } from "redux"
import Store from "./static/ts/store"
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./components/Home"
import Tutorial from "./components/Tutorial"
import Inn from "./components/Inn"
import Chat from "./components/Chat"
import Me from "./components/Me"
import { SvgXml } from "react-native-svg"
import icon from "./static/ts/icon"
import color from "./static/ts/color"
const Tab = createBottomTabNavigator();
type SectionProps = PropsWithChildren<{
  title: string;
}>;

const store = createStore(Store)
export default function App(): JSX.Element {
  const win = Dimensions.get("window")
  interface Nav {
    name: string,
    icon?: string,
    value?: any,
    width?: number,
    gap?: number,
    title: string,
    element: Function
  }
  let nav: Array<Nav> = [
    {
      name: "首页",
      title: "home",
      element: Home
    },
    {
      name: "课程",
      title: "tutorial",
      element: Tutorial
    },
    {
      name: "客栈",
      title: "bozhan",
      element: Inn
    },
    {
      name: "消息",
      title: "chat",
      element: Chat
    },
    {
      name: "我的",
      title: "my",
      element: Me
    },
  ]
  const [name, setName] = useState("首页")
  return (
    <Provider store={store}>
      <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
      <NavigationContainer>
        <Tab.Navigator initialRouteName="首页" labeled={false} activeColor="#409eff"
          barStyle={{backgroundColor:"#fff", height: 70}}
          tabBarColor="#409eff"
          screenOptions={({ route }: any) => {
            const { theme }: any = useSelector(state => state)
            const navigation = useNavigation();
            return {
              tabBarShowLabel: false,
              tabBarHideOnKeyboard: true,
              tabBarIcon: () => {
                const value = new Animated.Value(1)
                // 给图标激活
                const nav: any = icon.bottomNav
                if (route.name === name) {
                  nav[route.name] = nav[route.name].replace("fill=\"#bfbfbf\"", "fill=\"#409EFF\"")
                } else {
                  nav[route.name] = nav[route.name].replace("fill=\"#409EFF\"", "fill=\"#bfbfbf\"")
                }
                if (theme === "dark") {
                  nav[route.name].icon = nav[route.name].icon.replace("fill=\"#bfbfbf\"", `fill=\"${color[theme].color}\"`)
                }
                return (
                  <TouchableOpacity onPress={
                    () => {
                      value.setValue(0.2)
                      Animated.spring(value,
                        {
                          toValue: 1,
                          friction: 4,
                          duration: 200,
                          useNativeDriver: true,
                        }
                      ).start(() => {
                        setName(route.name)
                        navigation.navigate(route.name)
                      })
                    }
                  } style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: route.name === "客栈" ? 3 : 0,
                    gap: route.name === "客栈" ? 1 : 0,
                  }}>
                    <Animated.View style={{
                      transform: [{ scale: value }],
                    }}>
                      <SvgXml xml={icon.bottomNav[route.name]}
                        width={route.name === "客栈" ? 21 : 25}
                        height={route.name === "客栈" ? 21 : 25} />
                    </Animated.View>
                    <Text style={{
                      fontSize: 9,
                      color: route.name === name ? "#409eff" : "#BFBFBF"
                    }}>{route.name}</Text>
                  </TouchableOpacity>
                )

              },
              headerShown: false,
              tabBarStyle: [
                {
                  display: useSelector(state => state).nav,
                  flexDirection: "column",
                  alignItems: "center",
                  paddingHorizontal: 10,
                }
              ]
            }
          }}>
          {
            nav.map(item => <Tab.Screen
              key={item.name}
              name={item.name}
              component={item.element}
            />)
          }
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
