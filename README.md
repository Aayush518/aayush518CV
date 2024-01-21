# Martin Hanzel's personal CV site

## How it's built
- All information about me lives in `data.js`. This is the source of truth from which all is generated. It's a JS file primarily because JS object notation is more maintainable than plain JSON.
- `data.js` is read and serialized into `martin-hanzel-cv.json`.
- A Vue application is created from `components/App.vue` and rendered to an HTML string. The application's data source is `martin-hanzel-cv.json`.
- The stylesheet, `main.styl`, is compiled into a CSS string.
- The HTML and CSS strings are injected into `template.html`, which includes any client-side scripts or resources that should be present in the final page.

The result is a statically-compiled HTML file. It is indexable, works without JS, and can be served over Git{Hub,Lab} in a single request.

# Legal stuff
Star icons are from [fontawesome](https://fontawesome.com), and are licensed under [Creative Commons](https://fontawesome.com/license).

