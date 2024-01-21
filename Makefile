.PHONY: all
all:
	node build.js

.PHONY: watch
watch: all
	watchman-make -p "**/*.vue" "*.js" "*.styl" "template.html" -r "node build.js"
