const fs = require("fs");
const path = require("path");

const compiler = require("vue-template-compiler");
const yaml = require("yaml");

function main() {
  createJson();
  Promise.all([render(), compileStyles()]).then(([html, css]) => {
    const out = fs
      .readFileSync("./template.html", { encoding: "utf-8" })
      .replace("<!-- content -->", html)
      .replace("/* stylesheet */", css);
    fs.writeFileSync("./index.html", out);
  });
}

function createJson() {
  // const data = require("./data.js");
  // const str = JSON.stringify(data, null, 2);
  // fs.writeFileSync("./aayush-adhikari-cv.json", str);
  // fs.writeFileSync("./aayush-adhikari-cv.yml", yaml.stringify(data));
  const data = yaml.parse(fs.readFileSync("./aayush-adhikari-cv.yml", "utf-8"))
  fs.writeFileSync("./aayush-adhikari-cv.json", JSON.stringify(data, null, 2));
}

function compileStyles() {
  const stylus = require("stylus");
  return new Promise((resolve) => {
    stylus.render(
      fs.readFileSync("./main.styl", { encoding: "utf-8" }),
      (err, css) => {
        if (err) throw err;
        resolve(css);
      }
    );
  });
}

function requireVue(path) {
  const sfc = compiler.parseComponent(
    fs.readFileSync(`./components/${path}.vue`, { encoding: "utf-8" })
  );
  return { ...eval(sfc.script.content), template: sfc.template.content };
}

function render() {
  const Vue = require("vue");
  const renderer = require("vue-server-renderer").createRenderer();

  global.requireVue = requireVue;

  const data = require("./aayush-adhikari-cv.json");

  const app = new Vue({
    data: { data },
    components: {
      App: requireVue("App"),
    },
    template: `<App :data="data" /></div>`,
  });

  return renderer.renderToString(app);
}

main();
