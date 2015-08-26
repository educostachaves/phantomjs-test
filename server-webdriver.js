var exports   = module.exports = {},
    webdriver = require('wd'),
    browser   = exports.browser = webdriver.remote({
      hostname: "localhost",
      port: 8910
    });


process.on( 'uncaughtException', function(err) {
  console.error('Caught exception: ' + err.stack );
});