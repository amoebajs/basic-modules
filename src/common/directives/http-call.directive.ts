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
  @Input({ name: "name", useEnums: Utils.getEnumValues(HttpMethod) })
  public hcMethod: HttpMethod = HttpMethod.Get;

  @Input({ name: "path", required: true })
  public hcPath!: string;

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
    this.render.appendRootVariable(
      this.hcRequestName.name,
      this.helper.__engine.createIdentifier(`() => ${this.hcAxiosImport.name}(${this.createAxiosParams()})`),
      "unshift",
    );
  }

  private createAxiosParams() {
    if (Utils.is.nullOrUndefined(this.hcPath)) {
      throw new Error("[http-call] axios url path cannot be empty.");
    }
    const params = {
      url: `"${this.hcPath}"`,
      method: `"${this.hcMethod}"`,
    };
    return `{ ${Object.entries(params)
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ")} }`;
  }
}
