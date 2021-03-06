import { Attach, Component, Input, PropAttach, Group } from "@amoebajs/builder";
import { BasicLayout } from "./basic-layout.component";

const isDoubleBigThanOne = (v: any) => {
  const num = parseFloat(v);
  return !Number.isNaN(num) && num >= 1;
};

const isDoubleBetweenOneAnd100 = (v: any) => {
  const num = parseInt(v, 10);
  return !Number.isNaN(num) && num >= 1;
};

const ValidRange = {
  key: isDoubleBigThanOne,
  value: isDoubleBetweenOneAnd100,
};

@Component({
  name: "grid-layout",
  displayName: "网格布局",
  version: "0.0.1-beta.0",
  parent: BasicLayout,
})
@Group({ name: "grid", displayName: "网格属性" })
export class GridLayout extends BasicLayout {
  /**
   * ### 行数量
   * - 默认值：`1`
   **/
  @Input({ name: "rowCount", group: "grid", displayName: "行数量" })
  gridRowCount: number = 1;

  /**
   * ### 列数量
   * - 默认值：`1`
   **/
  @Input({ name: "columnCount", group: "grid", displayName: "列数量" })
  gridColumnCount: number = 1;

  /**
   * ### 行间隔
   * - 单位：`px` / `vw` / `vh` / `vh`
   * - 默认值：`"0px"`
   **/
  @Input({ name: "rowGap", group: "grid", displayName: "行间隔" })
  gridRowGap: string = "0px";

  /**
   * ### 列间隔
   * - 单位：`px` / `vw` / `vh` / `vh`
   * - 默认值：`"0px"`
   **/
  @Input({ name: "columnGap", group: "grid", displayName: "列间隔" })
  gridColumnGap: string = "0px";

  /**
   * ### 行尺寸
   * - 单位：`px` / `vw` / `vh` / `vh` / `undefined`
   * - 默认值：`["1", "100"]`
   **/
  @Input({ name: "rowSizes", group: "grid", displayName: "行尺寸", useMap: ValidRange })
  gridRowSizes: Array<[string, string | number]> = [["1", "100"]];

  /**
   * ### 列尺寸
   * - 单位：`px` / `vw` / `vh` / `vh` / `undefined`
   * - 默认值：`["1", "100"]`
   **/
  @Input({ name: "columnSizes", group: "grid", displayName: "列尺寸", useMap: ValidRange })
  gridColumnSizes: Array<[string, string | number]> = [["1", "100"]];

  /**
   * ### 行跨度
   * - @attach
   * - 默认值：`1`
   **/
  @Attach({ name: "rowSpan", displayName: "行跨度" })
  childRowSpan: PropAttach<number | string> = new PropAttach(1);

  /**
   * ### 列跨度
   * - @attach
   * - 默认值：`1`
   **/
  @Attach({ name: "columnSpan", displayName: "列跨度" })
  childColumnSpan: PropAttach<number | string> = new PropAttach(1);

  /**
   * ### 行起始位置
   * - @attach
   * - 默认值：`1`
   **/
  @Attach({ name: "rowStart", displayName: "行起始位置" })
  childRowStart: PropAttach<number | string> = new PropAttach(1);

  /**
   * ### 行结束位置
   * - @attach
   * - 默认值：`1`
   **/
  @Attach({ name: "columnStart", displayName: "行结束位置" })
  childColumnStart: PropAttach<number | string> = new PropAttach(1);

  protected getElementSelfStyle() {
    return {
      ...super.getElementSelfStyle(),
      display: "grid",
      gridTemplateColumns: this.calcColumnsSize(),
      gridTemplateRows: this.calcRowsSize(),
      gridRowGap: this.gridRowGap,
      gridColumnGap: this.gridColumnGap,
    };
  }

  protected onChildrenVisit(key: string, generator: import("@amoebajs/builder").JsxElementGenerator) {
    const result = super.onChildrenVisit(key, generator);
    const styles: Record<string, string> = {};
    const cStart = this.childColumnStart.get(key)!;
    const cSpan = this.childColumnSpan.get(key)!;
    const rStart = this.childRowStart.get(key)!;
    const rSpan = this.childRowSpan.get(key)!;
    if (cStart) {
      styles["gridColumn"] = `${cStart} / span ${cSpan}`;
    }
    if (rStart) {
      styles["gridRow"] = `${rStart} / span ${rSpan}`;
    }
    const styleAttr = generator.getJsxAttr("style");
    // 没有style参数，直接创建
    if (styleAttr === null) {
      generator.addJsxAttr("style", () => this.helper.createObjectLiteral(styles));
      return;
    }
    const style = styleAttr.getValue();
    // style参数通过函数创建，这里使用后处理来直接修改AST结构
    if (typeof style === "function") {
      this.render.component.appendJsxStyles(generator, styles);
    } else {
      // 不存在或者不支持处理其他的情况
    }
    return result;
  }

  private calcRowsSize() {
    return this.gridRowSizes
      .sort((a, b) => parseFloat(<any>a[0]) - parseFloat(<any>b[0]))
      .map(([, v]) => v + "%")
      .join(" ");
  }

  private calcColumnsSize() {
    return this.gridColumnSizes
      .sort((a, b) => parseFloat(<any>a[0]) - parseFloat(<any>b[0]))
      .map(([, v]) => v + "%")
      .join(" ");
  }
}
