module.exports = function(broccoli) {
  var pickFiles = require('broccoli-static-compiler')
  var sass = require('broccoli-sass')
  var traceur = require('broccoli-traceur')

  var cssFiles = broccoli.makeTree('assets/css')
  cssFiles = sass([cssFiles], './main.scss', '/dist/main.css')

  var jsFiles = broccoli.makeTree('assets/js')
  jsFiles = traceur(jsFiles, { blockBinding: true })
  jsFiles = pickFiles(jsFiles, { srcDir: '/', destDir: 'dist' })

  var publicFiles = broccoli.makeTree('public')

  var vendorFiles = new broccoli.MergedTree(broccoli.bowerTrees())
  vendorFiles = pickFiles(vendorFiles, {
    files: ['**/*.js',]
  , srcDir: '/'
  , destDir: 'dist'
  })

  return [cssFiles, jsFiles, publicFiles, vendorFiles]
}
