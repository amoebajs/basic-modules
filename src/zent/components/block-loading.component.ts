import {
  Component,
  ReactComponent,
  Require,
  IAfterInit,
  Input,
  Attach,
  PropAttach,
  BasicState,
  IAfterChildrenRender,
} from "@amoebajs/builder";
import { ZentComponentImportDirective } from "../directives/base-import.directive";
import { ZentBaseCssDirective } from "../directives/base-css.directive";
import { GlobalStateDirective } from "../../common/directives/global-state.directive";

@Component({ name: "loading", displayName: "全局Loading" })
@Require(ZentBaseCssDirective, { target: "loading" })
@Require(ZentComponentImportDirective, {
  target: "loading/block-loading",
  alias: ({ importToken }: any) => importToken,
})
@Require(GlobalStateDirective, {
  name: "AppContext",
  state: ({ stateName }: any) => [[stateName, false]],
})
export class ZentLoadingComponent extends ReactComponent implements IAfterInit, IAfterChildrenRender {
  @Input({ name: "loading" })
  public stateName: string = "loading";

  @Attach({ name: "display" })
  public displayWith: PropAttach<string> = new PropAttach("");

  protected get importToken() {
    return this.entityId + "_Import";
  }

  public afterInit() {
    this.setTagName(this.importToken);
  }

  public afterChildrenRender() {
    super.afterChildrenRender();
    this.addAttributeWithSyntaxText(
      "loading",
      this.helper.useStateExpression(
        { type: "state", expression: this.stateName, extensions: { reverse: false } },
        this.getState(BasicState.ContextInfo).name,
      ),
    );
  }

  protected onChildrenVisit(key: string) {
    const displayWith = this.displayWith.get(key);
    if (!displayWith || displayWith === "") {
      return;
    }
    const exp = `$(${displayWith} | bind:state)`;
    const condition = this.helper.useBindExpression(exp, this.getState(BasicState.ContextInfo).name);
    return { newDisplayRule: condition };
  }
}
