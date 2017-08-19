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
};

var notNullError = function(paramsVal) {
    var backObj = {};
    backObj.success = false;
    backObj.errorCode = 0002;
    backObj.errorMsg = paramsVal + "不能为空";
    backObj.result = null
    return backObj;
};

var paramsError = function() {
    var backObj = {};
    backObj.success = false;
    backObj.errorCode = 0003;
    backObj.errorMsg = "入参格式有误";
    backObj.result = null
    return backObj;
};

module.exports = {
    back: back,
    dbError: dbError,
    notNullError: notNullError,
    paramsError: paramsError
}