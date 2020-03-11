import {
  Directive,
  Input,
  Reference,
  VariableRef,
  JsxElementGenerator,
  JsxExpressionGenerator,
  Utils,
} from "@amoebajs/builder";
import { ZentDirective } from "../base/base.directive";
import { IUniversalFormState } from "./form.component";

export enum FormFieldType {
  Text = "text",
  Number = "number",
  Textarea = "textarea",
  Select = "select",
  Switch = "switch",
  Checkbox = "checkbox",
}

export interface IUniversalFormField {
  id: VariableRef;
  element: JsxElementGenerator | JsxExpressionGenerator;
}

@Directive({
  name: "universal-form-field",
  displayName: "通用表单字段",
  parent: ZentDirective,
})
export class UniversalFormField extends ZentDirective<IUniversalFormState> {
  @Reference("form-field-id")
  protected formFieldUniqueId!: VariableRef;

  @Reference("text-input")
  protected formFieldTextInput!: VariableRef;

  @Reference("textarea-input")
  protected formFieldTextareaInput!: VariableRef;

  @Reference("number-input")
  protected formFieldNumberInput!: VariableRef;

  @Input({ name: "name", required: true })
  public formFieldName!: string;

  @Input({ name: "label" })
  public formFieldLabel!: string;

  @Input({ name: "type", required: true, useEnums: Utils.getEnumValues(FormFieldType) })
  public formFieldType: FormFieldType = FormFieldType.Text;

  @Input({ name: "placeholder" })
  public formFieldPlaceholder!: string;

  @Input({ name: "value" })
  public formFieldDefaultValue!: any;

  protected async onAttach() {
    const set = this.render.getRootState("formFields");
    if (Utils.is.nullOrUndefined(this.formFieldName) || this.formFieldName === "") {
      throw new Error("[universal-form-field] form-field name cannot be empty.");
    }
    const newChild: IUniversalFormField = (set[this.formFieldUniqueId.name] = {
      id: this.formFieldUniqueId,
      element: null as any,
    });
    const element = this.createNode("jsx-element")
      .addJsxAttr("key", `"${this.formFieldUniqueId.name}"`)
      .addJsxAttr("name", `"${this.formFieldName}"`)
      .addJsxAttr("label", `"${this.formFieldLabel ?? this.formFieldName}"`);
    this.decideGeneration(this.formFieldType, element);
    newChild.element = element;
  }

  private decideGeneration(fieldType: FormFieldType, element: JsxElementGenerator) {
    switch (fieldType) {
      case FormFieldType.Text:
        this.prepareForText(element);
        this.importFormField(element, "FormInputField", this.formFieldTextInput);
        break;
      case FormFieldType.Textarea:
        this.prepareForTextarea(element);
        this.importFormField(element, "FormInputField", this.formFieldTextareaInput);
        break;
      case FormFieldType.Number:
        this.prepareForNumber(element);
        this.importFormField(element, "FormNumberInputField", this.formFieldNumberInput);
        break;
      default:
        break;
    }
  }

  private prepareForText(element: JsxElementGenerator, props: Record<string, any> = {}) {
    element.setTagName(this.formFieldTextInput.name);
    if (!Utils.is.nullOrUndefined(this.formFieldPlaceholder)) {
      element.addJsxAttr(
        "props",
        JSON.stringify({
          ...props,
          placeholder: this.formFieldPlaceholder,
          style: { width: "300px" },
        }),
      );
    }
    if (!Utils.is.nullOrUndefined(this.formFieldDefaultValue)) {
      element.addJsxAttr("defaultValue", `"${this.formFieldDefaultValue}"`);
    }
  }

  private prepareForTextarea(element: JsxElementGenerator) {
    this.prepareForText(element, { type: "textarea" });
  }

  private prepareForNumber(element: JsxElementGenerator, props: Record<string, any> = {}) {
    if (!Utils.is.nullOrUndefined(this.formFieldPlaceholder)) {
      element.addJsxAttr(
        "props",
        JSON.stringify({
          ...props,
          placeholder: this.formFieldPlaceholder,
          style: { width: "300px" },
        }),
      );
    }
    if (!Utils.is.nullOrUndefined(this.formFieldDefaultValue)) {
      element.addJsxAttr("defaultValue", `${this.formFieldDefaultValue}`);
    }
  }

  private importFormField(element: JsxElementGenerator, name: string, id: VariableRef) {
    element.setTagName(id.name);
    const imports = [this.helper.createImport("zent/es/form", undefined, [[name, id.name]])];
    switch (name) {
      case "FormInputField":
      case "FormNumberInputField":
        imports.push(this.helper.createImport("zent/css/input.css"));
        break;
      default:
        break;
    }
    this.addImports(imports);
  }
}
