# Cirrus

[![Build Status](https://travis.ibm.com/cloud-integration-design/cirrus.svg?token=mqW9kfBtqSi8y7Sz35Pa&branch=master)](https://travis.ibm.com/cloud-integration-design/cirrus)

What the heck is Cirrus? Cirrus is the UI component library for Hybrid Cloud products. Cirrus is a collection of reusable HTML/CSS/JS components that can be used to prototype and build CI products that live out of Bluemix.

We welcome your feedback! Please reach out to us with your feedback or any improvement suggestions. You can open an issue on the repo: https://github.ibm.com/cloud-integration-design/cirrus. If you are developer, please feel free to submit a pull request.

## Live Demo
http://cirrus-design.stage1.mybluemix.net/


## Setup


### Using as a dependency
In case you haven't used this package before, you will first need to configure
your NPM to find packages from @hybrid-cloud in the Whitewater internal NPM
repository:
```shell
npm login --registry=https://npm-registry.whitewater.ibm.com --scope=@hybrid-cloud --auth-type=oauth
```
If you are encountering problems with that, you can check the full
[Whitewater documentation for NPM](https://github.ibm.com/Whitewater/npm-enterprise).

You can make use of Cirrus styles and scripts in your own projects by including Cirrus as a dependency.
```shell
  npm install @hybrid-cloud/cirrus --save-dev
```


#### [Optional] Reusing the Cirrus styles, mixins and variables in your code

If you are using Sass, add an import like the following. Don't forget to
adapt the path in any case as it will fail to find the colour package in
many situations.

With **Webpack**, use a css-loader referencing the package `~cirrus`:

```css
  @import '~@hybrid-cloud/cirrus/src/scss/index';
```

Using **Gulp**, you need to pass the `node_modules` path to the list of paths to
search for modules with the following Gulp configuration:

```js
.pipe(sass({includePaths: ['node_modules']}))
```

That way you can simply call

```css
  @import '@hybrid-cloud/cirrus/src/scss/index';
```

#### [Preferred] Using the Cirrus styles directly

A ready-to-use version of the Cirrus styles is located in ```node_modules/@hybrid-cloud/cirrus/dist/css/cirrus.min.css```

This can be referenced in place or copied in a `gulp` build (or similar) into an appropriate vendor/library folder in your project.

#### Including the Cirrus scripts

Besides the visual styles, there are also interactions defined for Cirrus that
you might want to reuse as well. For this, you need to import `cirrus.min.js`:
```html
<script src='../node_modules/@hybrid-cloud/cirrus/dist/js/cirrus.min.js'></script>
```
Or if you prefer to use ES5:
```html
<script src='../node_modules/@hybrid-cloud/cirrus/dist/js/cirrus.es5.min.js'></script>
```

### Working with your own copy

This can be useful to use/reuse source, examine how things were done, and to make your own contributions/suggestions.

* Fork and clone repo
* `npm install`
* `gulp build`
* `gulp`


## Additional Documentation

[Box Grid](https://github.ibm.com/cloud-integration-design/cirrus/wiki/Box-Grid)
