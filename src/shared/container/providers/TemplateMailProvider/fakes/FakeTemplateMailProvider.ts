import ITemplateMailProvider from '@shared/container/providers/TemplateMailProvider/models/ITemplateMailProvider';
import IParseTemplateMailDTO from '@shared/container/providers/TemplateMailProvider/dtos/IParseTemplateMailDTO';

export default class FakeTemplateMailProvider implements ITemplateMailProvider {
  public async parse({ file }: IParseTemplateMailDTO): Promise<string> {
    return file;
  }
}
