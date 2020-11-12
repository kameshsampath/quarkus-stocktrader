# cirrus-vue
This repository contains a set of reusable vue components for cirrus. The goal is to speed up the prototyping process by using vuejs framework.

> A port of [Cirrus](https://cirrus-design.stage1.mybluemix.net/) on Vue.js

The current deployment of Cirrus Vue can be found here https://cirrus-vue.stage1.mybluemix.net/index.html

### First use
In case you haven't used this package before, you will first need to configure your NPM to find packages from @hybrid-cloud in the Whitewater internal NPM repository:

```
npm login --registry=https://npm-registry.whitewater.ibm.com --scope=@hybrid-cloud --auth-type=oauth
```

You'll be asked credentials. Enter Github Enterprise username (all lowercase), your W3 Intranet password (since Github uses SSO), and your IBM email address.

Run `npm install`. If this build fails, you might be asked to go to a link to authorize Github with Whitewater NPM.

Once that is authorized, try the following build steps below. If you experience further issues, check that your global `.npmrc` file is not preventing you from installing packages.


## Running locally
The .npmrc file requires the environment variable NPM_TOKEN, however it can be blank. Either set blank at the command line or in your .bash_profile file.

e.g.
``` bash
export NPM_TOKEN=''
```

You have two options
``` bash
npm run dev
```

Or using a server package such as harp

``` bash
npm run build
harp server dist
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

This package is published to whitewater npm registry
https://npm.whitewater.ibm.com/package/cirrus-vue

You can add the module dev dependency cirrus-vue in your package.json file to consume it.
To use cirrus vue components, you can

``` javascript
import CirrusVue from '../node_modules/@hybrid-cloud/cirrus-vue/src/components/index'

Vue.use(CirrusVue)
```

Note: You still need to import cirrus stylesheet and supporting javascript. E.g.

``` javascript
  @import '~@hybrid-cloud/cirrus/dist/css/cirrus.min.css';

  // Here is a quick way to import cirrus javascript without adding script tag. In your main component:

  mounted() {
    require('../node_modules/@hybrid-cloud/cirrus/dist/js/cirrus.es5.js');
  },

```

## Commiters
- ypyheng@us.ibm.com
- lee.chase@uk.ibm.com
- rodet@de.ibm.com

## Contributing

### Task management
Via GitHub issues using ZenHub plugin pipelines.

Link to ZenHub download: https://zenhub.innovate.ibm.com/setup/download

-
### General

If you're part of Hybrid Cloud Design FED team, you can contribute to the repository without forking this to your own repository. The process using GitHub Desktop tool is described here: https://ibm.ent.box.com/notes/167835869458

Otherwise, if you prefer to fork it your own repository, here are the steps:
1. Fork the repository
  1. Once forked clone locally using the SSH clone URL
    - ```git clone <URL>```
  2. Link to upstream
    - ```git remote add upstream git@github.ibm.com:cloud-integration-design/cirrus-vue.git```
2. Select or create an issue and assign yourself to it
3. Select your develop branch
  - ```git checkout develop```
4. Ensure your develop branch is up to date. If you never commit any changes to develop, then you should always be able to update it as follows.
  1. ```git fetch upstream```
  2. ```git merge upstream/develop```
  3. ```git push```
5. Create a feature branch
  1. git checkout -b feature/<feature name>
  2. do something useful :smirk:
  3. Add and commit your changes regularly, this is only local at this point.
    - ```git add .``` to add all changes
    - ```git add <fileName>``` to add specific changes
    - ```git commit -m 'comment about the commit'```
6. Submit pull requests to the develop branch of https://github.ibm.com/cloud-integration-design/cirrus-vue
  1. Push branch to your fork
    - ```git push -u origin feature/<feature name>``` the first time you push
    - ```git push``` for subsequent pushes
  2. Go to https://github.ibm.com/cloud-integration-design/cirrus-vue or your own fork and raise a pull requst. Github will offer you recent new branches at the URL above. Don't forget to add some comments and mention which issue you're addressing.
  3. Discuss, revise, close, reject or merge (not everyone can merge to develop). While in the dicuss/revise phase you can push more updates to the branch by simply typing ```git push``` at the command line
7. Rince and repeat from step 3.

### So you need to rebase
You've made some changes but there are conflicts in your pull request.

1. Select and update your develop branch
  1. ```git checkout develop```
  2. ```git fetch upstream```
  3. ```git merge upstream/develop```
  4. ```git push```
2. ```git checkout <yourBranch>```
3. ```git rebase develop```
  - This replays your changes over develop (in your branch) one commit at a time
4. If there were conflicts then you'll need to resolve them
  - Same as any merge
5. When done ```git rebase --continue```
6. Repeat 4 and 5 until there are no conflicts
7. ```git push```

Your PR should no longer have conflicts.
.
