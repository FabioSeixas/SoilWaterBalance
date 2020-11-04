import handlebars from 'handlebars';
import fs from 'fs';

import ITemplateMailProvider from '@shared/container/providers/TemplateMailProvider/models/ITemplateMailProvider';
import IParseTemplateMailDTO from '@shared/container/providers/TemplateMailProvider/dtos/IParseTemplateMailDTO';

export default class HandlebarsTemplateMailProvider
  implements ITemplateMailProvider {
  public async parse({
    file,
    variables,
  }: IParseTemplateMailDTO): Promise<string> {
    const template = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}
