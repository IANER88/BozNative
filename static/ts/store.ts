export type store = {
  theme: string,

}

const initialState: store = {
  theme: "white",
};

export default function rootReducer(state = initialState, action: {
  type: string
}) {
  switch (action.type) {
    case "update-theme-dark":
      return { ...state, theme: "dark" };
    case "update-theme-white":
      return { ...state, theme: "white" };
    default:
      return state;
  }
}