import { defineActionMethod } from '../service/action-service';
import { IApplicationActionClass } from '../model/action';
import { openLink } from '../util/open-external';
import { getDefinedExternalUrl } from '../config/url-config';

@defineActionMethod({ key: 'github-wiki', displayName: 'Document about PreTTY' })
export class GitHubWikiAction implements IApplicationActionClass {

  public actionBody(params: any) {
    openLink(getDefinedExternalUrl('WikiIndex'));
  }
}
