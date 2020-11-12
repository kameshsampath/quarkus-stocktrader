<!--
  Cirrus style button.
  Content: Transcluded

  Attributes:
    href: 'href://.../icon.svg#icon', '#icon', 'hc(calendar)'
-->

<template>
  <svg class="hc-icon icon">
    <use :xlink:href="iconHref"></use>
  </svg>
</template>

<script>
    const spritePath = require('@hybrid-cloud/cirrus/dist/icons/sprite.svg');

    export default {
        name: 'hc-icon',
        props: {
            href: { type: String, required: true },
        },
        computed: {
            iconHref() {
                if (this.href.toLowerCase().startsWith('hc(')) {
                    return `${spritePath}#${this.href.substring(3, this.href.length - 1)}`;
                }
                return this.href;
            },
        }
    };
</script>