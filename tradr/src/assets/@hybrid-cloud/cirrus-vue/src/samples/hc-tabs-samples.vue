<template>
  <div>
    <div class="row u-push-top--large">
      <h2 class="box box--full h2">Tabs</h2>

      <h3 class="box box--full h3">Abbreviated syntax for when the tabs follow the links</h3>
      <div class="box box--full">
        <hc-tabs>
          <hc-tabs-panel id="about-us" hc-link-label="About us" :hc-selected="true" :hc-heading="{ hcTitle: 'A title', hcRank: 4 }">
            <p>
              Great
            </p>
          </hc-tabs-panel>
          <hc-tabs-panel id="about-you" hc-link-label="About You">
            <p>
              Great too
            </p>
          </hc-tabs-panel>
          <hc-tabs-panel id="about-them" hc-link-label="About Them">
            <p>
              Dodgy folk
            </p>
          </hc-tabs-panel>
        </hc-tabs>
      </div>
    </div>

    <div class="row u-push-top--large">
      <h3 class="box box--full h3">Independed tab links and panels</h3>
      <div class="box box--full">
        <hc-tabs-links hc-tab-set="tab-set-12345"></hc-tabs-links>

        <h3>These panels can go anywhere in the document</h3>
        <hc-tabs-panel-set hc-tab-set="tab-set-12345">
          <hc-tabs-panel id="tab-panel-a" hc-link-label="Panel A" :hc-heading="{ hcTitle: 'Panel A', hcRank: 4 }">
            Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini.
          </hc-tabs-panel>
          <hc-tabs-panel id="tab-panel-b" hc-link-label="Panel B" :hc-selected="true" :hc-heading="{ hcTitle: 'Panel B', hcRank: 5 }">
            Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale. Celery potato scallion desert raisin horseradish spinach carrot soko.
          </hc-tabs-panel>
          <hc-tabs-panel id="tab-panel-c" hc-link-label="Panel C" :hc-heading="{ hcTitle: 'Panel C', hcRank: 6 }">
            Beetroot water spinach okra water chestnut ricebean pea catsear courgette summer purslane. Water spinach arugula pea tatsoi aubergine spring onion bush tomato kale radicchio turnip chicory salsify pea sprouts fava bean.
          </hc-tabs-panel>
        </hc-tabs-panel-set>
      </div>
    </div>
  </div>
</template>

<script>
  import hcTabs from '../components/hc-tabs/hc-tabs';
  import hcTabsLinks from '../components/hc-tabs/hc-tabs-links';
  import hcTabsPanelSet from '../components/hc-tabs/hc-tabs-panel-set';
  import hcTabsPanel from '../components/hc-tabs/hc-tabs-panel';

  export default {
    name: 'hc-tabs-samples',
    components: {
      'hc-tabs': hcTabs,
      'hc-tabs-links': hcTabsLinks,
      'hc-tabs-panel': hcTabsPanel,
      'hc-tabs-panel-set': hcTabsPanelSet
    }
  };
</script>
