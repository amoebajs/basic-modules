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
      this.createNameAliasImport(this.target, this.alias || this.target);
      if (!this.named) {
        return;
      }
      const entries = Object.entries(this.named);
      for (const [alias, target] of entries) {
        this.createNameAliasImport(target, alias, "named");
      }
    } catch (error) {
      /** ignore */
    }
  }

  private createNameAliasImport(target: string, alias: string, type: "default" | "named" = "default") {
    let pathname = target || "";
    let compname = alias || "";
    const useAlias = alias !== target;
    const lidx = pathname.lastIndexOf("/");
    if (lidx > 0) {
      const value = pathname.slice(lidx);
      const entiname = Utils.classCase(value);
      pathname = pathname.slice(0, lidx) + "/" + entiname;
      compname = useAlias ? alias : entiname;
    }
    if (type === "default") {
      this.addImports([this.helper.createImport("zent/es/" + pathname, compname)]);
    } else {
      this.addImports([this.helper.createImport("zent/es/" + pathname, undefined, [compname])]);
    }
  }
}
