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
