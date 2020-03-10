import { Directive, Input, Utils } from "@amoebajs/builder";
import { ZentDirective } from "../base/base.directive";

@Directive({
  name: "component-import",
  displayName: "组件导入指令",
  parent: ZentDirective,
})
export class ZentComponentImportDirective extends ZentDirective {
  @Input()
  public target: string = "button";

  @Input()
  public alias!: string;

  @Input()
  public named!: Record<string, string>;

  protected async onAttach() {
    try {
      if (!this.named) {
        this.named = { [this.target]: this.alias };
      }
      const entries = Object.entries(this.named);
      for (const [target, alias] of entries) {
        this.createNameAliasImport(target, alias);
      }
    } catch (error) {
      /** ignore */
    }
  }

  private createNameAliasImport(target: string, alias?: string) {
    let pathname = target || "";
    let compname = alias || target || "";
    const lidx = pathname.lastIndexOf("/");
    if (lidx > 0) {
      const value = pathname.slice(lidx);
      const entiname = Utils.classCase(value);
      pathname = pathname.slice(0, lidx) + "/" + entiname;
      compname = alias || entiname;
    }
    this.addImports([this.helper.createImport("zent/es/" + pathname, compname)]);
  }
}
