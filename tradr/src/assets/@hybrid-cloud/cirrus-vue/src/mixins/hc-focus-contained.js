// define a mixin object
export default {
  methods: {
    checkFocusContained(ev) {
      if (ev) {
        if (ev.type === 'focusout') {
          this.focusContained = this.$el.contains(ev.relatedTarget);
        } else {
          this.focusContained = this.$el.contains(ev.target);
        }
      } else {
        this.focusContained = this.$el.contains(document.activeElement);
      }
    },
  },
  data() {
    return {
      focusContained: false,
    };
  },
  mounted() {
    this.focusContained = this.checkFocusContained();
    this.$el.addEventListener('focusin', this.checkFocusContained);
    this.$el.addEventListener('focusout', this.checkFocusContained);
  },
};
