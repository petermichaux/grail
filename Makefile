.PHONY: clean

SRCS = src/header.js                 \
       src/namespace.js              \
       src/find.js

build: $(SRCS)
	mkdir -p build
	cat $(SRCS) >build/grail.js
	jsmin <build/grail.js >build/grail-tmp.js
	cat src/header.js build/grail-tmp.js >build/grail-min.js
	rm build/grail-tmp.js

clean:
	rm -rf build
