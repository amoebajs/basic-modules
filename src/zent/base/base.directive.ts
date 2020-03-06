import { ReactDirective, Directive } from "@amoebajs/builder";

@Directive({ name: "directive-base", displayName: "Zent基础指令" })
export class ZentDirective extends ReactDirective {
  protected get uniqueToken() {
    return "ZentDirective_" + this.entityId;
  }
}
