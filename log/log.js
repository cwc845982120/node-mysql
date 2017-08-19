var log4js = require('log4js');

var logger = log4js.getLogger();
logger.level = 'debug';
//blue
//logger.debug('Got cheese.');
//green deep
//logger.info('Cheese is Gouda.');
//green
//logger.warn('Cheese is quite smelly.');
//red
//logger.error('Cheese is too ripe!');
//purple
//logger.fatal('Cheese was breeding ground for listeria.');

exports.logger = logger;