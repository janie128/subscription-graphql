/**
 * Provides a single, consistent place for js files to get
 * relevant paths, globs, etc pertaining to the project structure.
 */

// node imports
var path = require('path')
// directory structure
var rootDir = path.join(__dirname, '..')
var buildDir = path.join(rootDir, 'build')

module.exports = {
  buildDir,
  staticApiSchema: path.join(buildDir, 'schema.json')
}