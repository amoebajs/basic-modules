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
import { IUniversalTable, IUniversalTableColumn, TableColumnMode } from "./typing";

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
    const newColumns = this.resortColumns(columns);
    this.addPushedVariable(
      this.tableColumnsVar.name,
      this.helper.__engine.createIdentifier(`[${newColumns.map(i => this.useEachColumn(i)).join(", ")}]`),
    );
  }

  private resortColumns(columns: IUniversalTableColumn[]) {
    const fixeds = columns.filter(i => i.fixed !== TableColumnMode.Normal);
    const x = this.getColumnsScrollX(columns);
    if (fixeds.length > 0 || x > 1000) {
      this.addAttributeWithSyntaxText("scroll", JSON.stringify({ x: x > 1000 ? 1000 : x }));
    }
    const newColumns = columns.filter(i => i.fixed === TableColumnMode.Normal);
    newColumns.unshift(...fixeds.filter(i => i.fixed === TableColumnMode.Left));
    newColumns.push(...fixeds.filter(i => i.fixed === TableColumnMode.Right));
    return newColumns;
  }

  private getColumnsScrollX(columns: IUniversalTableColumn[]) {
    let x = 0;
    for (const { width } of columns) {
      if (Utils.is.nullOrUndefined(width)) {
        x += 240;
        continue;
      }
      if (!Number.isNaN(+width)) {
        x += +width;
        continue;
      }
      if (String(width).endsWith("px")) {
        x += +width.slice(0, width.length - 2);
        continue;
      }
    }
    return x;
  }

  private useEachColumn(i: IUniversalTableColumn) {
    const { id: _, ...others } = i;
    this.useFixed(others);
    return `{ ${Object.entries(others)
      .filter(([, v]) => !Utils.is.nullOrUndefined(v))
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ")} }`;
  }

  private useFixed(i: Omit<IUniversalTableColumn, "id">) {
    if (i.fixed !== TableColumnMode.Normal) {
      i.textAlign = <any>`"${i.fixed}"`;
      i.fixed = <any>`"${i.fixed}"`;
    } else {
      delete i.fixed;
    }
  }
}
