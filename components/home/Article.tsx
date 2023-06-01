import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated
} from "react-native"
import { Bozhan } from "../Bozhan"
import { useEffect, useState, useRef } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { SvgXml } from "react-native-svg"
import icon from "../../static/ts/icon"
import color from "../../static/ts/color"
import HTML from "react-native-render-html"
import Prism from "../../static/ts/prism";
import he from "he"

export default function Article(props: any) {
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
    },
    tag: [],
    content: "<div></div>",
    like: {
      count: 0
    },
    collect: {
      count: 0
    },
    comments: {
      comment: [
        {
          author: {
            avatar: "http://fetch.bozhan.top/media/avatar/jay.jpg"
          }
        },
      ],
      count: 0,

    }
  })
  const [boolean, setBolean] = useState<boolean>(false)
  useEffect(() => {
    const fetch = async () => {
      const { name, id } = props.route.params
      const { data } = await axios.get(`http://fetch.bozhan.top/article?name=${name}&id=${id}`)
      data.content = data.content.replaceAll(/<pre>(.*?)<\/pre>/igs, (element: string) => {
        const regex = /<code\s+class="(\S+\s+)?language-(\w+)"/i;
        const matches = element.match(regex);
        if (matches && matches.length > 2) {
          const language: string = matches[2]; // 匹配到的 language 值
          return element.replace(/<\/?pre>/g, '').replace(/<code(.*?)>(.*?)<\/code>/gs, (code) => {
            const text = Prism.highlight(he.decode(code.replace(/<\/?code>/g, '').replace(/<code(.*?)>/g, "")), Prism.languages[language], language)
            return `<pre><code>${text}</code></pre>`
          })
        } else {
          return element
        }
      })
      // console.log(data.content);
      setState(data)
    }
    dispatch({
      type: "update-nav-false"
    })

    fetch()
  }, [])
  const value = new Animated.Value(0)

  const bottomNav = [
    {
      name: state.comments.count === 0 ? "评论" : state.comments.count,
      icon: icon.article.comment,
      width: 20,
    },
    {
      name: state.like.count === 0 ? "点赞" : state.like.count,
      icon: icon.article.like,
      width: 17,
    },
    {
      name: state.collect.count === 0 ? "收藏" : state.collect.count,
      icon: icon.article.collect,
      width: 20,
    },
  ]
  return (
    <Bozhan boolean={false} top={-220} left={-90} scale={2}>
      <View style={{
        marginBottom: 20,
        marginTop: 40,
        paddingHorizontal: 15,
        position: "relative",
        // left: -10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <View style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}>
          <TouchableOpacity onPress={() => {
            props.navigation.goBack()
          }}>
            <SvgXml xml={icon.article.cancel} style={{
              left: -10,
            }} />
          </TouchableOpacity>
          {boolean ? <Animated.Text style={{
            fontSize: 18, color: color[theme].color,
            opacity: value,
          }}>{state.title}</Animated.Text> : null}
        </View>

        <View style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <View style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 20
          }}>
            <SvgXml xml={icon.article.share} width={17} />
            <SvgXml xml={icon.article.more} width={17} />
          </View>
        </View>
      </View>
      <ScrollView style={{ paddingHorizontal: 15 }} onScroll={(event: any) => {
        const { y } = event.nativeEvent.contentOffset
        if (y >= 104) {
          value.setValue(1)
          Animated.spring(value, {
            toValue: 1,
            friction: 4,
            useNativeDriver: true,
          })
          setBolean(true)
        } else {
          setBolean(false)
        }
      }}>
        <View>
          <Text style={{ fontSize: 22, fontWeight: "bold", color: color[theme].color }}>{state.title}</Text>
          <View style={{ marginTop: 30 }}>
            <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
              {/* 头像 */}
              <Image source={{ uri: state.author.avatar ? state.author.avatar.replace("https", "http") : "http://fetch.bozhan.top/media/avatar/jay.jpg" }} style={{
                width: 45,
                height: 45,
                borderRadius: 8
              }} />
              <View style={{
                width: Dimensions.get("window").width - 85,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <View style={{ height: 45, display: "flex", justifyContent: "space-around" }}>
                  <Text style={{ fontWeight: "bold", color: color[theme].color }}>{state.author.name}</Text>
                  <Text style={{
                    fontSize: 12,
                    color: color[theme].tintColor
                  }}>{state.browse} 阅读·{state.create_time && state.create_time.split(" ")[0]}</Text>
                </View>
                {/* 关注按钮 */}
                <TouchableOpacity style={{
                  backgroundColor: "#409eff",
                  width: 72,
                  height: 31,
                  borderRadius: 8,
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}>
                  <SvgXml xml={icon.article.attent} />
                  <Text style={{ color: "#fff", marginTop: 2 }}>关注</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* 文章标签 */}
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
                      backgroundColor: color[theme].tagBackground,
                      paddingHorizontal: 5,
                      paddingVertical: 5,
                      borderRadius: 8,
                      borderColor: theme === "dark" ? "none" : color[theme].mainColor,
                      borderWidth: 1,
                    }}>
                      <Text style={{ color: theme === "dark" ? "#fff" : "#409eff", fontSize: 12, }}>
                        {item.tag}
                      </Text>
                    </TouchableOpacity>
                  )
                })
              }
            </View>
          </View>
        </View>
        <HTML contentWidth={200} source={{ html: state.content }}
          baseFontStyleText={{
            color: color[theme].color
          }}
          tagsStyles={{
            h1: {
              color: color[theme].color
            },
            h2: {
              color: color[theme].color
            },
            h3: {
              color: color[theme].color
            },
            h5: {
              color: color[theme].color
            },
            h6: {
              color: color[theme].color
            },
            p: {
              lineHeight: 22,
              color: color[theme].color
            },
            ol: {
              // paddingLeft:,
              lineHeight: 26,
              left: -10,
            },
            pre: {
              backgroundColor: "#282C34",
              borderRadius: 8,
              padding: 10,
            }
          }}
        />
        {/* 评论区块 */}
        <View style={{
          borderColor: color[theme].solid,
          borderTopWidth: 1,
          paddingVertical: 15
        }}>
          {
            state.comments.comment.map((item: any) => {
              return (
                <View key={item.id} style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingVertical: 10,
                  gap: 10,
                }}>
                  <Image source={{ uri: item.author.avatar.replace("https", "http") }} style={{
                    width: 35,
                    height: 35,
                    borderRadius: 8,
                  }} />
                  <View>
                    <Text style={{
                      fontSize: 12,
                      color: color[theme].tintColor
                    }}>{item.author.name}·{item.time && item.time.split(" ")[0]}</Text>
                    <HTML contentWidth={200} source={{ html: item.content }} tagsStyles={{
                      a: {
                        color: color[theme].mainColor,
                        textDecorationLine: undefined
                      },

                    }} />
                  </View>
                </View>
              )
            })
          }
        </View>
      </ScrollView>
      <View style={{
        height: 60,
        backgroundColor: color[theme].background,
        borderColor: color[theme].solid,
        borderTopWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <View style={{
          width: "65%",
          height: "100%",
          backgroundColor: color[theme].tintBackground,
          borderRadius: 30,
          paddingLeft: 10,
          display: "flex",
          justifyContent: "center"
        }} >
          <Text>我想评论</Text>
        </View>
        <View style={{
          width: "30%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          // gap: 20,
          justifyContent: "space-between"
        }}>
          {
            bottomNav.map((item, index) => {
              return (
                <TouchableOpacity style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  top: 5,
                  // gap:2,
                }} key={index}>
                  <SvgXml xml={item.icon} width={item.width} />
                  {
                    item.name && <Text style={{
                      fontSize: 11,
                      top: -9,
                      // color:
                    }}>{item.name}</Text>
                  }
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
    </Bozhan>
  )
}