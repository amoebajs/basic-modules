import ts from "typescript";
import { Utils, Directive, ReactDirective, Input } from "@amoebajs/builder";

@Directive({ name: "custom-click", displayName: "自定义点击" })
export class CustomClickDirective extends ReactDirective {
  @Input()
  public host!: string;

  @Input()
  public eventType: "setState" = "setState";

  @Input()
  public attrName: string = "onClick";

  @Input()
  public targetName!: string;

  @Input()
  public expression: string = "e => e";

  protected async onAttach() {
    try {
      this.render.appendJsxAttribute(this.host!, this.attrName!, ts.createJsxExpression(undefined, this.resolveExpr()));
    } catch (error) {
      // console.log(error);
      /** ignore */
    }
  }

  private resolveExpr() {
    if (!this.targetName) return;
    const [input, output] = this.expression.split("=>").map(i => i.trim());
    if (input.length === 1) {
      const [start, ...others] = output.split(".");
      return ts.createArrowFunction(
        [],
        [],
        [ts.createParameter([], [], undefined, ts.createIdentifier(input), undefined, Utils.TYPES.Any, undefined)],
        undefined,
        undefined,
        ts.createParen(
          ts.createCall(
            ts.createIdentifier("set" + Utils.classCase(this.targetName)),
            [],
            [
              ts.createCall(
                ts.createIdentifier("String"),
                [],
                [
                  others.length > 0
                    ? ts.createPropertyAccess(ts.createIdentifier(start), others.join("."))
                    : ts.createIdentifier(start),
                ],
              ),
            ],
          ),
        ),
      );
    }
    return undefined;
  }
}