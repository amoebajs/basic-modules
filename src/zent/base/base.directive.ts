import { ReactDirective, Directive, IBasicReactContainerState as IT } from "@amoebajs/builder";

@Directive({ name: "directive-base", displayName: "Zent基础指令" })
export class ZentDirective<T extends Record<string, any> = {}> extends ReactDirective<T & IT<{}>> {}
