import { defineActionMethod } from '../service/action-service';
import { IApplicationActionClass } from '../model/action';
import { openLink } from '../util/open-external';

@defineActionMethod({ key: 'github-wiki', displayName: 'Document about PreTTY' })
export class GitHubWikiAction implements IApplicationActionClass {

  public actionBody(params: any) {
    openLink('https://github.com/Jack-Q/PreTTY/wiki');
  }
}
