//
// Cirrus creates a h tag at the specified level.
// Content: Transcluded
//
// Attributes:
//   hc-rank
//   hc-style-level: level of heading
//

export default {
  name: 'hc-heading',
  render(createElement) {
    return createElement(
      `h${this.hcRank}`,   // tag name
      {
        'class': `h${this.hcStyleLevel || this.hcRank}`,
      },
      this.$slots.default // array of children
    );
  },
  props: {
    hcStyleLevel: {
      type: String,
      validator: value => /^[1-6]$/.test(value),
    },
    hcRank: {
      type: String,
      required: true,
      validator: value => /^[1-6]$/.test(value),
    }
  },
};
