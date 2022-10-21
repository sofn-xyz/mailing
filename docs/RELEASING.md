## Releasing new versions

### Release a beta version
git checkout -b pre-$(date +%Y%m%d)
yarn changeset pre enter next
yarn changeset # if there is no new changeset
yarn changeset version
yarn release

### Release a major/minor/patch version
git checkout main
yarn changeset # if there is no new changeset
git add . && git commit
yarn changeset version
yarn release
git commit -am v{NEW.VERSION.NUMBER}
git push
git checkout -b v{NEW.VERSION.NUMBER}
git push # for posterity / future debugging