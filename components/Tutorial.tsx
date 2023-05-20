import { View } from "react-native"
import { Bozhan } from "./Home"
import color from "../static/ts/color"
import { useSelector } from "react-redux"
export default function Tutorial() {
  const { theme } = useSelector(state => state)
  return (
    <Bozhan name="课程" title="热爱就去" text="学习">

    </Bozhan>
  )
}