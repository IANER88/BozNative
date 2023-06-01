import {
  View,
  Image,
  Text,
  TextInput,
  Dimensions,
  StatusBar
} from "react-native"
import CheckBox from "@react-native-community/checkbox";
import icon from "../static/ts/icon"
import { useState } from "react"
import { SvgXml } from "react-native-svg"
import { Login } from "../static/ts/fetch"
function Box(props: any) {
  const {
    title = "邮箱登录",
    name = "未注册的邮箱自动创建账号",
    color = "#4EC58D",
    navigation
  } = props

  // 获取屏幕大小
  const win = Dimensions.get("window")
  const list = [
    {
      icon: icon.login.wechat,
      fun: () => {

      }
    },
    {
      icon: icon.login.alipay,
      fun: () => {

      }
    },
    {
      icon: icon.login.qq,
      fun: () => {

      }
    },
    {
      icon: icon.login.wiebo,
      fun: () => {

      }
    },
  ]
  const on = {
    toCaptcha() {
      navigation.push("captcha-login")
    },
    toCipher() {
      navigation.push("cipher-login")
    }
  }
  const [state, setState] = useState({
    checkbox: false
  })
  return (
    <View style={{
      position: "relative",
      backgroundColor: "#FFF",
      width: win.width,
      height: win.height + StatusBar.currentHeight,
      paddingTop: 70,
      paddingBottom: 40,
      paddingHorizontal: 30,
      display: "flex",
      justifyContent: "space-between",
    }}>
      <Image source={require("../static/image/top.png")} style={{
        left: -60,
        top: -190,
        position: "absolute",
        transform: [
          {
            scale: 2
          }
        ]
      }} />
      <View style={{ marginTop: 40 }}>
        <Text style={{ color: "#000", fontSize: 23, fontWeight: "bold" }}>{title}</Text>
        <Text style={{ color: "#5F5D5D", marginTop: 10, fontSize: 13 }}>{name}</Text>
        {props.children}
        <View style={{ marginTop: 10, display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
          <Text style={{ fontSize: 12 }} onPress={
            title === "邮箱登录" ? on.toCipher : on.toCaptcha
          }>
            {title === "邮箱登录" ? "密码登录" : "验证码登录"}
          </Text>
          {
            title === "账号密码登录" && <Text style={{ fontSize: 12 }}>忘记密码</Text>
          }
        </View>
        <View style={{
          height: 44,
          backgroundColor: color,
          marginTop: 20,
          borderRadius: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Text style={{ color: "#fff", fontSize: 14 }}>登录</Text>
        </View>
        <View style={{ marginTop: 5 }}>
          <View style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            left: -9,
          }}>
            <CheckBox style={{
              borderRadius: 50,
              transform: [
                {
                  scale: .7
                }
              ]
            }} tintColors={{ true: "#4EC58D", false: "#4CA9FC" }}
              disabled={false}
              value={state.checkbox}
              onValueChange={() => {
                setState({
                  ...state,
                  checkbox: !state.checkbox
                })
              }}
            />
            <Text style={{ fontSize: 11 }}>我已阅读并同意
              <Text style={{ color: "#7A78EE" }}>《博栈服务协议》</Text>、
              <Text style={{ color: "#7A78EE" }}>《博栈隐私权政策》</Text>
            </Text>
          </View>
        </View>
      </View>
      {/** 其他登录 */}
      <View style={{ display: "flex", alignItems: "center" }}>
        <View style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 7,
        }}>
          <View style={{
            width: 78,
            height: 1,
            backgroundColor: "#f0f0f2"
          }} />
          <Text>其他登录</Text>
          <View style={{
            width: 78,
            height: 1,
            backgroundColor: "#f0f0f2"
          }} />
        </View>
        <View style={{
          height: 26,
          display: "flex",
          flexDirection: "row",
          gap: 20,
          marginTop: 10,
        }}>
          {
            list.map((item, index) => {
              return <SvgXml width="26" height="26" key={index} xml={item.icon} />
            })
          }
        </View>
      </View>
    </View>
  )
}
/** 验证码登录 */
export function CaptchaLogin(props: any) {
  const [state, setState] = useState({
    email: "",
    captcha: "",
    time: 60
  })
  const getCaptcha = async () => {

  }
  return (
    <Box navigation={props.navigation}>
      <TextInput style={{
        height: 44,
        backgroundColor: "#F5F5F5",
        borderRadius: 8,
        marginTop: 40,
        paddingLeft: 20,
      }} placeholder="邮箱" onChangeText={(value) => {
        setState({
          ...state,
          email: value
        })
      }} defaultValue={state.email} />
      <View style={{
        height: 44,
        display: "flex",
        marginTop: 20,
        flexDirection: "row",
        gap: 10,
      }} >
        <TextInput style={{
          flex: 1,
          backgroundColor: "#F1F1F1",
          borderRadius: 8,
          paddingLeft: 20
        }} onChangeText={(value) => {
          setState({
            ...state,
            email: value
          })
        }
        }
          placeholder="验证码" />
        <View style={{
          width: 105,
          borderRadius: 8,
          backgroundColor: "#4EC58D",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}><Text style={{
          fontSize: 12,
          color: "#fff",
          fontWeight: "bold"
        }} onPress={getCaptcha}>获取验证码</Text></View>
      </View>
    </Box>
  )
}

/** 密码登录 */
export function CipherLogin(props: any) {
  const [state, setState] = useState({
    email: "",
    cipher: "",
    time: 60
  })
  const getCaptcha = async () => {

  }
  return (
    <Box title="账号密码登录" name="使用已经注册过的邮箱登录" navigation={props.navigation}>
      <TextInput style={{
        paddingLeft: 20,
        height: 44,
        backgroundColor: "#F5F5F5",
        borderRadius: 8,
        marginTop: 40,
      }} placeholder="邮箱" onChangeText={(value) => {
        setState({
          ...state,
          email: value
        })
      }} defaultValue={state.email} />
      <TextInput style={{
        paddingLeft: 20,
        height: 44,
        backgroundColor: "#F5F5F5",
        borderRadius: 8,
        marginTop: 20,
      }} placeholder="密码" secureTextEntry onChangeText={(value) => {
        setState({
          ...state,
          cipher: value
        })
      }} defaultValue={state.cipher} />
    </Box>
  )
}