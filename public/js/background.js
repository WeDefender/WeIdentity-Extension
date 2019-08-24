function getID(cb){
	chrome.storage.local.get(['weId'], function(result) {
		console.log(result.weId)
		cb(result.weId);
	})
}

function setStatus(bool,cb){
	chrome.storage.local.set({isAuth: bool}, function() {
		cb()
	});
}
function setRequestOrg(org,cb){
	chrome.storage.local.set({requestOrg: org}, function() {
		cb()
	});
}
function setRequestIndex(index,cb){
	chrome.storage.local.set({requestIndex: index}, function() {
		cb()
	});
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	console.log('收到来自content-script的消息：');
	console.log(request, sender, sendResponse);
	
	//chrome.browserAction.setBadgeText({text: ''});
	console.log(request.greeting.type)
	if (request.greeting.type == "getWeID"){
		getID(function(result){
			sendResponse(result)
		})
	}
	else if (request.greeting.type == "getCredential"){
		chrome.browserAction.setBadgeText({text: 'new'});
		setStatus(true,function(){
			setRequestOrg(request.greeting.params.name,function()
			{
				setRequestIndex(request.greeting.params.index,function(){
					sendResponse("1");
				})	
			})
			
		})
	}
	return true;
});

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.browserAction.setBadgeText({text: ''});
});

chrome.runtime.onConnect.addListener(function(port) {
	console.log("连接content")
    port.onMessage.addListener(function(msg) {
		console.log("background 收到 content的信息：",msg)
    });
});





