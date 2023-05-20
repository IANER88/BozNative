import {
  View,
  Dimensions,
  Text,
  Image,
  StatusBar,
} from "react-native"
import color from "../static/ts/color"
import Main from "./Main"
import { home } from "../router/main"
import { useSelector, useDispatch } from "react-redux"
export function Bozhan(props: any) {
  const { theme } = useSelector(state => state)
  const {
    name = "首页",
    title = "选择正确的",
    text = "路线",
    boolean = true,
    left = -70,
    top = -170,
    scale = 1
  } = props
  const win = Dimensions.get("window")
  return (
    <View style={{
      height: "100%"
    }}>
      {/** 首页指标 */}
      <View style={{
        position: "relative",
      }}>
      {
        boolean && <View style={{ display: "flex", gap: 6, paddingTop: 40, backgroundColor: color[theme].background, paddingBottom: 10, }}>
        <Text style={{
          fontSize: 22,
          fontWeight: "bold",
          color: color[theme].color,
          marginHorizontal: 15,
        }}>{name}</Text>
        <Text style={{
          fontSize: 12,
          fontWeight: "bold",
          marginHorizontal: 15,
          color: color[theme].tintColor
        }}>{title}<Text style={{ color: "#3B9E85", }}>{text}</Text></Text>
      </View>
      }
      </View>
      <Image source={require("../static/image/top.png")} style={{
        position: "absolute",
        left,
        top,
        transform: [
          {
            scale
          }
        ]
      }} />
      {props.children}
    </View>
  )
}

export default function Home() {
  return (
    <Main router={home} />
  )
}