import React from "react";
import { Composition, ReactComposition, useReconciler } from "@amoebajs/builder";
import { GridLayout } from "./grid-layout.component";
import { StackLayout } from "./stack-layout.component";

const Grid = useReconciler(GridLayout);
const Stack = useReconciler(StackLayout);

@Composition({
  name: "demo-composition",
  displayName: "基础布局捆绑",
  version: "0.0.1-beta.0",
})
export class DemoComposition extends ReactComposition {
  protected async onRender() {
    return (
      <Stack layoutBackground="#8778a4">
        <Grid layoutBackground="#276ad7" layoutHeight="100px" />
        <Grid layoutBackground="#56a64e" layoutHeight="60px" />
        <Grid layoutBackground="#a645d3" layoutHeight="60px" />
        <Grid layoutBackground="#fa8701" layoutHeight="100px" />
      </Stack>
    );
  }
}
