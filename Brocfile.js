module.exports = function(broccoli) {
  var publicFiles = broccoli.makeTree('public')

  return [publicFiles]
}
