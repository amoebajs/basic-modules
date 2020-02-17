import { Module } from "@amoebajs/builder";
import { ZentBaseCssDirective } from "./base/zent-base-css.directive";
import { ZentButtonComponent } from "./button/zent-button.component";
import { ZentFormComponent } from "./form/zent-form.component";
import { ZentActionButtonDirective } from "./form/zent-action-button.directive";
import { ZentFormDirective } from "./form/zent-form.directive";
import { ZentInputDirective } from "./form/zent-input.directive";
import { ZentSelectDirective } from "./form/zent-select.directive";
import { ZentSwitchDirective } from "./form/zent-switch.directive";

@Module({
  name: "zent-module",
  displayName: "Zent模块",
  provider: "react",
  components: [ZentButtonComponent, ZentFormComponent],
  directives: [
    ZentBaseCssDirective,
    ZentActionButtonDirective,
    ZentFormDirective,
    ZentInputDirective,
    ZentSelectDirective,
    ZentSwitchDirective,
  ],
  dependencies: {
    zent: "^8.0.0",
    zanPcAjax: "^4.0.0",
  },
})
export class ZentModule {}