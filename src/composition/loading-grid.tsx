import React from "react";
import { Composition, ReactComposition, useReconciler, ChildrenSlot } from "@amoebajs/builder";
import { ZentLoadingComponent } from "../zent/loading/block-loading.component";
import { GridLayout } from "../layout/grid-layout.component";

const Grid = useReconciler(GridLayout);
const Loading = useReconciler(ZentLoadingComponent);

@Composition({
  name: "loading-grid",
  displayName: "支持加载等待的网格捆绑",
  version: "0.0.1-beta.0",
})
export class LoadingGridComposition extends ReactComposition {
  protected async onRender() {
    return (
      <Loading>
        <Loading.Inputs>
          <Loading.stateName value="loading" />
        </Loading.Inputs>
        <Grid key="innerGrid">
          <Loading.Attaches>
            <Loading.displayWith value="!loading" />
          </Loading.Attaches>
          <ChildrenSlot />
        </Grid>
      </Loading>
    );
  }
}
