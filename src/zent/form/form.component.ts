import { Component, Require, Reference, VariableRef, IAfterInit, IAfterDirectivesAttach } from "@amoebajs/builder";
import { ZentBaseCssDirective } from "../directives/base-css.directive";
import { ZentComponent } from "../base/base.component";
import { ZentComponentImportDirective } from "../directives/base-import.directive";
import { IUniversalFormField } from "./form-field.directive";

export interface IUniversalFormState {
  formRefname: string;
  formFields: Record<string, IUniversalFormField>;
}

@Component({
  name: "universal-form",
  displayName: "通用表单",
  parent: ZentComponent,
})
@Require(ZentBaseCssDirective, { target: "form" })
@Require(ZentComponentImportDirective, {
  target: "form",
  named: ({ formStrategy, formRoot }: UniversalForm) => ({
    Form: formRoot.name,
    FormStrategy: formStrategy.name,
  }),
})
export class UniversalForm extends ZentComponent<IUniversalFormState> implements IAfterInit, IAfterDirectivesAttach {
  @Reference("form")
  protected formRoot!: VariableRef;

  @Reference("form-strategy")
  protected formStrategy!: VariableRef;

  @Reference("form-refname")
  protected formRefname!: VariableRef;

  public afterInit() {
    this.setTagName(this.formRoot.name);
    this.setState("formFields", {});
    this.setState("formRefname", this.formRefname.name);
    this.addAttributeWithSyntaxText("form", this.formRefname.name);
    this.addAttributeWithSyntaxText("layout", `"${"horizontal"}"`);
    this.addUnshiftVariable(this.formRefname.name, this.createRefExpression());
  }

  private createRefExpression() {
    const strategy = `${this.formRoot.name}.useForm<any, any, any>(${this.formStrategy.name}.View)`;
    return this.helper.__engine.createIdentifier(strategy);
  }

  public afterDirectivesAttach() {
    super.afterDirectivesAttach();
    const set = this.render.getRootState("formFields");
    const entries = Object.entries(set);
    for (const [key, entry] of entries) {
      this.addRenderChildren(key, <any>entry.element);
    }
  }
}
