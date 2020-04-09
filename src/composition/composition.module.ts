import { Module } from "@amoebajs/builder";
import { DemoComposition } from "./demo-composition";
// import { LoadingGridComposition } from "./loading-grid";

@Module({
  name: "ambjs-composition-module",
  displayName: "Amoebajs组合模块",
  provider: "react",
  compositions: [DemoComposition /* LoadingGridComposition */],
})
export class CompositionModule {}

export { DemoComposition /* , LoadingGridComposition */ };
