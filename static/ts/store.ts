const initialState = {
  theme: "white",
  nav: "flex",
};

export default function rootReducer(state = initialState, action) {
  switch(action.type) {
    case "update-theme-dark":
      return { ...state, theme:"dark" };
    case "update-theme-white":
      return { ...state, theme: "white" };
    case "update-nav-true":
      return { ...state, nav:"flex" };
    case "update-nav-false":
      return { ...state, nav:"none" };
    default:
      return state;
  }
}