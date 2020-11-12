<template>
  <div>
    <div class="row u-push-top--large">
      <h2 class="box box--full h2">Input Text Field</h2>
      <div class="box box--2">
        <hc-text v-model="t1" label="Username"></hc-text>
      </div>
      <div class="box box--2">
        <hc-text placeholder="Input Field" v-model="t2" label="Password">
        </hc-text>
      </div>
      <div class="box box--2">
        <hc-text v-model="t3" label="Input Label" hc-status="error" hc-message="This field contains illegal character">
        </hc-text>
      </div>
    </div>
    <div class="row u-push-top--large">
      <h2 class="box box--full h2">Input Textarea</h2>
      <div class="box box--2">
        <hc-textarea v-model="t4" label="Post"></hc-textarea>
      </div>
      <div class="box box--2">
        <hc-textarea placeholder="Multiline" v-model="t5" label="Address">
        </hc-textarea>
      </div>
      <div class="box box--2">
        <hc-textarea v-model="t6" label="Content" hc-status="error" hc-message="This field contains illegal character">
        </hc-textarea>
      </div>
    </div>
  </div>
</template>

<script>
  import hcText from '../components/hc-text/hc-text';
  import hcTextArea from '../components/hc-textarea/hc-textarea';

  export default {
    name: 'hc-text-samples',
    components: {
      'hc-text': hcText,
      'hc-textarea': hcTextArea
    },
    data() {
      return {
        t1: 'abc',
        t2: '123',
        t3: '@#$',
        t4: 'Hello\nNew Line',
        t5: 'Hello\nNew Line',
        t6: '!@#Hello\nNew Line'
      };
    },
  };
</script>
