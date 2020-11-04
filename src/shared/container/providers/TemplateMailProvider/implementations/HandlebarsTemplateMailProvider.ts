import handlebars from 'handlebars';

import ITemplateMailProvider from '@shared/container/providers/TemplateMailProvider/models/ITemplateMailProvider';
import IParseTemplateMailDTO from '@shared/container/providers/TemplateMailProvider/dtos/IParseTemplateMailDTO';

export default class HandlebarsTemplateMailProvider
  implements ITemplateMailProvider {
  public async parse({
    template,
    variables,
  }: IParseTemplateMailDTO): Promise<string> {
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}
