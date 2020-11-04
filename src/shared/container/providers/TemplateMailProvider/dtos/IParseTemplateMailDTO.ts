interface ITemplateVariables {
  [key: string]: string;
}

export default interface IParseTemplateMailDTO {
  template: string;
  variables: ITemplateVariables;
}
