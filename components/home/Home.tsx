import {
  View,
  TextInput,
  Dimensions,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native"
import {
  useEffect,
  useState,
  memo
} from "react"
import Swiper from "react-native-swiper";
import { SvgXml } from "react-native-svg";
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import color from "../../static/ts/color"
import { Bozhan } from "../Bozhan"

export default function Home(props:any) {
  const { theme,nav } = useSelector(state => state)
  const win = Dimensions.get("window")
  const dispatch = useDispatch()
  // if(nav !== "flex"){
  //   dispatch({
  //     type: "update-nav-true"
  //   })
  // }
  let width = win.width - 30
  interface SlideShow {
    describe: string,
    img: string,
    style: object
  }
  interface Home {
    slideshow: Array<SlideShow>,
    web: Array<any>,
  }
  const [data, setData] = useState<Home>({
    slideshow: [],
    web: [],
  })
  const list: any = {
    "ReactJS": {
      color: "#5373a2",
      background: "#B7D3EC",
    },
    "Sass": {
      color: "#FFFFFF",
      background: "#E181BC"
    },
    "RN": {
      color: "#FFFFFF",
      background: "#8EC2E8"
    },
    "VueJS": {
      color: "#518d85",
      background: "#C1E4DE"
    },
    "SvelteJS": {
      color: "#FFFFFF",
      background: "#C396FF"
    },
  }
  const Box = (props: any) => {
    const {
      title = "推荐课程",
      name = "你可能喜欢的",
      text = "技术",
      height,
    } = props
    return (
      <View style={{
        height
      }}>
        <View style={{
          display: "flex",
          marginHorizontal: 15,
        }}>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <Text style={{
              fontWeight: "bold",
              color: color[theme].color,
            }}>{title}</Text>
            <View style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <Text style={{
                fontSize: 10,
                color: color[theme].color,
              }}>更多</Text>
              <Image style={{
                width: 12,
                height: 12,
                position: "relative",
                top: 2
              }} source={require("../../static/image/right.png")} />
            </View>
          </View>
          <Text style={{
            fontSize: 10,
            marginTop: 5,
            color: color[theme].tintColor,
          }}>{name}<Text style={{ color: "#3B9E85", fontWeight: "bold" }}>{text}</Text></Text>
        </View>
        <View>{props.children}</View>
      </View>
    )
  }

  const unit = (val: number) => {
    if (val === undefined) return;
    const numberArray = (val) => {
      const nun = String(val).split("");
      /*
        长度大过 4 往前推移 1 位 保留一位小数
        即 1000 -> 1K to 10000 -> 10K to 10001 -> 1.1w
      */
      const tuiyi = ({ val, num = 2, unit = "k" }) => {
        const str = (str) => str.toString().replaceAll(",", "");
        const to = val.slice(0, val.length - num);
        const len = to.length - 1;
        const first = str(to.slice(0, len));
        const last = str(to.slice(len, to.length));
        return `${first}.${last}${unit}`;
      };
      if (nun.length == 4) {
        return tuiyi({ val: nun });
      } else if (nun.length >= 5) {
        return tuiyi({ val: nun, num: 3, unit: "w" });
      } else {
        return val;
      }
    };
    return numberArray(val);
  }
  const toArticle = (object:object) =>{
    // 跳转至文章页
    props.navigation.push("article",object)
  }
  const [navs, setNavs] = useState<any>([])
  const [fild, setArtile] = useState<any>([])
  const [state, setState] = useState({
    name: "推荐"
  })
  const onScroll = (event) =>{
    const { y,bottom } = event.nativeEvent.contentOffset
    console.log(y);
    
  }
  useEffect(() => {
    (async () => {
      const resolve = await axios.get("http://fetch.bozhan.top/home")
      resolve.data.web.map((item: any) => {
        if (item.name === "React Native") item.name = "RN"
        return item
      })
      const tag = await axios.patch("http://fetch.bozhan.top/tag")
      const { data: { article } } = await axios.put(`http://fetch.bozhan.top/article?name=browse&id=1`)
      setData(resolve.data)
      setNavs(tag.data.nav)
      setArtile(article)
    })()
    return () => {
    }
  }, [])
  return (
    <Bozhan>
      <ScrollView style={{
        width: win.width,
        height: win.height,
        backgroundColor: color[theme].background,
        paddingBottom: 0,

      }} onScroll={onScroll}>
        <View style={{
          backgroundColor: color[theme].tintBackground,
          height: 46,
          marginTop: 8,
          borderRadius: 5,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          justifyContent: "space-between",
          marginHorizontal: 15,
        }}>
          <Image source={require("../../static/image/search.png")} />
          <TextInput style={{
            flex: 1,
            paddingLeft: 10,
          }} placeholder="搜索课程、文章"
            placeholderTextColor={theme === "white" ? color[theme].tintColor : color[theme].color} />
        </View>
        <View style={{
          width,
          height: 140,
          marginVertical: 15,
          marginHorizontal: 15,
        }}>
          <Swiper style={{
            width,
            height: 140,
            shadowColor: "#B9B9B9",
            shadowRadius: 20,
            shadowOffset: {
              width: 20,
              height: -520
            }
          }}
            autoplay
            loop
            autoplayTimeout={2}
            removeClippedSubviews={false}
            horizontal
            paginationStyle={{
              bottom: 10,
            }}>
            {
              data.slideshow.map((item: any) => (
                <Image key={item.describe} source={{ uri: item.img.replace("https","http") }} style={{
                  width: "100%",
                  height: 140,
                  resizeMode: "contain",
                  borderRadius: 8,
                }} />
              )
              )
            }
          </Swiper>
        </View>
        {/** 推荐课程 */}
        <Box height={140}>
          <View style={{
            width,
            height: 247,
            display: "flex",
            gap: 10,
            marginTop: 10,
            marginHorizontal: 15,
          }}>
            <View style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 5,
            }}>
              {
                data.web.map((item: any) => {
                  if (["Sass", "SvelteJS"].includes(item.name)) {
                    item.svgIcon = item.svgIcon.replace(/fill="([^"]*)"/, "fill=\"#FFF\"")
                  }
                  return (
                    <View key={item.name}>
                      <View style={{
                        width: width / 5 - 10,
                        height: width / 5 - 10,
                        borderRadius: 8,
                        backgroundColor: list[item.name] && list[item.name].background,
                        paddingHorizontal: 8,
                        paddingVertical: 8,
                      }}>
                        <SvgXml
                          width="100%"
                          height="100%"
                          xml={item.svgIcon}
                        />
                      </View>
                      <Text style={{
                        width: width / 5 - 10,
                        fontSize: 12,
                        textAlign: "center",
                        color: color[theme].tintColor,
                        marginTop: 3
                      }}>{item.name}</Text>
                    </View>
                  )
                })
              }
            </View>
          </View>
        </Box>
        <Box title="推荐文章" name="即时查看文章" text="资讯">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginLeft: 15,
              marginTop: 10,
            }}>
              <Text style={{ fontSize: 12, color: color[theme].tintColor, fontWeight: state.name === "推荐" && "bold" }}>推荐</Text>
              {
                navs.map((item: any) => {
                  return (
                    <Text key={item.name} style={{ fontSize: 12, color: color[theme].tintColor }}>
                      {item.name}
                    </Text>
                  )
                })
              }
            </View>
          </ScrollView>
          <View style={{
            marginHorizontal: 15,
          }}>
            {
              fild.map((item: any) => {
                return (
                  <TouchableOpacity key={item.id} style={{
                    display: "flex",
                    flexDirection: "row",
                    height: 95,
                    marginTop: 15,
                    gap: 10,
                    borderBottomWidth: 1,
                    borderColor: color[theme].solid,
                    paddingBottom: 10,
                  }} onPress={()=> toArticle({
                    id:item.id,
                    name: item.author.alias
                  }) }>
                    {item.image && <Image source={{ uri: item.image.replace("https","http") }} style={{
                      width: 110,
                      height: 80,
                      borderRadius: 8,
                      resizeMode: "contain",
                    }} />}
                    <View style={{
                      display: "flex",
                      justifyContent: "space-between",
                      height: 80,
                    }}>
                      <Text style={{
                        fontWeight: "bold",
                        color: color[theme].color
                      }}>{item.title}</Text>
                      <Text style={{
                        fontSize: 12,
                        height: 30,
                        color: color[theme].tintColor
                      }} numberOfLines={30}>{item.abridged}</Text>
                      <View style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}>
                        <View>
                          <Text style={{
                            fontSize: 12,
                            color: color[theme].tintColor,
                          }}>{item.like.count}喜欢·收藏{item.collect.count}·阅读{unit(item.browse)}·{item.author.name}</Text>
                        </View>
                        {
                          !item.image && <View style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 5,
                          }}>
                            {
                              item.tag.slice(0, 2).map(home => {
                                return <View key={home.id} style={{
                                  height: 20,
                                  backgroundColor: color[theme].tagBackground,
                                  paddingHorizontal: 4,
                                  borderRadius: 5,
                                  display: "flex",
                                  justifyContent: "center"
                                }}><Text style={{
                                  color: theme === "white" ? "#409EFF" : "#FFF",
                                  fontSize: 10,
                                }}>{home.text}</Text></View>
                              })
                            }
                          </View>
                        }
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </Box>
      </ScrollView>
    </Bozhan>
  )
}