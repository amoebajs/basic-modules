import { Module } from "@amoebajs/builder";
import { ZentBaseCssDirective } from "./directives/base-css.directive";
import { ZentButtonComponent } from "./components/button.component";
import { ZentComponentImportDirective } from "./directives/base-import.directive";
import { ZentLoadingComponent } from "./loading/block-loading.component";
import { ZentLoadingDirective } from "./loading/loading.directive";
import { UniversalForm } from "./form/form.component";
import { UniversalFormField } from "./form/form-field.directive";
import { UniversalFormSubmit } from "./form/form-submit.directive";

@Module({
  name: "zent-module",
  displayName: "Zent模块",
  provider: "react",
  components: [ZentButtonComponent, ZentLoadingComponent, UniversalForm],
  directives: [
    ZentBaseCssDirective,
    ZentComponentImportDirective,
    ZentLoadingDirective,
    UniversalFormField,
    UniversalFormSubmit,
  ],
  dependencies: {
    rxjs: "^6.4.0",
    zent: "^8.0.0",
    zanPcAjax: "^4.0.0",
  },
})
export class ZentModule {}
