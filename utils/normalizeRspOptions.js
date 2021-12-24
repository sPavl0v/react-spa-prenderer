module.exports = function (options) {
  const engine = {};

  if (options.engine) {
    engine.launchOptions = options.engine.launchOptions || {};
    engine.gotoOptions = options.engine.gotoOptions || {};
  } else {
    engine.launchOptions = {};
    engine.gotoOptions = {};
  }

  return {
    routes: options.routes || [],
    port: options.port || 3000,
    buildDirectory: options.buildDirectory || './build',
    engine
  };
};
