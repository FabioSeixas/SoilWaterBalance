import IParseTemplateMailDTO from '@shared/container/providers/TemplateMailProvider/dtos/IParseTemplateMailDTO';

export default interface ITemplateMailProvider {
  parse(data: IParseTemplateMailDTO): Promise<string>;
}
