import { Module } from "@amoebajs/builder";
import { ZentBaseCssDirective } from "./directives/base-css.directive";
import { ZentButtonComponent } from "./components/button.component";
import { ZentComponentImportDirective } from "./directives/base-import.directive";

@Module({
  name: "zent-module",
  displayName: "Zent模块",
  provider: "react",
  components: [ZentButtonComponent],
  directives: [ZentBaseCssDirective, ZentComponentImportDirective],
  dependencies: {
    zent: "^8.0.0",
    zanPcAjax: "^4.0.0",
  },
})
export class ZentModule {}
