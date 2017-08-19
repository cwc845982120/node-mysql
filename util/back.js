var back = function(data) {
    var backObj = {};
    backObj.success = true;
    backObj.errorCode = null;
    backObj.errorMsg = null;
    backObj.result = data;
    return backObj;
};

var dbError = function() {
    var backObj = {};
    backObj.success = false;
    backObj.errorCode = 0001;
    backObj.errorMsg = "数据库访问失败";
    backObj.result = null
    return backObj;
}

module.exports = {
    back: back,
    dbError: dbError
}