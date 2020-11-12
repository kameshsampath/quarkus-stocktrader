<template>
  <div>
    <div class="row u-push-top--large">
      <h2 class="h2 box box--full">Cards</h2>
      <div class="box box--3">
        <hc-card>
          <hc-card-body>
            <hc-card-symbol hc-icon-href="hc(flow)"></hc-card-symbol>
            <hc-card-title hc-rank="4" hc-style-level="3">Cirrus Design System</hc-card-title>
            <hc-card-text class="u-text--centered">Guidance for products OnPremise</hc-card-text>
            <hc-card-link href='' class="u-push-bottom--small">Read more</hc-card-link>
          </hc-card-body>
          <hc-card-footer>
            <span class="card__status card__status--running is-active">Running</span>
          </hc-card-footer>
        </hc-card>
      </div>
      <div class="box box--3">
        <hc-card>
          <hc-card-body>
            <hc-card-symbol hc-icon-href="hc(flow)"></hc-card-symbol>
            <hc-card-title hc-rank="4" hc-style-level="3">
              Cirrus Design System
            </hc-card-title>
            <hc-card-link href=''>Read more</hc-card-link>
          </hc-card-body>
        </hc-card>
      </div>
    </div>
  </div>
</template>

<script>
  import hcCards from '../components/hc-card/index';

  export default {
    name: 'hc-card-samples',
    components: hcCards.components
  };
</script>
