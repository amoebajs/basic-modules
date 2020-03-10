import { Component, Require, Input, Attach, Reference, PropAttach, VariableRef, IAfterInit } from "@amoebajs/builder";
import { ZentBaseCssDirective } from "../directives/base-css.directive";
import { ZentComponent } from "../base/base.component";
import { ZentComponentImportDirective } from "../directives/base-import.directive";

export interface IUniversalFormField {
  name: string;
  label: string;
  placeholder: string;
}

export interface IUniversalFormState {
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
export class UniversalForm extends ZentComponent<IUniversalFormState> implements IAfterInit {
  @Reference("form-root")
  protected formRoot!: VariableRef;

  @Reference("form-strategy")
  protected formStrategy!: VariableRef;

  @Reference("form-refname")
  protected formRefname!: VariableRef;

  public afterInit() {
    const strategy = `${this.formRoot.name}.useForm<any, any, any>(${this.formStrategy.name}.View)`;
    this.setTagName(this.formRoot.name);
    this.addUnshiftVariable(this.formRefname.name, this.helper.__engine.createIdentifier(strategy));
    this.addAttributeWithSyntaxText("form", this.formRefname.name);
  }

  // protected onChildrenVisit(key: string) {
  //   const displayWith = this.displayWith.get(key);
  //   if (!displayWith || displayWith === "") {
  //     return;
  //   }
  //   return {
  //     newDisplayRule: this.render.createStateAccessSyntax(displayWith),
  //   };
  // }
}
