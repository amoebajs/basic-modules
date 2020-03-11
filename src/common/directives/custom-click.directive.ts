import ts from "typescript";
import { Directive, ReactDirective, Input, BasicState, IComplexLogicDefine } from "@amoebajs/builder";

@Directive({ name: "custom-click", displayName: "自定义点击" })
export class CustomClickDirective extends ReactDirective {
  @Input({ required: true })
  public host!: string;

  @Input()
  public attrName: string = "onClick";

  @Input({ useExpression: true })
  public expression: IComplexLogicDefine = { expressions: [] };

  protected async onAttach() {
    try {
      this.render.appendJsxAttribute(
        this.host!,
        this.attrName!,
        this.helper.createJsxArrowEventHandler(
          ts.createIdentifier(
            this.helper.useComplexLogicExpression(
              { type: "complexLogic", expression: this.expression },
              this.render.getRootState(BasicState.ContextInfo).name,
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
