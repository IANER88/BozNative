import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native"
import { Bozhan } from "../Home"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { SvgXml } from "react-native-svg"
import icon from "../../static/ts/icon"
import color from "../../static/ts/color"
export default function Article(props: any) {
  const dispatch = useDispatch()
  const { theme }: any = useSelector(state => state)
  interface State {
    answer: string,
    article: number,
    attention: object,
    author: any,
    browse: number,
    catalog: object,
    ccomments: object,
    content: string,
    create_time: string,
    update_time: string,
    follower: number,
    hot: Array<any>,
    id: string,
    like: object,
    tag: Array<object>,
    title: string,
  }
  const [state, setState] = useState<any>({
    author: {
      avatar: "1"
    }
  })
  useEffect(() => {
    dispatch({
      type: "update-nav-false"
    })
    const fetch = async () => {
      const { name, id } = props.route.params
      const { data } = await axios.get(`http://fetch.bozhan.top/article?name=${name}&id=${id}`)
      setState(data)
    }
    fetch()
  }, [])
  return (
    <Bozhan boolean={false} top={-220} left={-90} scale={2}>
      <ScrollView style={{ paddingHorizontal: 15 }}>
        <View style={{ marginBottom: 20, marginTop: 40, position: "relative", left: -10 }}>
          <SvgXml xml={icon.article.cancel} />
        </View>
        <View>
          <Text style={{ fontSize: 22, fontWeight: "bold", color: color[theme].color }}>{state.title}</Text>
          <View style={{ marginTop: 30, height: 45 }}>
            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              <Image source={{ uri: state.author.avatar ? state.author.avatar.replace("https","http") : "http://fetch.bozhan.top/media/avatar/jay.jpg" }} style={{
                width: 45,
                height: 45,
                borderRadius: 8
              }} />
              <View>
                <View style={{ height: 45, display: "flex", justifyContent: "space-around" }}>
                  <Text style={{ fontWeight: "bold", color: color[theme].color }}>{state.author.name}</Text>
                  <Text style={{
                    fontSize: 12
                  }}>{state.browse} 阅读·{state.create_time && state.create_time.split(" ")[0]}</Text>
                </View>
              </View>
            </View>
            <View style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 15,
              gap: 10,
            }}>
              {
                state.tag && state.tag.map((item: any) => {
                  return (
                    <TouchableOpacity key={item.name} style={{
                      backgroundColor: "#B8DBFF",
                      paddingHorizontal: 5,
                      paddingVertical: 5,
                      borderRadius: 8,
                    }}>
                      <Text style={{ color: theme === "dark" ? "#fff" : "#409eff", fontSize: 12, }}>{item.tag}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>
        </View>
      </ScrollView>
    </Bozhan>
  )
}