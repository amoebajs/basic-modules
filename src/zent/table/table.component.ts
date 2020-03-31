import {
  Component,
  Require,
  Reference,
  VariableRef,
  IAfterInit,
  IAfterDirectivesAttach,
  Utils,
} from "@amoebajs/builder";
import { ZentBaseCssDirective } from "../directives/base-css.directive";
import { ZentComponent } from "../base/base.component";
import { ZentComponentImportDirective } from "../directives/base-import.directive";
import { IUniversalTable, IUniversalTableColumn } from "./typing";

@Component({
  name: "universal-table",
  displayName: "通用表格",
  parent: ZentComponent,
})
@Require(ZentBaseCssDirective, { target: "grid" })
@Require(ZentComponentImportDirective, {
  target: "grid",
  alias: ({ tableRoot }: UniversalTable) => tableRoot.name,
})
export class UniversalTable extends ZentComponent<IUniversalTable> implements IAfterInit, IAfterDirectivesAttach {
  @Reference("table")
  protected tableRoot!: VariableRef;

  @Reference("table-columns-var")
  protected tableColumnsVar!: VariableRef;

  public afterInit() {
    this.setState("tableColumns", []);
    this.setTagName(this.tableRoot.name);
    this.addAttributeWithSyntaxText("columns", this.tableColumnsVar.name);
  }

  public afterDirectivesAttach() {
    const columns = this.getState("tableColumns");
    const fixeds = columns.filter(i => !Utils.is.nullOrUndefined(i.fixed));
    if (fixeds.length > 0) {
      this.addAttributeWithSyntaxText("scroll", JSON.stringify({ x: 1024 }));
    }
    const newColumns = columns.filter(i => Utils.is.nullOrUndefined(i.fixed));
    // newColumns.unshift()
    this.addPushedVariable(
      this.tableColumnsVar.name,
      this.helper.__engine.createIdentifier(`[${columns.map(i => this.useEachColumn(i)).join(", ")}]`),
    );
  }

  private useEachColumn(i: IUniversalTableColumn) {
    const { id: _, ...others } = i;
    return `{ ${Object.entries(others)
      .filter(([, v]) => !Utils.is.nullOrUndefined(v))
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ")} }`;
  }
}
