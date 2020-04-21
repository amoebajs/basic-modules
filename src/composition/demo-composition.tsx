import React from "react";
import { Composition, ReactComposition, useReconciler, Input, ChildrenSlot } from "@amoebajs/builder";
import { EntityStateDirective, CustomClickDirective } from "../common/common.module";
import { GridLayout } from "../layout/grid-layout.component";
import { StackLayout } from "../layout/stack-layout.component";

const Grid = useReconciler(GridLayout);
const Stack = useReconciler(StackLayout);
const RootState = useReconciler(EntityStateDirective);
const CustomClick = useReconciler(CustomClickDirective);

@Composition({
  name: "demo-composition",
  displayName: "基础布局捆绑",
  version: "0.0.1-beta.0",
})
export class DemoComposition extends ReactComposition {
  @Input()
  public loadingStateName: string = "loading";

  @Input()
  public useChildrenStateScope: boolean = false;

  @Input({ useMap: { key: "string", value: () => true } })
  public childrenStates: Array<[string, any]> = [];

  protected async onRender() {
    const childrenState = this.childrenStates || [];
    let defaultLoadingName = this.loadingStateName;
    if (defaultLoadingName.indexOf(".") > 0) {
      defaultLoadingName = defaultLoadingName.split(".")[0];
    }
    if (childrenState.findIndex(([k, _]) => k === defaultLoadingName) < 0) {
      childrenState.push([defaultLoadingName, false]);
    }
    const eventHandler = {
      vars: [
        "e is args[0]",
        `preState is $(${this.loadingStateName} | bind:state)`,
        `updateState is $(${this.loadingStateName} | bind:setState)`,
      ],
      expressions: ["return updateState(!preState)"],
    };
    return (
      <Stack>
        <Stack.Inputs>
          <Stack.layoutBackground value="#8778a4" />
        </Stack.Inputs>
        {this.useChildrenStateScope && (
          <RootState key="direc01">
            <RootState.Inputs>
              <RootState.defaultStateName value={this.entityId + "_context"} />
              <RootState.defaultStates value={childrenState}></RootState.defaultStates>
            </RootState.Inputs>
          </RootState>
        )}
        <Grid>
          <Grid.Inputs>
            <Grid.layoutBackground>#276ad7</Grid.layoutBackground>
            <Grid.layoutHeight>100px</Grid.layoutHeight>
            <Grid.gridRowCount>{3}</Grid.gridRowCount>
            <Grid.gridColumnCount>{3}</Grid.gridColumnCount>
            <Grid.gridRowSizes map={{ 1: 20, 2: 35, 3: 45 }} />
            <Grid.gridColumnSizes map={{ 1: 20, 2: 35, 3: 45 }} />
          </Grid.Inputs>
          <Stack>
            <Stack.Inputs>
              <Stack.layoutBackground>#8228a4</Stack.layoutBackground>
              <Stack.layoutHeight>100%</Stack.layoutHeight>
            </Stack.Inputs>
          </Stack>
          <Stack>
            <Stack.Inputs>
              <Stack.layoutBackground>#67f230</Stack.layoutBackground>
              <Stack.layoutHeight>100%</Stack.layoutHeight>
            </Stack.Inputs>
            <Grid.Attaches>
              <Grid.childRowStart>2</Grid.childRowStart>
              <Grid.childColumnStart>2</Grid.childColumnStart>
            </Grid.Attaches>
            <CustomClick>
              <CustomClick.Inputs>
                <CustomClick.host value={this.childKey("zenBtn01")} />
                <CustomClick.expression value={eventHandler} />
              </CustomClick.Inputs>
            </CustomClick>
          </Stack>
          <Stack>
            <Stack.Inputs>
              <Stack.layoutBackground>#fe50a3</Stack.layoutBackground>
              <Stack.layoutHeight>100%</Stack.layoutHeight>
            </Stack.Inputs>
            <Grid.Attaches>
              <Grid.childRowStart>3</Grid.childRowStart>
              <Grid.childColumnStart>3</Grid.childColumnStart>
            </Grid.Attaches>
            <CustomClick>
              <CustomClick.Inputs>
                <CustomClick.host value={this.childKey("zenBtn02")} />
                <CustomClick.expression value={eventHandler} />
              </CustomClick.Inputs>
            </CustomClick>
          </Stack>
        </Grid>
        <Grid>
          <Grid.Inputs>
            <Grid.layoutBackground>#56a64e</Grid.layoutBackground>
            <Grid.layoutHeight>60px</Grid.layoutHeight>
          </Grid.Inputs>
        </Grid>
        <Grid>
          <Grid.Inputs>
            <Grid.layoutBackground>#a645d3</Grid.layoutBackground>
            <Grid.layoutHeight>60px</Grid.layoutHeight>
          </Grid.Inputs>
        </Grid>
        <Grid>
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
