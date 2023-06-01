import type { ColorValue } from "react-native/Libraries/StyleSheet/StyleSheet"
type tinct = {
  [key: string]: {
    [key: string]: ColorValue
  }
}
const color: tinct = {
  white: {
    background: "#FFFFFF",
    tintBackground: "#F5F5F5",
    color: "#000",
    tintColor: "#686868",
    solid: "#f0f0f2",
    tagBackground: "#ecf5ff",
    mainColor: "#409eff"
  },
  dark: {
    background: "#22272E",
    tintBackground: "#383d48",
    color: "#adbac7",
    tintColor: "#778492",
    solid: "#3e4c5a",
    tagBackground: "#409eff",
    mainColor: "#409eff"
  }
}
export default color