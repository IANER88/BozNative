import { View } from "react-native"
import { Bozhan } from "./Bozhan"
import color from "../static/ts/color"
import { useSelector } from "react-redux"
import type { store } from "../static/ts/store"
export default function Chat() {
  const { theme } = useSelector(state => state) as store
  return (
    <Bozhan name="消息" title="热爱就去" text="学习">

    </Bozhan>
  )
}