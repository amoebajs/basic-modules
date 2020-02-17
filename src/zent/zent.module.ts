import { Module } from "@amoebajs/builder";
import { ZentBaseCssDirective } from "./directives/base-css.directive";

@Module({
  name: "zent-module",
  displayName: "Zent模块",
  provider: "react",
  components: [],
  directives: [ZentBaseCssDirective],
  dependencies: {
    zent: "^8.0.0",
    zanPcAjax: "^4.0.0",
  },
})
export class ZentModule {}
