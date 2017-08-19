var log4js = require('log4js');

//log4js基础配置
log4js.configure({
    appenders: {
        logger: {
            type: 'DateFile',
            filename: './log/node-api.log'
        }
    },
    categories: {
        default: {
            appenders: ['logger'],
            level: 'all'
        }
    }
});
const logger = log4js.getLogger('logger');

exports.logger = logger;