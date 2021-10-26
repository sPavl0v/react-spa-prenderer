const fs = require('fs');

/**
 * 
 * @param {string} dir 
 * @returns {Promise}
 */
module.exports = function(dir) {
  try {
    return fs.mkdirSync(dir, {recursive: true});
  } catch (err) {
    throw new Error(`Error: Failed to create directory for path ${dir}.\nMessage: ${err}`);
  }
}
