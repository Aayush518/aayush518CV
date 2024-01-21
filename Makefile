.PHONY: all
all:
	node build.js

.PHONY: watch
watch: all
	watchman-make -p "**/*.vue" "*.js" "*.styl" "template.html" "aayush-adhikari-cv.yml" -r "node build.js"
