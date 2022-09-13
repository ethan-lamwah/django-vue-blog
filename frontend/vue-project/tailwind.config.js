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
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
