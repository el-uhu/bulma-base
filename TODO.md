# ToDo

## Fix
- [x] Fix tag-list partial: URL base missing
- [x] Calendar search items
  - [x] Display none initially
  - [x] Clean up formatting

## Open questions
- [x] What is a good way to streamline work on base template alongside custom functionality at a site specific level?
- [x] Get a clearer idea about best practices when working with npm

## Maintenance
- [ ] Implement autoprefixing
- [ ] Implement browserification
- [ ] Implement unit testing
- [ ] Refactor `*.html`, `*.js` and `*.sass/*.css` dependencies.
  - [ ] sass compilation
  - [ ] amber or ace compilation
  - [ ] Refactor `*.sass`
  - [ ] Use *Ace* r *Amber* templating to make the templates a bit better to read.
- [ ] Setup npm build chains using:
  - [ ] test: unit testing using mocha
  - [ ] build: autoprefixing, minification, browserification, asset minification
  - [ ] dev: watcher to automate tasks

## Optimisation
- [ ] Minification of assets including images
- [ ] Add favicon: firefox/androi/iOS etc.
- [ ] Look into sitemap, rakefil, AMP options in Hugo

## Extra functionality
- [ ] **Add support for featured videos/vimeo embed.**
- [ ] Create hugo/npm boilerplate repo
- [ ] Add optional encryption to theme using `staticrypt-js`
- [ ] Add support to render chemical structures
- [ ] Add some form of citation/references section using bibtex
