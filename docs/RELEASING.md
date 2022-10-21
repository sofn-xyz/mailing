## Releasing new versions

### Release a beta version
git checkout -b pre-$(date +%Y%m%d)
yarn changeset pre enter next
yarn changeset
yarn changeset version
yarn release

### Release a major/minor/patch version
git checkout -b v{NEW.VERSION.NUMBER}
yarn changeset
git add . && git commit
yarn changeset version
yarn release