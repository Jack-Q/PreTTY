import { defineActionMethod } from '../service/action-service';
import { IApplicationActionClass } from '../model/action';
import { openLink } from '../util/open-external';
import { getDefinedExternalUrl } from '../config/url-config';

@defineActionMethod({ key: 'github-issue', displayName: 'Feedback and report issues at GitHub' })
export class GitHubIssueAction implements IApplicationActionClass {

  public actionBody(params: any) {
    openLink(getDefinedExternalUrl('Issues'));
  }
}
