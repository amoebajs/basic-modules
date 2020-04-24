import { Directive, ReactDirective, Input, BasicState, IComplexLogicDefine } from "@amoebajs/builder";

@Directive({ name: "custom-click", displayName: "自定义点击" })
export class CustomClickDirective extends ReactDirective {
  @Input({ required: true })
  public host!: string;

  @Input()
  public attrName: string = "onClick";

  @Input({ useExpression: true })
  public expression: IComplexLogicDefine = { expressions: [] };

  private get engine() {
    return this.helper.__engine;
  }

  protected async onAttach() {
    try {
      this.render.component.appendJsxAttribute(
        this.host!,
        this.attrName!,
        this.helper.createJsxArrowEventHandler(
          this.engine.createIdentifier(
            this.helper.useComplexLogicExpression(
              this.expression,
              this.render.component.getState(BasicState.ContextInfo).name,
            ),
          ),
        ),
      );
    } catch (error) {
      // console.log(error);
      /** ignore */
    }
  }
}
