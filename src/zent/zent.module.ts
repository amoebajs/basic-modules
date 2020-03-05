import { Module } from "@amoebajs/builder";
import { ZentBaseCssDirective } from "./directives/base-css.directive";
import { ZentButtonComponent } from "./components/button.component";
import { ZentComponentImportDirective } from "./directives/base-import.directive";
import { ZentLoadingComponent } from "./components/block-loading.component";
import { ZentLoadingDirective } from "./directives/loading.directive";

@Module({
  name: "zent-module",
  displayName: "Zent模块",
  provider: "react",
  components: [ZentButtonComponent, ZentLoadingComponent],
  directives: [ZentBaseCssDirective, ZentComponentImportDirective, ZentLoadingDirective],
  dependencies: {
    zent: "^8.0.0",
    zanPcAjax: "^4.0.0",
  },
})
export class ZentModule {}
