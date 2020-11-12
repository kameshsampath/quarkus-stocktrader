<!--
  Cirrus style file-upload
  Content:
    None

  Attributes:
    disabled: standard HTML input property
    files: standard property
    hc-button-label: label for button
    hc-label: label for component
    multiple: standard HTML property
    name: standard HTML input property
    placeholder: standard HTML input property

  Events:
    change: $event
-->

<template>
  <div class="form-item">
    <div class="file-upload">
      <label class="label">{{hcLabel}}</label>
      <label :for="hcId" class="input input--primary file-upload__field">{{displayText}}</label>
      <input
        ref="input"
        :id="hcId"
        class="hc-file-upload file-upload__input"
        :name="name"
        type="file"
        :multiple="multiple"
        @change="processChange">
      <label class="button button--primary file-upload__label" :for="hcId">{{hcButtonLabel}}</label>
    </div>
  </div>
</template>

<script>
  import hcIds from '../../mixins/hc-ids';

  export default {
    name: 'hc-file-upload',

    mixins: [hcIds],

    props: {
      disabled: Boolean,
      files: FileList,
      hcButtonLabel: { type: String, default: 'Browse' },
      hcLabel: { type: String, default: 'File upload' },
      multiple: Boolean,
      name: String,
      placeholder: { type: String, default: 'Select a file' },
    },
    data() {
      return {
        displayText: String,
      };
    },

    mounted() {
      this.displayText = this.placeholder;
    },

    methods: {
      processChange(ev) {
        if (ev.target.files.length) {
          if (ev.target.files.length > 1) {
            this.displayText = `${ev.target.files.length} files selected`;
          } else {
            this.displayText = ev.target.files[0].name;
          }
        } else {
          this.displayText = this.placeholder;
        }
        this.$emit('change', this.$refs.input.files);
      }
    },
    model: {
      prop: 'files',
      event: 'change'
    }
  };
</script>

<style lang="scss">
  @import '../../globals/scss/cirrus-globals';
  @import '~@hybrid-cloud/cirrus/src/scss/components/file-upload/file-upload';
</style>
