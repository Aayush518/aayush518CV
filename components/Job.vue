<script>
const marked = require("marked");
({
  props: ["job"],
  methods: {
    formatYear(year) {
      return Array.isArray(year) ? `${year[0]} - ${year[1]}` : year;
    },
    markdown(str) {
      return marked(str).replace(/(<p>|<\/p>)/g, "");
    },
  },
});
</script>

<template>
  <div class="row job y-sep">
    <div class="col-md-4">
      <h3>{{ job.title }}</h3>
      <p class="pl-3" v-if="job.place">{{ job.place }}</p>
      <p class="pl-3 mb-2">{{ formatYear(job.year) }}</p>
    </div>
    <div class="col-md-8">
      <ul>
        <li
          v-for="line in job.remarks"
          :key="line"
          v-html="markdown(line)"
        ></li>
        <li v-if="job.technologies">
          <strong>Keywords:</strong> {{ job.technologies.join(", ") }}
        </li>
      </ul>
    </div>
  </div>
</template>
