import { View } from "react-native"
import { Bozhan } from "./Bozhan"
import color from "../static/ts/color"
import { useSelector } from "react-redux"
export default function Me() {
  const { theme } = useSelector(state => state)
  return (
    <Bozhan name="我的" title="热爱就去" text="学习">
    
    </Bozhan>
  )
}