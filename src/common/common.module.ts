import { Module } from "@amoebajs/builder";
import { CustomClickDirective } from "./directives/custom-click.directive";
import { EntityStateDirective, GlobalStateDirective } from "./directives/entity-state.directive";
import { HttpCallDirective } from "./directives/http-call.directive";

@Module({
  name: "ambjs-common-module",
  displayName: "Amoebajs基础模块",
  provider: "react",
  components: [],
  directives: [GlobalStateDirective, EntityStateDirective, CustomClickDirective, HttpCallDirective],
})
export class CommonModule {}

export { EntityStateDirective, CustomClickDirective, HttpCallDirective };
