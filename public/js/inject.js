/*自定义promise*/
function MyPromise(fn) {
    this.value;
    this.status = 'pending';
    this.resolveFunc = function () { };
    this.rejectFunc = function () { };
    fn(this.resolve.bind(this), this.reject.bind(this));
}
console.log("inject into!");

/*
***生成随机回调函数名称***
*/
var getCallbackName = function () {
    var random = parseInt(Math.random() * 100000)
    return 'pra_callback_' + new Date().getTime() + random
}

MyPromise.prototype = {
    resolve: function (val) {
        var self = this;
        if (this.status == 'pending') {
        this.status = 'resolved';
        this.value = val;
        setTimeout(function () {
            self.resolveFunc(self.value);
        }, 0);
        }
    },
    reject: function (val) {
        var self = this;
        if (this.status == 'pending') {
        this.status = 'rejected';
        this.value = val;
        setTimeout(function () {
            self.rejectFunc(self.value);
        }, 0);
        }
    },
    then: function (resolveFunc, rejectFunc) {
        var self = this;
        return new MyPromise(function (resolve_next, reject_next) {
        function resolveFuncWrap() {
            var result = resolveFunc(self.value);
            if (result && typeof result.then === 'function') {
            result.then(resolve_next, reject_next);
            } else {
            resolve_next(result);
            }
        }
        function rejectFuncWrap() {
            if (typeof rejectFunc !== 'function') {
            rejectFunc = function () { return self.value };
            }
            var result = rejectFunc(self.value);
            if (result && typeof result.then === 'function') {
            result.then(resolve_next, reject_next);
            } else {
            reject_next(result);
            }
        }
        self.resolveFunc = resolveFuncWrap;
        self.rejectFunc = rejectFuncWrap;
        })
    },
    catch: function (resolveFunc) {
        var self = this;
        return new MyPromise(function (resolve_next, reject_next) {
        function resolveFuncWrap() {
            if (self.status !== 'resolved') {
            var result = resolveFunc(self.value);
            if (result && typeof result.then === 'function') {
                result.then(resolve_next, reject_next);
            } else {
                resolve_next(result);
            }
            }
        }

        function rejectFuncWrap() {
            var result = resolveFunc(self.value);
            if (result && typeof result.then === 'function') {
            result.then(resolve_next, reject_next);
            } else {
            resolve_next(result);
            }
        }
        self.resolveFunc = resolveFuncWrap;
        self.rejectFunc = rejectFuncWrap;
        })
    }
}

/*
***********转发请求到原生************
***@methodName 方法名，字符串，不可为空
***@contractName 合约名，字符串，可为空
***@actionName  行为名，字符串，可为空
***@params 附加参数，json字符串，可为空
***@cbName 回调函数名称，字符串，不可为空
*/
let sendPraRequest = function (methodName, contractName, actionName, params, cbName) {
    window.postMessage({ type: methodName, params: params, msg: cbName }, '*');
}

function Pra() {
    this.isExtension = true;
    this.version = '1.0.0';
  
    window.addEventListener('message', function (event) {
        this.console.log("我在inject.js，收到postMessage的消息",event);
        if (event.data.type == "inject"){
            console.log(event.data.msg+'('+event.data.params+')')
            eval(event.data.msg+'('+"'"+event.data.params+"'"+')')
        }
    }, false);
  }

Pra.prototype.baba = "Gaotianyao"

/*
***获得weID
***@return 返回weID
*/
Pra.prototype.getWeID = function () {
    return new Promise(function (resolve, reject) {
        var praCallbackFun = getCallbackName();
        window[praCallbackFun] = function (res) {
            try {
                resolve(res);
                this.console.log("getWeID:",res)
            } catch (e) {
                reject(e);
            }
        }
        sendPraRequest('getWeID', '', '', '', praCallbackFun);
    });
}

/*
***授权凭证
***@return 返回weID
*/
Pra.prototype.getCredential = function (org,idIndex) {
    return new Promise(function (resolve, reject) {
        var praCallbackFun = getCallbackName();
        window[praCallbackFun] = function (res) {
            try {
                resolve(res);
                /*
                    {
                        status:"",   0/1
                        data:{
                        }     
                    }
                */ 
                this.console.log("getCredential:",res)
            } catch (e) {
                reject(e);
            }
        }
        sendPraRequest('getCredential', '', '', {name: org,index:idIndex}, praCallbackFun);
    });
}
if (typeof window !== 'undefined') {
    window.weID = new Pra();
}
