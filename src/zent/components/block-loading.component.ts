import { Component, Require, Input, Attach, PropAttach, IAfterInit } from "@amoebajs/builder";
import { ZentComponentImportDirective } from "../directives/base-import.directive";
import { ZentBaseCssDirective } from "../directives/base-css.directive";
import { GlobalStateDirective } from "../../common/directives/global-state.directive";
import { ZentComponent } from "../base/base.component";

@Component({ name: "loading", displayName: "全局Loading" })
@Require(ZentBaseCssDirective, { target: "loading" })
@Require(ZentComponentImportDirective, {
  target: "loading/block-loading",
  alias: ({ uniqueToken }: ZentLoadingComponent) => uniqueToken,
})
@Require(GlobalStateDirective, {
  name: "AppContext",
  state: ({ stateName }: ZentLoadingComponent) => [[stateName, false]],
})
export class ZentLoadingComponent extends ZentComponent implements IAfterInit {
  @Input({ name: "loading" })
  public stateName: string = "loading";

  @Attach({ name: "display" })
  public displayWith: PropAttach<string> = new PropAttach();

  public afterInit() {
    this.setTagName(this.uniqueToken);
  }

  public afterChildrenRender() {
    super.afterChildrenRender();
    this.addAttributeWithSyntaxText("loading", this.render.createStateAccessSyntax(this.stateName));
  }

  protected onChildrenVisit(key: string) {
    const displayWith = this.displayWith.get(key);
    if (!displayWith || displayWith === "") {
      return;
    }
    return {
      newDisplayRule: this.render.createStateAccessSyntax(displayWith),
    };
  }
}
