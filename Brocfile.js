module.exports = function(broccoli) {
  var pickFiles = require('broccoli-static-compiler')
  var traceur = require('broccoli-traceur')

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

  return [jsFiles, publicFiles, vendorFiles]
}
