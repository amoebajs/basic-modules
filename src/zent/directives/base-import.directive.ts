import { Directive, Input, ReactDirective, Utils } from "@amoebajs/builder";

@Directive({ name: "component-import", displayName: "组件导入指令" })
export class ZentComponentImportDirective extends ReactDirective {
  @Input()
  public target: string = "button";

  @Input()
  public alias!: string;

  protected async onAttach() {
    try {
      let pathname = this.target || "";
      let compname = this.alias || this.target || "";
      const lidx = pathname.lastIndexOf("/");
      if (lidx > 0) {
        const value = pathname.slice(lidx);
        const entiname = Utils.classCase(value);
        pathname = pathname.slice(0, lidx) + "/" + entiname;
        compname = this.alias || entiname;
      }
      this.addImports([this.helper.createImport("zent/es/" + pathname, compname)]);
    } catch (error) {
      /** ignore */
    }
  }
}
