RELEASE_DIR=pkg
RELEASE_FILTER_OUT=README% TODO% %.zip Makefile $(RELEASE_DIR)
RELEASE_ALL_FILES=$(wildcard *)
RELEASE_FILES=$(filter-out $(RELEASE_FILTER_OUT),$(RELEASE_ALL_FILES))
RELEASE_VERSION=$(shell grep '"version"\s*:' manifest.json | sed -e 's/"version"\s*: //' -e 's/^\s*"//' -e 's/"\s*,\s*//')
RELEASE_NAME=$(shell grep '"name"\s*:' manifest.json | sed -e 's/"name"\s*: //' -e 's/^\s*"//' -e 's/"\s*,\s*//')

RELEASE_FILE=$(RELEASE_DIR)/$(RELEASE_NAME)-$(RELEASE_VERSION).zip

release:
	@mkdir -p $(RELEASE_DIR)
	@zip -q -r $(RELEASE_FILE) $(RELEASE_FILES)
	@echo $(RELEASE_FILE)

clean:
	rm -rf $(RELEASE_DIR)/*.zip
