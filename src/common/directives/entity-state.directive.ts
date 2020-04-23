import { Utils, Directive, ReactDirective, Input, BasicState, VariableGenerator } from "@amoebajs/builder";

@Directive({
  name: "entity-state",
  displayName: "模块状态",
  version: "0.0.1-beta.0",
})
export class EntityStateDirective extends ReactDirective {
  @Input({ name: "state", useMap: { key: "string", value: "any" } })
  defaultStates: Array<[string, any]> = [];

  @Input({ name: "name" })
  defaultStateName: string = "__CONTEXT__";

  private get engine() {
    return this.helper.__engine;
  }

  protected async onInit() {
    await super.onInit();
    this.render.component.setState(BasicState.ContextInfo, {
      name: this.defaultStateName,
    });
  }

  protected async onAttach() {
    await super.onAttach();
    this.createStates();
    // 延迟创建上下文对象，可以更好的收集变量
    this.render.component.appendFnBeforeRender(() => {
      this.render.component.appendVariable(this.defaultStateName, this.createContextBody());
    });
  }

  private createContextBody() {
    return this.engine.createObjectLiteral([
      this.engine.createPropertyAssignment(Utils.REACT.State, this.createState()),
    ]);
  }

  private createStates() {
    this.defaultStates.forEach(([name, value]) => this.render.component.appendState(name, value));
  }

  private createState() {
    return this.engine.createObjectLiteral(
      this.render.component.getStates().map(i => {
        const name = getReactStateName(i);
        return this.engine.createPropertyAssignment(
          name,
          this.engine.createObjectLiteral([
            this.engine.createPropertyAssignment("value", this.engine.createIdentifier(name)),
            this.engine.createPropertyAssignment(
              "setState",
              this.engine.createIdentifier("set" + Utils.classCase(name)),
            ),
          ]),
        );
      }),
    );
  }
}

/**
 * ### 指令已废弃，请使用`EntityStateDirective`代替
 *
 * @deprecated replace with `entity-state`
 * @author Big Mogician
 * @export
 * @class GlobalStateDirective
 * @extends {EntityStateDirective}
 */
@Directive({
  name: "global-state",
  displayName: "全局状态（废弃）",
  version: "0.0.1-beta.0",
})
export class GlobalStateDirective extends EntityStateDirective {}

function getReactStateName(variable: VariableGenerator) {
  // 获取第一个变量内部名（arrayBinding形式的变量是没有名字的，是一个_nxxx的内部名）
  const placeholder = Object.keys(variable["variables"])[0];
  // 获取真实的react组件state名称
  return variable["variables"][placeholder].arrayBinding[0];
}
