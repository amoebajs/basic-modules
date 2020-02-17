const { register } = require("tsconfig-paths");

register({
  baseUrl: ".",
  paths: {
    react: ["./node_modules/react/cjs/react.production.min.js"],
    "@amoebajs/builder": ["../builder/src/index"],
    "@amoebajs/builder/es/*": ["../builder/src/*"],
    "@amoebajs/builder/lib/*": ["../builder/src/*"],
  },
});
