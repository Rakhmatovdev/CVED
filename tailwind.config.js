/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px"
    },
    extend: {
      fontFamily: {
        onest: ["Onest", "Roboto", "sans-serif"]
      },
      colors: {
        grayed: "#343539",
        secondary: "#232E40",
        darker: "#202237",
        lighter: "#6B7280",
        dlighter: "#768796",
        dtext: "#B7BFD5",
        dvalue: "#F8F8FA",
        primary: "#1F2937",
        dprimary: "#E0E3EA",
        dborder: "#3A405A",
        dcontent: "#2B3048",
        dbody: "#1E2035",
        blued: "#3276FF",
        skyBlue: "#4A7CF1",

        offWhite: "#F2F4F7",
        pureWhite: "#FDFDFD",
        ghostWhite: "#E9EAEB",

        whiteGray: "#EEF1F3",
        lightGray: "#E5E7EB",
        milkGray: "#B6BED4",
        lemonGray: "#A9A9A9",
        mediumGray: "#777E90",
        coolGray: "#69757A",
        iceGray: "#535862",
        altGray: "#717680",
        darkGray: "#1E1E1E",
        keepGray: "#374151",
        titanGray: "#9CA3AF",
        snowGray: "#D5D7DA",
        mistyGray: "#717386",
        stoneGray: "#878787",
        silverGray: "#9CA3AF",
        stonedGray: "#40455A",

        lightRed: "#FECACA",
        mediumRed: "#CE5A67",
        danger: "#ff4d4f",
        brightRed: "#FF4E4E",
        altRed: "#B11717",
        darkRed: "#991B1B",
        pastelRed: "#FF6384",
        coralRed: "#FF4B55",
        snowRed: "#FFDCDC",

        bluePrimary: "#2563EB",
        mediumBlue: "#1563EB",
        whiteBlue: "#EBF1FF",
        lightBlue: "#8FB3FF",
        royalBlue: "#2F56AC",
        deepBlue: "#2C375A",
        darkBlue: "#1F2135", //#1F2136 => #1F2135 need
        slateBlue: "#2B3149",
        midnightBlue: "#3B415B",
        snowBlue: "#D6E4FF",

        lightTest: "#F8FAFC",

        mediumSlate: "#414651",
        darkSlate: "#343950",
        nightSlate: "#383E58",
        boldSlate: "#36394A",

        electricViolet: "#7356F1",
        softViolet: "#A78BFA",

        goldYellow: "#EAB308",
        lightYellow: "#FEF9C3",
        pastelYellow: "#FFCE56",
        mediumYellow: "#FFC107",
        snowYellow: "#FFF9E6",

        lightBlue100: "#DBEAFE",
        lightGray100: "#F3F4F6",
        lightGreen50: "#ECFDF3",
        darkGreen900: "#067647",
        darkRed700: "#B42318",
        lightRed50: "#FEF3F2",
        red500: "#EF4444",
        blue700: "#1D4ED8",
        lightRed100: "#FEF2F2",
        lightRed200: "#FEE2E2",
        coolGray300: "#D1D5DB",

        mediumGreen: "#ABEFC6",
        lightGreen: "#4DD282",
        successGreen: "#17B26A",
        boldGreen: "#4DD2821F",
        emeraldGreen: "#2CBE88",
        freshGreen: "#06D188",
        snowGreen: "#E4F8EC",
        lemonGreen: "#DBF6E6",
        whiteGreen: "#EAFAF0"
      },
      boxShadow: {
        card: "0 5px 15px 0 rgba(0, 0, 0, 0.05)"
      }
    }
  }
};
