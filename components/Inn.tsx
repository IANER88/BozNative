import { View } from "react-native"
import { Bozhan } from "./Bozhan"
import { useSelector } from "react-redux"
import color from "../static/ts/color"
import type { store } from "../static/ts/store"
export default function Innn() {
  const { theme } = useSelector(state => state) as store
  return (
    <Bozhan name="客栈" title="热爱就去" text="学习">

    </Bozhan>
  )
}