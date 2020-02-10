const { register } = require("tsconfig-paths");

register({
  baseUrl: ".",
  paths: {
    "@amoebajs/builder": ["../builder/src/index"],
    "@amoebajs/builder/es/*": ["../builder/src/*"],
    "@amoebajs/builder/lib/*": ["../builder/src/*"],
  },
});
