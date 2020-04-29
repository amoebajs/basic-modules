import { Directive, ReactDirective, Input, Utils, Reference, VariableRef } from "@amoebajs/builder";

export enum HttpMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Delete = "DELETE",
}

@Directive({
  name: "http-call",
  displayName: "HTTP调用",
  version: "0.0.1-beta.0",
  dependencies: {
    axios: "^0.19.2",
  },
})
export class HttpCallDirective extends ReactDirective {
  @Input({ name: "method", useEnums: Utils.getEnumValues(HttpMethod) })
  public hcMethod?: HttpMethod;

  @Input({ name: "path" })
  public hcPath!: string;

  @Input({ name: "query", useMap: { key: "string", value: "any" } })
  public hcQuery: Array<[string, string]> = [];

  @Reference("axios")
  protected hcAxiosImport!: VariableRef;

  @Reference("request-name")
  protected hcRequestName!: VariableRef;

  protected async onInit() {
    await super.onInit();
    this.addImports([this.helper.createImport("axios", this.hcAxiosImport.name)]);
  }

  protected async onAttach() {
    await super.onAttach();
    this.render.component.appendVariable(
      this.hcRequestName.name,
      this.helper.__engine.createIdentifier(
        `(options: any = {}) => ${this.hcAxiosImport.name}(${this.createAxiosParams()})`,
      ),
      "unshift",
    );
  }

  private createAxiosParams() {
    const params = {
      url: this.hcPath && `"${this.hcPath}"`,
      method: this.hcMethod && `"${this.hcMethod}"`,
    };
    const content = Object.entries(params)
      .filter(([, v]) => !Utils.is.nullOrUndefined(v))
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ");
    return `{ ${content}${content.length === 0 ? "" : ", "}...options }`;
  }
}
