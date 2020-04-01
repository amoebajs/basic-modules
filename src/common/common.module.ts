import { Module } from "@amoebajs/builder";
import { CustomClickDirective } from "./directives/custom-click.directive";
import { GlobalStateDirective } from "./directives/global-state.directive";
import { HttpCallDirective } from "./directives/http-call.directive";

@Module({
  name: "ambjs-common-module",
  displayName: "Amoebajs基础模块",
  provider: "react",
  components: [],
  directives: [GlobalStateDirective, CustomClickDirective, HttpCallDirective],
})
export class CommonModule {}

export { GlobalStateDirective, CustomClickDirective };
