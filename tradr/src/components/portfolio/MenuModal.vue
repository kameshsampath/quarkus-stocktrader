<!--
        Copyright 2018 IBM Corp All Rights Reserved

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 -->
<template>
  <li class="list-overflow__item" :class="{ 'with-divider': hcHasDivider }"
      role="presentation">
    <button :class="{'list-overflow__action': true, 'js-modal': hcModalPop}"
            :data-modal-target="hcModalTarget"
            role="menuitem"
            @click="$emit('click', $event)"
    >
      <slot></slot>
    </button>
  </li>
</template>

<script>
  import hcIds from '@hybrid-cloud/cirrus-vue/src/mixins/hc-ids'

  export default {
    name: 'portfolio-overflow-item',
    mixins: [hcIds],
    props: {
      hcHasDivider: { type: String, required: false },
      hcModalPop: { type: String, required: false },
      hcModalTarget: { type: String, required: false }
    }
  }
</script>

<style lang="scss">
  @import '~@hybrid-cloud/cirrus-vue/src/globals/scss/cirrus-globals';
  @import '~@hybrid-cloud/cirrus/src/scss/elements/tables/tables';
</style>
