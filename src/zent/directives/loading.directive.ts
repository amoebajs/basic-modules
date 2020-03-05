import { Directive, ReactDirective, Input, BasicState } from "@amoebajs/builder";

@Directive({ name: "loading", displayName: "Loading指令" })
export class ZentLoadingDirective extends ReactDirective {
  @Input({ name: "name" })
  public stateName: string = "loading";

  private get targetName() {
    return this.entityId + "_Import";
  }

  protected async onAttach() {
    await super.onAttach();
    this.addImports([
      this.helper.createImport("zent/es/loading/BlockLoading", this.targetName),
      this.helper.createImport("zent/css/loading.css"),
    ]);
    const loadingBind = this.render.createStateAccessSyntax(this.stateName);
    this.render.appendRootEleChangeFns(pageRoot =>
      this.createNode("jsx-element")
        .setTagName(this.targetName)
        .addJsxAttr("loading", loadingBind)
        .addJsxChildren([pageRoot]),
    );
  }
}
