var injectBabelPlugin = require('react-app-rewired').injectBabelPlugin

module.exports = function override(config, env) {
  // add the relay plugin
  return injectBabelPlugin('relay', config)
}
