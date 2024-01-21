<script>
const marked = require("marked");
({
  props: ["ed"],
  computed: {
    research() {
      return this.ed.research.join(", ");
    }
  },
  methods: {
    formatYear(year) {
      return Array.isArray(year) ? `${year[0]} - ${year[1]}` : year;
    }
  }
});
</script>

<template>
  <div class="col-lg col-md-6 col-12 mb-3 text-md-center">
    <h3>{{ed.title}}</h3>
    <i>{{ed.distinction}}</i>
    <p>
      {{ed.institution}}
      <br />
      {{formatYear(ed.year)}}
    </p>
    <p>
      
      <strong>Remarks:</strong>
      <br />

      <span v-html="Array.isArray(ed.remarks) ? ed.remarks.join(', ').replace(/\*\*(.*?)\*\*/g, '<b style=\'color:grey\'>$1</b>') : ed.remarks"></span>
    </p>
  </div>
</template>
