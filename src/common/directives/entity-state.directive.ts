import { Directive, ReactDirective, Input, BasicState } from "@amoebajs/builder";

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

  protected async onInit() {
    await super.onInit();
    this.render.component.setState(BasicState.ContextInfo, {
      name: this.defaultStateName,
      emit: true,
    });
  }

  protected async onAttach() {
    await super.onAttach();
    this.createStates();
  }

  private createStates() {
    this.defaultStates.forEach(([name, value]) => this.render.component.appendState(name, JSON.stringify(value)));
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
