<template>
  <div>
    <div class="row u-push-top--large">
      <h2 class="box box--full h2">file-upload samples</h2>
      <div class="box box--4">
        <hc-file-upload
          :multiple="true"
          v-model="fileListVModel1"
          hc-label="Select one or more files..."
          placeholder="I am waiting"
          @change="fc1"
        ></hc-file-upload>
      </div>
      <div class="box box--4">
        <hc-file-upload
          :multiple="false"
          v-model="fileListVModel2"
          @change="fc2"
        ></hc-file-upload>
      </div>
      <div class="box box--4">
        <hc-file-upload
          hc-label="Select a file..."
          hc-button-label="Hurry up"
          v-model="fileListVModel3"
          @change="fc3"
          ></hc-file-upload>
      </div>
    </div>
  </div>
</template>

<script>
  import hcFileUpload from '../components/hc-file-upload/hc-file-upload';

  export default {
    name: 'hc-file-upload-samples',
    components: {
      'hc-file-upload': hcFileUpload,
    },
    data() {
      return {
        fileListFromEvent1: {},
        fileListFromEvent2: {},
        fileListFromEvent3: {},
        fileListVModel1: {},
        fileListVModel2: {},
        fileListVModel3: {},
      };
    },
    beforeMount() {
      // set these before mount to avoid type checking error
      let tempInput = document.createElement('input');
      tempInput.type = 'file';
      this.fileListVModel1 = tempInput.files;
      this.fileListVModel2 = tempInput.files;
      this.fileListVModel3 = tempInput.files;
    },
    methods: {
      fc1(files) {
        this.fileListFromEvent1 = files;
      },
      fc2(files) {
        this.fileListFromEvent2 = files;
      },
      fc3(files) {
        this.fileListFromEvent3 = files;
      },
    }
  };
</script>
