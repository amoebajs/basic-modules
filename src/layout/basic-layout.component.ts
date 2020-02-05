import { Component } from "@amoebajs/builder";
import { BasicElement } from "./basic-element.component";
import { Extends } from "@amoebajs/builder/core";

@Component({ name: "basic-layout", displayName: "基础布局", version: "0.0.1-beta.0" })
@Extends(BasicElement)
export class BasicLayout extends BasicElement {}
