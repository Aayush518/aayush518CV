<script>
({
  props: ['num'],
  computed: {
    classes() {
      const arr = Array(5).fill("empty-star");
      for (var n = this.num, i = 0; n > 0; n -= Math.min(n, 1), i++) {
        arr[i] = n >= 1 ? "star" : "half-star";
      }
      return arr;
    },
  },
})
</script>

<template>
  <span style="whitespace: no-wrap;"><span v-for="(cls, i) in classes" :key="i" :class="cls"></span></span>
</template>
