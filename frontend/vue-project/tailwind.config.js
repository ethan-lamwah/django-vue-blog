const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        typing: "type 1.5s steps(30, end), cursor 1s step-end infinite",
      },
      keyframes: {
        type: {
          from: { width: "0" },
          to: { width: "100%" },
        },
        cursor: {
          "0%, 100%": {
            borderColor: colors.transparent,
          },
          "50%": {
            borderColor: colors.indigo[500],
          },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: colors.gray[300],
            "h1,h2,h3,h4": {
              color: colors.indigo[100],
            },
            a: {
              color: colors.indigo[400],
              paddingBottom: "0.25rem",
              textDecorationLine: "none",
              "&:hover": {
                color: colors.indigo[300],
              },
            },
            img: {
              borderRadius: "0.5rem",
            },
            strong: {
              color: colors.gray[200],
            },
            code: {
              color: colors.red[400],
            },
            pre: {
              color: colors.gray[200],
            },
            blockquote: {
              color: colors.gray[400],
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
