import { Directive, Input } from "@amoebajs/builder";
import { ZentDirective } from "../base/base.directive";
import { IUniversalFormState } from "./form.component";

@Directive({
  name: "universal-form-field",
  displayName: "通用表单字段",
  parent: ZentDirective,
})
export class UniversalFormField extends ZentDirective<IUniversalFormState> {
  @Input({ name: "name" })
  public formFieldName!: string;

  @Input({ name: "label" })
  public formFieldLabel!: string;

  @Input({ name: "placeholder" })
  public formFieldPlaceholder!: string;

  protected async onAttach() {
    const set = this.render.getRootState("formFields");
    set[this.formFieldName] = {
      name: this.formFieldName,
      label: this.formFieldLabel || this.formFieldName,
      placeholder: this.formFieldPlaceholder || "",
    };
  }
}
