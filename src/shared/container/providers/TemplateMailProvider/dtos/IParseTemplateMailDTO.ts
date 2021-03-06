interface ITemplateVariables {
  [key: string]: string;
}

export default interface IParseTemplateMailDTO {
  file: string;
  variables: ITemplateVariables;
}
