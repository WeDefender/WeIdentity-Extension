function getID(cb){
	chrome.storage.local.get(['weId'], function(result) {
		console.log(result.weId)
		cb(result.weId);
	})
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	console.log('收到来自content-script的消息：');
	console.log(request, sender, sendResponse);
	//chrome.browserAction.setBadgeText({text: 'new'});
	//chrome.browserAction.setBadgeText({text: ''});
	console.log(request.greeting.type)
	if (request.greeting.type == "getWeID"){
		getID(function(result){
			sendResponse(result)
		})
		return true;
	}
	else if (request.greeting.type == "getCredential"){
		sendResponse("1");
	}
	
});

chrome.runtime.onConnect.addListener(function(port) {
	console.log("连接content")
    port.onMessage.addListener(function(msg) {
		console.log("background 收到 content的信息：",msg)
    });
});





