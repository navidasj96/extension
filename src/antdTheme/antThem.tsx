import type { ThemeConfig } from "antd"

const antdTheme: ThemeConfig = {
  components: {
    // Button: {
    //   defaultActiveBorderColor: "black",
    //   defaultActiveColor: "black",
    //   defaultHoverBorderColor: "black",
    //   defaultHoverColor: "black",
    //   groupBorderColor: "black",
    // },

    Segmented: {
      itemSelectedBg: "black",
      itemSelectedColor: "white",
      trackBg: " bg-[#ECECEE]",
      itemHoverBg: "",
      itemHoverColor: "",
      trackPadding: "4",
      itemColor: "white",
      borderRadius: 24,
      itemActiveBg: ""
    },
    Input: {
      hoverBg: " bg-[#ECECEE]",
      activeBg: " bg-[#ECECEE]"
    }
  },

  token: {}
}

export default antdTheme
