module.exports = function (options) {
  const engine = {};

  if (options.engine) {
    engine.launchOptions = options.engine.launchOptions || {};
  } else {
    engine.launchOptions = {};
  }

  return {
    routes: options.routes || [],
    port: options.port || 3000,
    buildDirectory: options.buildDirectory || './build',
    engine
  };
};