import { Component, Attach, PropAttach, IAfterChildrenRender, BasicState } from "@amoebajs/builder";
import { BasicElement } from "./basic-element.component";

@Component({
  name: "basic-layout",
  displayName: "基础布局",
  version: "0.0.1-beta.0",
  parent: BasicElement,
})
export class BasicLayout extends BasicElement implements IAfterChildrenRender {
  /**
   * 提供是否展示节点的判断
   * - 默认值：`undefined`
   **/
  @Attach({ name: "showIf", displayName: "提供是否展示节点的判断" })
  public showIf: PropAttach<string> = new PropAttach();

  protected onChildrenVisit(key: string, generator: import("@amoebajs/builder").JsxElementGenerator) {
    const result = super.onChildrenVisit(key, generator);
    const displayWith = this.showIf.get(key);
    if (!displayWith || displayWith === "") {
      return;
    }
    const exp = `$(${displayWith} | bind:state)`;
    const condition = this.helper["useBindExpression"](exp, this.getState(BasicState.ContextInfo).name);
    return { ...result, newDisplayRule: condition };
  }
}
