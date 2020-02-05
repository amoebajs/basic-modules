import { Component } from "@amoebajs/builder";
import { BasicElement } from "./basic-element.component";

@Component({
  name: "basic-layout",
  displayName: "基础布局",
  version: "0.0.1-beta.0",
  parent: BasicElement,
})
export class BasicLayout extends BasicElement {}
