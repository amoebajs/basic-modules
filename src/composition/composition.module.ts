import { Module } from "@amoebajs/builder";
import { DemoComposition } from "./demo-composition.component";

@Module({
    name: "ambjs-composition-module",
    displayName: "Amoebajs组合模块",
    provider: "react",
    compositions: [DemoComposition]
})
export class CompositionModule { }

export { DemoComposition };
