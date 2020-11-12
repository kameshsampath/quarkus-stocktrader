<!--
  Cirrus style button.
  Content: Transcluded

  Attributes:
    hc-placeholder: Message displayed of no option is selected
    hc-status: error
    hc-message : messages associating with the error
    hc-icon-href: 'href://.../icon.svg#icon', '#icon', 'hc(calendar)'

  Events:
    change: $event
-->

<template>
  <div class="dropdown" :class="{
      'dropdown--primary has-error': hcStatus == 'error',
      'is-open': open,
      }" role="listbox">
    <span class="dropdown__label" role="option" tabindex="0" ref="label"
      @click="toggleOpen"
      @blur="removeOpen"
      @keydown="processKeyDown"
      v-html="currentLabel">
    </span>
    <ul class="dropdown__list" ref="list">
      <slot></slot>
    </ul>
    <span v-show="hcStatus == 'error'" class="form-item__message">{{ hcMessage }}</span>
    <hc-icon v-show="hcStatus == 'error'" :href="hcIconHref" class="icon--warn"></hc-icon>
  </div>
</template>

<script>
  import hcIcon from '../hc-icon/hc-icon';
  import hcDropdownItem from './hc-dropdown-item';

  export default {
    name: 'hc-dropdown',
    props: {
      hcPlaceholder: String,
      hcStatus: String,
      hcMessage: String,
      hcIconHref: { type: String, required: false, default: 'hc(warn)' },
    },
    data() {
      return {
        currentItemIndex: Number,
        open: Boolean,
        items: [],
      };
    },
    created() {
      this.items = [];
      this.currentItemIndex = -1;
      this.open = false;
    },
    mounted() {
      this.$slots.default.forEach((el) => {
        if (undefined !== el.componentInstance) {
          this.items.push(el.componentInstance);
          // listen to dropdown-item events
          el.componentInstance.$on('item-click', this.itemClick);
          el.componentInstance.$on('item-mouse-over', this.itemHover);

          if (el.componentInstance.isActive) {
            this.updateCurrentItem(this.items.length - 1);
          }
        }
      });
    },
    computed: {
      currentLabel() {
        return (this.currentItemIndex !== -1)
          ? this.items[this.currentItemIndex].$el.innerHTML
          : this.hcPlaceholder;
      },
    },
    methods: {
      toggleOpen() {
        if (!this.open) {
          for (let i = 0; i < this.items.length; i++) {
            this.items[i].isActive = i === this.currentItemIndex;
          }
          this.checkPosition(this.items[this.currentItemIndex]);
        }
        this.open = !this.open;
      },
      removeOpen() {
        this.open = false;
      },
      itemHover(ddId) {
        const setActive = (option) => {
          option.isActive = option.hcId === ddId;
        };
        this.items.forEach(setActive);
      },
      itemClick(ddId) {
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].hcId === ddId) {
            this.updateCurrentItem(i);
          }
        }
      },
      checkPosition(activeItem) {
        if (activeItem) {
          const listRect = this.$refs.list.getBoundingClientRect();
          const activeRect = activeItem.$el.getBoundingClientRect();
          if (listRect.bottom < activeRect.bottom) {
            this.$refs.list.scrollTop += activeRect.bottom - listRect.bottom;
          } else if (listRect.top > activeRect.top) {
            this.$refs.list.scrollTop += activeRect.top - listRect.top;
          }
        }
      },
      updateActiveItem(direction) { // number -1 or 1
        let activeItem;
        let nextActiveItem;

        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].isActive) {
            activeItem = this.items[i];
            nextActiveItem = this.items[i + direction];
            break;
          }
        }

        if (!activeItem) {
          nextActiveItem = this.items[direction === -1 ? this.items.length - 1 : 0];
          nextActiveItem.isActive = true;
        } else {
          if (!nextActiveItem) {
            if (direction === -1) {
              nextActiveItem = this.items[0];
            } else {
              nextActiveItem = this.items[this.items.length - 1];
            }
          }
          activeItem.isActive = false;
        }
        nextActiveItem.isActive = true;

        this.checkPosition(nextActiveItem);
      },
      updateCurrentItem(index) {
        this.currentItemIndex = index;
        this.$emit('change', { value: this.items[index].value, hcDropdownItem: this.items[index] });
      },
      processKeyDown(ev) {
        let doPreventDefault = true;

        switch (ev.keyCode) {
          case 38:  // up arrow
            this.updateActiveItem(-1);
            break;
          case 40:  // down arrow
            this.updateActiveItem(1);
            break;
          case 13:  // enter
          case 32:  // space
            if (this.open) {
              for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].isActive) {
                  this.updateCurrentItem(i);
                }
              }
              this.removeOpen();
            } else {
              this.toggleOpen();
            }
            break;
          case 27:  // escape
            this.removeOpen();
            break;
          default:
            doPreventDefault = false;
            break;
        }
        if (doPreventDefault) {
          ev.preventDefault();
        }
      },
    },
    components: {
      'hc-icon': hcIcon,
      'hc-dropdown-item': hcDropdownItem,
    },
  };
</script>

<style lang="scss">
  @import '../../globals/scss/cirrus-globals';
  @import '~@hybrid-cloud/cirrus/src/scss/elements/form-fields/form-fields';
  @import '~@hybrid-cloud/cirrus/src/scss/components/dropdown/dropdown';
</style>
