<script>
({
  props: ['value'],
  methods: { btoa: str => Buffer(str).toString('base64') },
})
</script>

<template>
  <span class="base64">base64:{{ btoa(value) }}</span>
</template>
