import { DOMS, getEnumValues } from "@amoebajs/builder/utils";
import { Component, ReactComponent, Group, Input } from "@amoebajs/builder";

export enum Position {
  Top = "top",
  Bottom = "bottom",
  Left = "left",
  Right = "right",
  All = "all",
}

export const PositionStringRules = {
  key: getEnumValues(Position),
  value: "string",
};

@Component({
  name: "basic-element",
  displayName: "基础组件",
  version: "0.0.1-beta.0",
})
@Group({ name: "basic", displayName: "基础属性" })
export class BasicElement extends ReactComponent {
  @Input({ name: "width", group: "basic", displayName: "组件宽度" })
  layoutWidth!: string;

  @Input({ name: "height", group: "basic", displayName: "组件高度" })
  layoutHeight!: string;

  @Input({ name: "background", group: "basic", displayName: "背景色" })
  layoutBackground: string = "transparent";

  @Input({
    name: "borderStyle",
    group: "basic",
    displayName: "边框风格",
    useMap: PositionStringRules,
  })
  layoutBorderStyle: Array<[Position, string]> = [[Position.All, "solid"]];

  @Input({
    name: "borderColor",
    group: "basic",
    displayName: "边框颜色",
    useMap: PositionStringRules,
  })
  layoutBorderColor: Array<[Position, string]> = [[Position.All, "transparent"]];

  @Input({
    name: "borderWidth",
    group: "basic",
    displayName: "边框尺寸",
    useMap: PositionStringRules,
  })
  layoutBorderWidth: Array<[Position, string]> = [];

  @Input({
    name: "padding",
    group: "basic",
    displayName: "内边距",
    useMap: PositionStringRules,
  })
  layoutPadding: Array<[Position, string]> = [];

  @Input({
    name: "margin",
    group: "basic",
    displayName: "外边距",
    useMap: PositionStringRules,
  })
  layoutMargin: Array<[Position, string]> = [];

  async onInit() {
    await super.onInit();
    this.setTagName(DOMS.Div);
    this.addAttributesWithMap({ style: this.resolveRootElementStyle() });
  }

  protected resolveRootElementStyle() {
    return this.helper.createReactPropsMixinAccess("style", this.getElementSelfStyle());
  }

  protected getElementSelfStyle(): Record<string, string | number> {
    return {
      display: "block",
      height: this.layoutHeight,
      width: this.layoutWidth,
      background: this.layoutBackground,
      ...this.getElementBorder(),
      ...this.getElementMargin(),
      ...this.getElementPadding(),
    };
  }

  protected resolvePositions(pos: [Position, string][]) {
    const positionAll = pos.find(i => i[0] === Position.All);
    const defaults = (positionAll && positionAll[1]) ?? "0px";
    const { top, bottom, left, right } = pos.reduce<any>((p, c) => ({ ...p, [c[0]]: c[1] }), {});
    return `${top || defaults} ${right || defaults} ${bottom || defaults} ${left || defaults}`;
  }

  protected getElementBorder() {
    return {
      borderWidth: this.resolvePositions(this.layoutBorderWidth),
      borderStyle: this.resolvePositions(this.layoutBorderStyle),
      borderColor: this.resolvePositions(this.layoutBorderColor),
    };
  }

  protected getElementMargin() {
    return {
      margin: this.resolvePositions(this.layoutMargin),
    };
  }

  protected getElementPadding() {
    return {
      padding: this.resolvePositions(this.layoutPadding),
    };
  }
}
