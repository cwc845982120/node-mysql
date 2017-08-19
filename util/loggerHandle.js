var handleParams = function(apiName, msg) {
    var backMsg = '';
    if (typeof msg == 'object') {
        backMsg = apiName + ' ----入参---- ' + JSON.stringify(msg);
        return backMsg;
    } else if (typeof msg == 'string') {
        backMsg = apiName + ' ----入参---- ' + msg;
        return backMsg;
    } else {
        return backMsg;
    }
};

var handleResults = function(apiName, msg) {
    var backMsg = '';
    if (typeof msg == 'object') {
        backMsg = apiName + ' ----出参---- ' + JSON.stringify(msg);
        return backMsg;
    } else if (typeof msg == 'string') {
        backMsg = apiName + ' ----出参---- ' + msg;
        return backMsg;
    } else {
        return backMsg;
    }
}

var handleSql = function(msg) {
    var backMsg = '';
    if (typeof msg == 'object') {
        backMsg = ' ----sql---- ' + JSON.stringify(msg);
        return backMsg;
    } else if (typeof msg == 'string') {
        backMsg = ' ----sql---- ' + msg;
        return backMsg;
    } else {
        return backMsg;
    }
}

module.exports = {
    handleParams: handleParams,
    handleResults: handleResults,
    handleSql: handleSql
}