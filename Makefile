.PHONY: clean

SRCS = src/header.js                 \
       src/namespace.js              \
       src/find.js

build: $(SRCS)
	mkdir -p build
	cat $(SRCS) >build/pajar.js
	jsmin <build/pajar.js >build/pajar-tmp.js
	cat src/header.js build/pajar-tmp.js >build/pajar-min.js
	rm build/pajar-tmp.js

clean:
	rm -rf build
