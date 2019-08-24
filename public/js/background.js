chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	console.log('收到来自content-script的消息：');
	console.log(request, sender, sendResponse);
	sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
});




chrome.runtime.onConnect.addListener(function(port) {
	console.log("连接content")
    port.onMessage.addListener(function(msg) {
		console.log("background 收到 content的信息：",msg)
    });
});




