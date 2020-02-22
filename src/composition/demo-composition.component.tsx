import React from "react";
import { Composition, ReactComposition, useReconciler, Input, ChildrenSlot } from "@amoebajs/builder";
import { GridLayout } from "../layout/grid-layout.component";
import { StackLayout } from "../layout/stack-layout.component";
import { ZentButtonComponent, ZentButtonType } from "../zent/components/button.component";

const Grid = useReconciler(GridLayout);
const Stack = useReconciler(StackLayout);
const Button = useReconciler(ZentButtonComponent);

@Composition({
  name: "demo-composition",
  displayName: "基础布局捆绑",
  version: "0.0.1-beta.0",
})
export class DemoComposition extends ReactComposition {
  @Input()
  public loadingStateName: string = "loading";

  protected async onRender() {
    return (
      <Stack>
        <Stack.Inputs>
          <Stack.layoutBackground value="#8778a4" />
        </Stack.Inputs>
        <Grid key="child01">
          <Grid.Inputs>
            <Grid.layoutBackground>#276ad7</Grid.layoutBackground>
            <Grid.layoutHeight>100px</Grid.layoutHeight>
            <Grid.gridRowCount>{3}</Grid.gridRowCount>
            <Grid.gridColumnCount>{3}</Grid.gridColumnCount>
            <Grid.gridRowSizes map={{ 1: 20, 2: 35, 3: 45 }} />
            <Grid.gridColumnSizes map={{ 1: 20, 2: 35, 3: 45 }} />
          </Grid.Inputs>
          <Stack key="gridStack01">
            <Stack.Inputs>
              <Stack.layoutBackground>#8228a4</Stack.layoutBackground>
              <Stack.layoutHeight>100%</Stack.layoutHeight>
            </Stack.Inputs>
          </Stack>
          <Stack key="gridStack02">
            <Stack.Inputs>
              <Stack.layoutBackground>#67f230</Stack.layoutBackground>
              <Stack.layoutHeight>100%</Stack.layoutHeight>
            </Stack.Inputs>
            <Grid.Attaches>
              <Grid.childRowStart>2</Grid.childRowStart>
              <Grid.childColumnStart>2</Grid.childColumnStart>
            </Grid.Attaches>
            <Button key="zenBtn01" size="large" loading={`!${this.loadingStateName} | bind:state`}>
              <Button.Inputs>
                <Button.ztType>{ZentButtonType.Danger}</Button.ztType>
              </Button.Inputs>
            </Button>
          </Stack>
          <Stack key="gridStack03">
            <Stack.Inputs>
              <Stack.layoutBackground>#fe50a3</Stack.layoutBackground>
              <Stack.layoutHeight>100%</Stack.layoutHeight>
            </Stack.Inputs>
            <Grid.Attaches>
              <Grid.childRowStart>3</Grid.childRowStart>
              <Grid.childColumnStart>3</Grid.childColumnStart>
            </Grid.Attaches>
          </Stack>
        </Grid>
        <Grid key="child02">
          <Grid.Inputs>
            <Grid.layoutBackground>#56a64e</Grid.layoutBackground>
            <Grid.layoutHeight>60px</Grid.layoutHeight>
          </Grid.Inputs>
        </Grid>
        <Grid key="child03">
          <Grid.Inputs>
            <Grid.layoutBackground>#a645d3</Grid.layoutBackground>
            <Grid.layoutHeight>60px</Grid.layoutHeight>
          </Grid.Inputs>
        </Grid>
        <Grid key="child04">
          <Grid.Inputs>
            <Grid.layoutBackground>#fa8701</Grid.layoutBackground>
            <Grid.layoutHeight>100px</Grid.layoutHeight>
          </Grid.Inputs>
        </Grid>
        <ChildrenSlot />
      </Stack>
    );
  }
}
