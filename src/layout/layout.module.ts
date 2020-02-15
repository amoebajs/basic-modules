import { Module } from "@amoebajs/builder";
import { GridLayout } from "./grid-layout.component";
import { StackLayout } from "./stack-layout.component";
import { BasicElement } from "./basic-element.component";
import { BasicLayout } from "./basic-layout.component";
import { DemoComposition } from "./demo-composition.component";

@Module({
  name: "ambjs-layout-module",
  displayName: "Amoebajs布局模块",
  provider: "react",
  components: [GridLayout, StackLayout],
  compositions: [DemoComposition],
  directives: [],
})
export class LayoutModule {}

export { GridLayout, StackLayout, BasicElement, BasicLayout };
