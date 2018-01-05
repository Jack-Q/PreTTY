import { defineActionMethod } from '../service/action-service';
import { IApplicationActionClass } from '../model/action';
import { openLink } from '../util/open-external';

@defineActionMethod({ key: 'github-repo', displayName: 'Check source of PreTTY at GitHub' })
export class GitHubRepoAction implements IApplicationActionClass {

  public actionBody(params: any) {
    openLink('https://github.com/Jack-Q/PreTTY');
  }
}
