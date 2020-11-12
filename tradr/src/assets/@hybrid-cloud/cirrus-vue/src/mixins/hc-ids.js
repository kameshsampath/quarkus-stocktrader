/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */

const idGen = {
  lastId: 0,
  newId() {
    this.lastId++;
    return `hc-${this.lastId}`;
  }
};

// define a mixin object
export default {
  data() {
    return {
      hcId: idGen.newId(),
    };
  },
};
