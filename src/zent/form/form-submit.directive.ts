import { Directive, Reference, Input, VariableRef, Utils } from "@amoebajs/builder";
import { ZentDirective } from "../base/base.directive";
import { IUniversalFormState } from "./form.component";

export enum FormSubmitType {
  Console = "console",
}

@Directive({
  name: "universal-form-submit",
  displayName: "通用表单提交",
  parent: ZentDirective,
})
export class UniversalFormSubmit extends ZentDirective<IUniversalFormState> {
  @Reference("button")
  protected formSubmitButton!: VariableRef;

  @Reference("submit")
  protected formSubmitId!: VariableRef;

  @Input({ name: "type", required: true, useEnums: Utils.getEnumValues(FormSubmitType) })
  public formSubmitType: FormSubmitType = FormSubmitType.Console;

  @Input({ name: "text" })
  public formSubmitText!: string;

  protected async onAttach() {
    const refname = this.render.getRootState("formRefname");
    const childset = this.render.getRootState("formFields");
    const element = this.createNode("jsx-element")
      .setTagName(this.formSubmitButton.name)
      .addJsxAttrs({
        key: `"${this.formSubmitId.name}"`,
        type: `"${"primary"}"`,
      });
    if (this.formSubmitType === FormSubmitType.Console) {
      element.addJsxAttr("onClick", `() => console.log(${refname}.getValue())`);
    }
    element.addJsxChild(this.formSubmitText || "确认");
    childset[this.formSubmitButton.name] = {
      id: this.formSubmitId,
      element,
    };
    this.addImports([
      this.helper.createImport("zent/es/button", this.formSubmitButton.name),
      this.helper.createImport("zent/css/button.css"),
    ]);
  }
}
