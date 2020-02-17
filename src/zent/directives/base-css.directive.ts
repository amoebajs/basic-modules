import { Directive, Input, ReactDirective } from "@amoebajs/builder";

@Directive({ name: "base-css", displayName: "基础样式指令" })
export class ZentBaseCssDirective extends ReactDirective {
  @Input()
  public target: string = "base";

  protected async onAttach() {
    try {
      this.addImports([this.createNode("import").setModulePath(`zent/css/${this.target}.css`)]);
    } catch (error) {
      /** ignore */
    }
  }
}
