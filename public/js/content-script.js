/*global chrome*/
(function() {
	console.log('这是 content-script！');
})();

// 向页面注入JS
(function injectCustomJs(jsPath)
{
    jsPath = jsPath || 'js/inject.js';
	var temp = document.createElement('script');
	console.log(temp);
	console.log("正在注入inject.js 呀呀呀")
    temp.setAttribute('type', 'text/javascript');
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
	temp.src = chrome.extension.getURL(jsPath);
	console.log(temp.src);
	console.log(document)
    temp.onload = function()
    {
        // 放在页面不好看，执行完后移除掉
        this.parentNode.removeChild(this);
	};
	console.log(document.head)
    document.body.appendChild(temp);
}())

// 接收来自后台的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	console.log('收到来自 ' + (sender.tab ? "content-script(" + sender.tab.url + ")" : "popup或者background") + ' 的消息：', request);
});

// 连接后台

var port = chrome.runtime.connect({name: "knockknock"});
port.onMessage.addListener(function(msg) {
    console.log("content receive:",msg)
});


// 主动发送消息给后台
// 要演示此功能，请打开控制台主动执行sendMessageToBackground()
function sendMessageToBackground(message) {
	//port.postMessage({data: message});
	chrome.runtime.sendMessage({greeting: message || '你好，我是content-script呀，我主动发消息给后台！'}, function(response) {
		console.log("我在content-script,主动发消息给background，回复是：",response);
		window.postMessage({ type: "inject", params: response, msg: message.msg }, '*');
		//eval(message.msg+'('+'1'+')')
	});

	
};

// 接收来自inject的消息
window.addEventListener("message", function(e)
{
	
	if (e.data.type == "getWeID"){
		console.log("我在content-script,我收到了inject传来的getWeID消息：",e);
		sendMessageToBackground(e.data)
		//e.data.msg
		
	}
	else if (e.data.type == "getCredential"){
		console.log("我在content-script,我收到了inject传来的getCredential消息：",e);
		sendMessageToBackground(e.data)
	}
}, false);
