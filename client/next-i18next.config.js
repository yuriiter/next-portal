const { alphas2List } = require("./locales");
const path = require("path");

module.exports = {
  i18n: {
    locales: alphas2List,
    defaultLocale: alphas2List[0],
    localeDetection: false,
  },
  localePath:
    typeof window === "undefined"
      ? path.resolve("./public/static/locales")
      : "/public/static/locales",
};
