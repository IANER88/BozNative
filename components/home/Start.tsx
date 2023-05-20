import { StyleSheet, View } from "react-native"
import { Image, Dimensions, StatusBar } from "react-native"
import {useDispatch} from "react-redux"
export default function Start(props: any) {
  const win = Dimensions.get("window")
  const dispatch = useDispatch()
  
  setTimeout(() => {
    dispatch({
      type:"update-nav-true"
    })
    props.navigation.push("home")
  }, 2000);
  return (
    <Image source={require("../../static/image/start.jpg")} style={{
      width: win.width,
      height: win.height + StatusBar.currentHeight,
    }} />
  )
}