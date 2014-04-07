module.exports = function(broccoli) {
  var mergeTrees = require('broccoli-merge-trees')
  var pickFiles = require('broccoli-static-compiler')
  var sass = require('broccoli-sass')
  var traceur = require('broccoli-traceur')

  var cssFiles = sass(['assets/css'], './main.scss', '/dist/main.css')

  var jsFiles = traceur('assets/js')
  jsFiles = pickFiles(jsFiles, { srcDir: '/', destDir: 'dist' })

  var vendorFiles = mergeTrees(broccoli.bowerTrees())
  vendorFiles = pickFiles(vendorFiles, {
    files: ['**/*.js']
  , srcDir: '/'
  , destDir: 'dist'
  })

  return mergeTrees([cssFiles, jsFiles, 'public', vendorFiles])
}
