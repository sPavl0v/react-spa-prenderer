/**
 * Set .html as default file extension if not exists
 * @param {string} route
 * @returns {string} 
 */
module.exports = function(route) {
  const fileName = route === '/' ? '/index' : route;
  const withExtension = !!fileName.match(/(.htm$|.html$|.php$)/i);

  return withExtension ? fileName : `${fileName}.html`;
}
