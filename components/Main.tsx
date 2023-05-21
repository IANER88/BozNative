import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack"
const Stack = createStackNavigator()
export default function Main(props: any) {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      gestureEnabled: false,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }}>
      {
        props.router.map((item: any) => (
          <Stack.Screen
            name={item.name}
            component={item.element}
            key={item.name}
          />
        ))
      }
    </Stack.Navigator>
  )
}