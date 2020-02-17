import { Component, ReactComponent, Input, Utils } from "@amoebajs/builder";

type Decide = "||" | "??";

export enum ZentButtonType {
  Default = "default",
  Primary = "primary",
  Danger = "danger",
  Success = "success",
}

export enum ZentButtonSize {
  Medium = "medium",
  Large = "large",
  Small = "small",
}

export enum ZentButtonHtmlType {
  Button = "button",
  Submit = "submit",
  Reset = "reset",
}

@Component({ name: "button", displayName: "按钮" })
export class ZentButtonComponent extends ReactComponent {
  @Input({ name: "className", useEnums: v => typeof v === "string" })
  ztClassName: string[] = [];

  @Input({ name: "style", useMap: { key: "string", value: "string" } })
  ztStyle: Array<[string, string]> = [];

  @Input({ name: "type" })
  ztType: ZentButtonType = ZentButtonType.Default;

  @Input({ name: "size" })
  ztSize: ZentButtonSize = ZentButtonSize.Medium;

  @Input({ name: "block" })
  ztBlock: boolean = false;

  @Input({ name: "outline" })
  ztOutline: boolean = false;

  @Input({ name: "bordered" })
  ztBordered: boolean = true;

  @Input({ name: "disabled" })
  ztDisabled: boolean = false;

  @Input({ name: "loading" })
  ztLoading: boolean = false;

  @Input({ name: "htmltype" })
  ztHtmlType: ZentButtonHtmlType = ZentButtonHtmlType.Button;

  protected async onInit() {
    await super.onInit();
    const ButtonRefName = "Button";
    const ButtonAliasname = "ZentButton";
    this.addImports(
      this.helper.createFrontLibImports({
        libRoot: "es",
        styleRoot: "css",
        module: "zent",
        imports: [[ButtonRefName, ButtonAliasname]],
      }),
    );
    this.setTagName(ButtonAliasname);
    const styles = this.useArrayMap(this.ztStyle);
    this.addAttributesWithSyntaxMap({
      // 覆盖zent按钮的组合样式
      style: this.useObjectProp("style", { marginLeft: 0, ...styles }),
      className: this.useStringProp("className", this.ztClassName),
      type: this.useStringProp("type", this.ztType),
      size: this.useStringProp("size", this.ztSize),
      htmlType: this.useStringProp("htmlType", this.ztHtmlType),
      block: this.useBooleanProp("block", this.ztBlock),
      disabled: this.useBooleanProp("disabled", this.ztDisabled),
      loading: this.useBooleanProp("loading", this.ztLoading),
      outline: this.useBooleanProp("outline", this.ztOutline),
      bordered: this.useBooleanProp("bordered", this.ztBordered),
      target: this.useStringProp("target", ""),
      href: "props.href",
      download: "props.download",
      onClick: "props.onClick",
    });
    this.addRenderPushedChild(this.createNode("jsx-expression").setExpression("props.children"));
  }

  private useStringProp(prop: string, input: string[] | string | boolean, decide: Decide = "||"): string {
    let value = "";
    if (Utils.is.array(input)) value = input.join(" ");
    else value = String(input);
    return this.useDefaultProp(prop, `"${value}"`, decide);
  }

  private useBooleanProp(prop: string, value: boolean | string, decide: Decide = "||"): string {
    return this.useDefaultProp(prop, String(value) === "true", decide);
  }

  private useDefaultProp(prop: string, defaultValue: any, decide: Decide = "||"): string {
    return `props.${prop} ${decide} ${defaultValue}`;
  }

  private useObjectProp(prop: string, value: Record<string, any>) {
    return `{ ...(${JSON.stringify(value)}), ...props.${prop} }`;
  }

  private useArrayMap(values: Array<[string, any]>): Record<string, any> {
    return values.reduce((p, c) => ({ ...p, [c[0]]: c[1] }), {});
  }
}
