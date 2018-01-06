const repositoryBase = 'https://github.com/Jack-Q/PreTTY';
const wikiBase = repositoryBase + '/wiki';
const definedUrlMap = {
  Repository: repositoryBase,
  Issues: repositoryBase + '/issues',
  WikiIndex: wikiBase,
  WikiHelpIdentityCreatePage: wikiBase + '/create_identity',
};

export const getDefinedExternalUrl = (urlKey: keyof typeof definedUrlMap): string => {
  return definedUrlMap[urlKey];
};
