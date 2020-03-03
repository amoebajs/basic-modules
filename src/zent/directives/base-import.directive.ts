import { Directive, Input, ReactDirective, Utils } from "@amoebajs/builder";

@Directive({ name: "component-import", displayName: "组件导入指令" })
export class ZentComponentImportDirective extends ReactDirective {
  @Input()
  public target: string = "button";

  @Input()
  public alias!: string;

  protected async onAttach() {
    try {
      this.addImports([
        this.helper.createImport("zent/es/" + Utils.kebabCase(this.target), this.alias || Utils.classCase(this.target)),
      ]);
    } catch (error) {
      /** ignore */
    }
  }
}
