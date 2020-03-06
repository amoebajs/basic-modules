import { Directive, Input } from "@amoebajs/builder";
import { ZentDirective } from "../base/base.directive";

@Directive({
  name: "loading",
  displayName: "Loading指令",
  parent: ZentDirective,
})
export class ZentLoadingDirective extends ZentDirective {
  @Input({ name: "name" })
  public stateName: string = "loading";

  protected async onAttach() {
    await super.onAttach();
    this.addImports([
      this.helper.createImport("zent/es/loading/BlockLoading", this.uniqueToken),
      this.helper.createImport("zent/css/loading.css"),
    ]);
    const loadingBind = this.render.createStateAccessSyntax(this.stateName);
    this.render.appendRootEleChangeFns(pageRoot =>
      this.createNode("jsx-element")
        .setTagName(this.uniqueToken)
        .addJsxAttr("loading", loadingBind)
        .addJsxChildren([pageRoot]),
    );
  }
}
