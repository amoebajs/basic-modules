const { register } = require("tsconfig-paths");

register({
  baseUrl: ".",
  paths: {
    "@amoebajs/builder": ["./node_modules/@amoebajs/builder"],
    "@amoebajs/builder/es/*": ["./node_modules/@amoebajs/builder/lib/*"],
    "@amoebajs/builder/lib/*": ["./node_modules/@amoebajs/builder/lib/*"],
  },
});
