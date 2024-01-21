<script>
const marked = require("marked");

({
  props: ["data"],
  components: {
    Base64: requireVue("Base64"),
    Job: requireVue("Job"),
    Ed: requireVue("Education"),
    Stars: requireVue("Stars")
  },
  created() {

  },
  data: () => ({
    arr: ["one", "two", "three"]
  }),
  methods: {
    compareEntry: (a, b) =>
      a[1] == b[1] ? a[0].localeCompare(b[0]) : Math.sign(b[1] - a[1]),
    formatYear(year) {
      return Array.isArray(year) ? `${year[0]} - ${year[1]}` : year;
    },
    markdown(str) {
      return marked(str).replace(/(<p>|<\/p>)/g, "");
    },
    splitArray(array, parts) {
      const arr = [],
        size = Math.ceil(array.length / parts);
      for (var i = 0; i < parts; i++) {
        arr[i] = array.slice(i * size, (i + 1) * size);
      }
      return arr;
    },
    urlToHandle(url) {
      const x = url.split("/");
      return `@${x[x.length - 1]}`;
    }
  },
  computed: {
    technical() {
      return this.data.experience.filter(x => x.tag === "technical");
    },
    management() {
      return this.data.experience.filter(x => x.tag === "people");
    },
    skills() {
      const skills = Object.entries(this.data.skills);
      skills.sort((a, b) => b[1] - a[1]);
      return skills;
    },
    languages() {
      const langs = Object.entries(this.data.languages);
      langs.sort((a, b) => b[1] - a[1]);
      return langs
    }
  }
});
</script>

<template>
  <div class="container mt-3">
    <h1>Martin Hanzel</h1>
    <p class="lead">(Remote) software developer</p>
    <!-- TODO: Add hashes and permalinks to headers -->

    <p class="lead">
      <strong>email</strong>:
      <Base64 :value="data.contact.email" />
      <br />
      <strong>github</strong>:
      <a :href="data.contact.github">{{ urlToHandle(data.contact.github) }}</a>
      <br />
      <strong>gitlab</strong>:
      <a :href="data.contact.gitlab">{{ urlToHandle(data.contact.gitlab) }}</a>
    </p>
    <p v-for="text in data.bio" :key="text" v-html="markdown(text)"></p>
    <hr />
    <p>
      I like boring, automatable solutions. My full CV is available as machine- and human-readable
      <a href="martin-hanzel-cv.json">JSON</a>
      and
      <a href="martin-hanzel-cv.yml" type="text/plain">YAML</a>
      files.
      <!-- There is also a one-page
      <a
        href="martin-hanzel-resume-onepage.pdf"
      >PDF</a>. -->
    </p>
    <p v-html="markdown(data.location)"></p>

    <h2>Education</h2>
    <!-- <div class="row"><Ed :ed="data.education[0]" /></div> -->
    <div class="row justify-content-center">
      <Ed v-for="(ed, i) in data.education.slice(0)" :key="i" :ed="ed" />
    </div>

    <h2>Technical experience</h2>
    <Job v-for="(job, i) in technical" :key="i" :job="job" />

    <h2>Leadership and management experience</h2>
    <Job v-for="(job, i) in management" :key="i" :job="job" />

    <h2>Skills</h2>
    <div class="row mb-4">
      <div class="col-lg-4 x-sep d-flex flex-column align-items-center" v-for="(skillCol, i) in splitArray(skills, 3)" :key="i">
        <div
          class="px-3 mb-2 col col-sm-8 col-lg d-flex justify-content-between"
          v-for="[name, rating] in skillCol"
          :key="name"
        >
          <span>{{name}}</span>
          <Stars :num="rating" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4 x-sep d-flex flex-column align-items-center" v-for="(skillCol, i) in splitArray(languages, 3)" :key="i">
        <div
          class="px-3 mb-2 col col-sm-8 col-lg d-flex justify-content-between"
          v-for="[name, rating] in skillCol"
          :key="name"
        >
          <span>{{name}}</span>
          <span>{{rating}}</span>
          <!-- <Stars :num="rating" /> -->
        </div>
      </div>
    </div>

    <h2>Awards and certifications</h2>
    <div class="row justify-content-center y-sep">
      <div class="col-md-4 text-center mb-3" v-for="x in data.awards" :key="x.title">
        <h3>{{x.title}}</h3>
        <div v-if="x.subtitle">{{x.subtitle}}</div>
        <div v-if="x.institution">{{x.institution}}</div>
        <div>{{formatYear(x.year)}}</div>
        <div v-if="x.note" class="mt-2">{{x.note}}</div>
      </div>
    </div>
    <div class="row justify-content-center y-sep">
      <div class="col-md-4 text-center my-3" v-for="x in data.certifications" :key="x.title">
        <h3>{{x.title}}</h3>
        <a :href="x.href">{{x.institution}}</a>
      </div>
    </div>

    <h2>Selected works</h2>
    <div class="row justify-content-center">
      <div class="col-md-4 px-3 py-3" v-for="p in data.projects" :key="p.name">
        <div class="project card text-center">
          <img v-if="p.image" class="card-img-top" :src="p.image" />
          <div class="px-3 py-3">
            <h3>{{p.name}}</h3>
            <p v-html="markdown(p.description)"></p>
            <p>
              <a v-for="(v, k) in p.links" :key="k" class="text-capitalize mr-2 d-inline-block" :href="v">{{k}}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
