<template>
  <div>
    <h2 class="h2">Modules</h2>
    <div class="row">
      <div class="box box--full">
        <hc-module>
          <hc-module-title>Module Header</hc-module-title>
          <hc-module-body>
            Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini. Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini.
          </hc-module-body>
          <hc-module-footer>
            <hc-link
              href="#"
              hc-style="flat">
                <slot>Button in Footer</slot>
            </hc-link>
          </hc-module-footer>
        </hc-module>
      </div>
    </div>
    <div class="row u-push-top--medium">
      <div class="box box--6">
        <hc-module>
          <hc-module-title>Module Header</hc-module-title>
          <hc-module-body>
            Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini. Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini.
          </hc-module-body>
          <hc-module-footer>
            Footer text
          </hc-module-footer>
        </hc-module>
      </div>
      <div class="box box--6">
        <hc-module>
          <hc-module-title>Module Header</hc-module-title>
          <hc-module-body>
            Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini. Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini.
          </hc-module-body>
          <hc-module-footer>
            Footer text
          </hc-module-footer>
        </hc-module>
      </div>
    </div>
  </div>
</template>

<script>
  import hcModules from '../components/hc-module/index';
  import hcLink from '../components/hc-link/hc-link';

  export default {
    name: 'hc-module-samples',
    components: Object.assign({}, hcModules.components, hcLink.components),
  };
</script>
