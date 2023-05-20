import Start from "../components/home/Start"
import Home from "../components/home/Home"
import Article from "../components/home/Article"
import {
  CaptchaLogin,
  CipherLogin
} from "../components/Login"
export const home = [
  // {
  //   name:"start",
  //   element:Start
  // },
  {
    name: "home",
    element: Home
  },
  {
    name: "article",
    element: Article
  },
  {
    name: "cipher-login",
    element: CipherLogin
  },
  {
    name: "captcha-login",
    element: CaptchaLogin
  },
]